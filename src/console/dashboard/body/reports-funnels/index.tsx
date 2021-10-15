import {isReportFunnelEnabled} from '@/feature-switch';
import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {saveDashboard} from '@/services/data/tuples/dashboard';
import {Dashboard} from '@/services/data/tuples/dashboard-types';
import {fetchEnum} from '@/services/data/tuples/enum';
import {Enum} from '@/services/data/tuples/enum-types';
import {Report} from '@/services/data/tuples/report-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {ICON_FILTER} from '@/widgets/basic/constants';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useEffect, useState} from 'react';
import {useDashboardEventBus} from '../../dashboard-event-bus';
import {DashboardEventTypes} from '../../dashboard-event-bus-types';
import {FunnelDefs, FunnelsState, GroupedFunnel} from './types';
import {
	buildFunnelDefsFromDashboard,
	fetchTopics,
	fillFunnelDefsByEnumIds,
	gatherTopicIds,
	groupFunnels
} from './utils';
import {DashboardReportsFunnels, DashboardReportsFunnelsButton} from './widgets';

export const ReportsFunnels = (props: {
	connectedSpaces: Array<ConnectedSpace>;
	dashboard: Dashboard;
	reports: Array<Report>;
	transient: boolean;
}) => {
	const {connectedSpaces, dashboard, reports, transient} = props;

	const {fire: fireGlobal} = useEventBus();
	const {on, off, fire} = useDashboardEventBus();

	const [state, setState] = useState<FunnelsState>({
		initialized: false,
		topics: [],
		enums: [],
		defs: {},
		groups: []
	});

	// initialize
	useEffect(() => {
		if (state.initialized) {
			return;
		}
		// don't use console since dashboard can be shared and whole data is unnecessary
		const defs = buildFunnelDefsFromDashboard(connectedSpaces);
		fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST, async () => {
			const topics = await fetchTopics(gatherTopicIds(defs));
			const {defs: completedDefs, enumIds} = fillFunnelDefsByEnumIds(defs, topics);
			if (enumIds.length !== 0) {
				const enums = await Promise.all(enumIds.map(async enumId => await fetchEnum(enumId)));
				return {topics, defs: completedDefs, enums};
			} else {
				return {topics, defs: completedDefs, enums: []};
			}
		}, ({topics, enums, defs}: { topics: Array<Topic>; enums: Array<Enum>; defs: FunnelDefs }) => {
			setState({
				topics, enums,
				defs, groups: groupFunnels(reports, defs),
				initialized: true
			});
		});
	}, [fireGlobal, state.initialized, connectedSpaces, reports]);
	useEffect(() => {
		const save = (before: () => void) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => {
					before();
					await saveDashboard(dashboard);
				},
				() => {
				});
		};
		const onReportAdded = (report: Report) => {
			// eslint-disable-next-line
			const dashboardReport = (dashboard.reports || []).find(r => r.reportId == report.reportId);
			if (!dashboardReport) {
				return;
			}

			// construct cloned report, add into reports
			const displayReport = {
				...(JSON.parse(JSON.stringify(report))),
				rect: dashboardReport.rect
			};
			reports.push(displayReport);

			save(() => {
				if (!report.funnels || report.funnels.length === 0 || report.funnels.every(funnel => !funnel.enabled)) {
					// do nothing, since added report has not funnels defined
					// repaint
					fire(DashboardEventTypes.REPAINT_REPORTS, dashboard);
				} else {
					// eslint-disable-next-line
					const defs = buildFunnelDefsFromDashboard(connectedSpaces);
					fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST, async () => {
						// find new topic ids
						const topicIds = gatherTopicIds(defs).filter(topicId => {
							// eslint-disable-next-line
							return state.topics.every(topic => topic.topicId != topicId);
						});
						// load new topic
						const topics = topicIds.length === 0 ? state.topics : [...state.topics, ...await fetchTopics(topicIds)];
						// rebuild funnel defs
						const {defs: completedDefs, enumIds: allEnumIds} = fillFunnelDefsByEnumIds(defs, topics);
						// find new enum ids
						const enumIds = allEnumIds.filter(enumId => {
							// eslint-disable-next-line
							return state.enums.every(e => e.enumId != enumId);
						});
						if (enumIds.length !== 0) {
							// load new enums
							const enums = await Promise.all(enumIds.map(async enumId => await fetchEnum(enumId)));
							return {topics, defs: completedDefs, enums: [...state.enums, ...enums]};
						} else {
							return {topics, defs: completedDefs, enums: state.enums};
						}
					}, ({topics, enums, defs}: { topics: Array<Topic>; enums: Array<Enum>; defs: FunnelDefs }) => {
						setState({
							topics, enums,
							defs, groups: groupFunnels([displayReport], defs, state.groups),
							initialized: true
						});
						fire(DashboardEventTypes.REPAINT_REPORTS, dashboard);
					});
				}
			});
		};
		const onReportRemoved = (report: Report) => {
			save(() => {
				// remove cloned report when report is removed from dashboard
				// eslint-disable-next-line
				const index = reports.findIndex(r => r.reportId == report.reportId);
				if (index !== -1) {
					reports.splice(index, 1);
					// rebuild grouped funnels
					const groups = state.groups.filter(group => {
						// remove report from group
						// eslint-disable-next-line
						group.reports = group.reports.filter(({report: r}) => r.reportId == report.reportId);
						return group.reports.length !== 0;
					});
					// one or more groups are removed since report removed
					if (groups.length !== state.groups.length) {
						setState(state => {
							return {...state, groups};
						});
					}
				}
				fire(DashboardEventTypes.REPAINT_REPORTS, dashboard);
			});
		};
		on(DashboardEventTypes.REPORT_ADDED, onReportAdded);
		on(DashboardEventTypes.REPORT_REMOVED, onReportRemoved);
		return () => {
			off(DashboardEventTypes.REPORT_ADDED, onReportAdded);
			off(DashboardEventTypes.REPORT_REMOVED, onReportRemoved);
		};
	}, [
		fireGlobal, on, off, fire,
		connectedSpaces, dashboard, reports,
		state.topics, state.enums, state.groups
	])
	;

	if (!isReportFunnelEnabled() || !state.initialized || state.groups.length === 0) {
		return null;
	}

// synchronize values from grouped funnel to funnel in report object
	const onFunnelChanged = async (group: GroupedFunnel) => {
		group.reports.forEach(({report, funnel}) => {
			// copy values from grouped funnel (values collected from ui input) to original funnel
			funnel.values = group.funnel.values;

			// since report is built by parent, is a memory object
			// find dashboard report as copy funnels to it
			// eslint-disable-next-line
			const dashboardReport = (dashboard.reports ?? []).find(r => r.reportId == report.reportId);
			if (dashboardReport) {
				// copy funnels data
				dashboardReport.funnels = report.funnels;
			}
		});

		if (!transient) {
			// in transient, funnel values change will not save to server side
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await saveDashboard(dashboard),
				() => {
				});
		}
	};

	return <>
		<DashboardReportsFunnels>
			<DashboardReportsFunnelsButton>
				<FontAwesomeIcon icon={ICON_FILTER}/>
			</DashboardReportsFunnelsButton>
		</DashboardReportsFunnels>
	</>;
};