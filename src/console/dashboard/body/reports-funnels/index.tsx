import {isReportFunnelEnabled} from '@/feature-switch';
import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Dashboard} from '@/services/data/tuples/dashboard-types';
import {fetchEnum} from '@/services/data/tuples/enum';
import {Enum} from '@/services/data/tuples/enum-types';
import {Report} from '@/services/data/tuples/report-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {ICON_BAN, ICON_DRAG_HANDLE, ICON_FILTER} from '@/widgets/basic/constants';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import {useDragAndResize} from '@/widgets/report/drag-and-resize/use-drag-and-resize';
import {DragType} from '@/widgets/report/types';
import {ChartDragHandle, ChartDragHandlePart} from '@/widgets/report/widgets';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useRef, useState} from 'react';
import {v4} from 'uuid';
import {useDashboardEventBus} from '../../dashboard-event-bus';
import {DashboardEventTypes} from '../../dashboard-event-bus-types';
import {cloneReport} from '../utils';
import {FunnelEditorWrapper} from './funnel-editor';
import {FunnelDefs, FunnelsState, GroupedFunnel} from './types';
import {
	buildFunnelDefsFromDashboard,
	fetchTopics,
	fillFunnelDefsByEnumIds,
	gatherTopicIds,
	groupFunnels
} from './utils';
import {
	DashboardReportsFunnelEditors,
	DashboardReportsFunnels,
	DashboardReportsFunnelsButton,
	DashboardReportsFunnelsHeader,
	DashboardReportsFunnelsTitle,
	ReportsFunnelsRect
} from './widgets';

export const ReportsFunnels = (props: {
	connectedSpaces: Array<ConnectedSpace>;
	dashboard: Dashboard;
	reports: Array<Report>;
	transient: boolean;
}) => {
	const {connectedSpaces, dashboard, reports, transient} = props;

	const containerRef = useRef<HTMLDivElement>(null);
	const dndRef = useRef<HTMLDivElement>(null);

	const {fire: fireGlobal} = useEventBus();
	const {on, off, fire} = useDashboardEventBus();
	const [effective, setEffective] = useState(true);
	const [rect, setRect] = useState<ReportsFunnelsRect>({x: 16, y: 16, width: 0, height: 0});
	const [state, setState] = useState<FunnelsState>({
		initialized: false,
		topics: [],
		enums: [],
		defs: {},
		groups: []
	});

	// initialize
	useEffect(() => {
		if (state.initialized || connectedSpaces.length === 0 || reports.length === 0) {
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
			before();
			fire(DashboardEventTypes.SAVE_DASHBOARD, dashboard);
		};
		const onReportAdded = (report: Report) => {
			// eslint-disable-next-line
			const dashboardReport = (dashboard.reports || []).find(r => r.reportId == report.reportId);
			if (!dashboardReport) {
				return;
			}

			// construct cloned report, add into reports
			const displayReport = {...cloneReport(report), rect: dashboardReport.rect};
			reports.push(displayReport);

			save(() => {
				if (!report.funnels || report.funnels.length === 0 || report.funnels.every(funnel => !funnel.enabled)) {
					// do nothing, since added report has not funnels defined
					// repaint
					fire(DashboardEventTypes.REPAINT_REPORTS_ON_ADDED, dashboard);
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
						fire(DashboardEventTypes.REPAINT_REPORTS_ON_ADDED, dashboard);
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
						group.reports = group.reports.filter(({report: r}) => r.reportId != report.reportId);
						return group.reports.length !== 0;
					});
					// one or more groups are removed since report removed
					if (groups.length !== state.groups.length) {
						setState(state => {
							return {...state, groups};
						});
					}
				}
				fire(DashboardEventTypes.REPAINT_REPORTS_ON_REMOVED, dashboard);
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
	]);
	const {onMouseUp, onMouseLeave, onMouseDown, onMouseMove, dragState} = useDragAndResize({
		containerRef,
		dndRef,
		writeToRect: (rect) => setRect(rect),
		onDrop: () => (void 0)
	});

	if (!isReportFunnelEnabled() || !state.initialized || state.groups.length === 0) {
		return null;
	}

	const copyFunnelValues = (group: GroupedFunnel) => {
		group.reports.forEach(({report, funnel}) => {
			// copy values from grouped funnel (values collected from ui input) to original funnel
			funnel.values = group.funnel.values;

			// since report is built by parent, is a memory object
			// find dashboard report as copy funnels to it
			// eslint-disable-next-line
			const dashboardReport = (dashboard.reports ?? []).find(r => r.reportId == report.reportId);
			if (dashboardReport) {
				// copy funnels data to original report object, which will be persisted
				dashboardReport.funnels = report.funnels;
			}
		});
	};
	// synchronize values from grouped funnel to funnel in report object
	const onFunnelChanged = async (group: GroupedFunnel) => {
		copyFunnelValues(group);
		fire(DashboardEventTypes.REPAINT_REPORTS, dashboard, group.reports.map(r => r.report));
		if (!transient) {
			// in transient, funnel values change will not save to server side
			fire(DashboardEventTypes.SAVE_DASHBOARD, dashboard);
		}
	};

	const onFilterClicked = () => {
		setEffective(!effective);
		// console.log(JSON.stringify(state.groups.map(group => group.funnel).flat()));

		if (effective) {
			// original is effective, now remove all funnel's values, repaint related reports
			const reports = state.groups.map(group => group.reports)
				.flat()
				.map(r => r.report)
				.reduce((reports, report) => {
					if (!reports.includes(report)) {
						reports.push(report);
					}
					return reports;
				}, [] as Array<Report>)
				// find report with funnels
				.filter(report => report.funnels != null && report.funnels.length !== 0)
				// find report with funnel values
				.filter(report => {
					return (report.funnels || []).some(funnel => {
						return funnel.enabled
							&& funnel.values != null
							&& funnel.values.length !== 0
							&& funnel.values.some(value => value != null && value !== '');
					});
				})
				.map(report => {
					// clear funnel values
					// will keep values from group funnel
					(report.funnels || []).forEach(funnel => {
						if (funnel.range) {
							funnel.values = [null, null];
						} else {
							funnel.values = [null];
						}
					});
					return report;
				});
			fire(DashboardEventTypes.REPAINT_REPORTS, dashboard, reports);
			// console.log(JSON.stringify(reports.map(report => report.funnels).flat()));
		} else {
			// original is not effective, now copy values to report funnels, and repaint reports
			const reports = state.groups
				.filter(({funnel}) => {
					return funnel.values != null
						&& funnel.values.length !== 0
						&& funnel.values.some(value => value != null && value !== '');
				})
				.map(group => {
					copyFunnelValues(group);
					return group;
				})
				.map(group => group.reports)
				.flat()
				.map(r => r.report)
				.reduce((reports, report) => {
					if (!reports.includes(report)) {
						reports.push(report);
					}
					return reports;
				}, [] as Array<Report>);
			fire(DashboardEventTypes.REPAINT_REPORTS, dashboard, reports);
			// console.log(JSON.stringify(reports.map(report => report.funnels).flat()));
		}
		// console.log(JSON.stringify(state.groups.map(group => group.funnel).flat()));
	};

	return <DashboardReportsFunnels rect={rect} ref={containerRef}>
		<DashboardReportsFunnelsHeader>
			<DashboardReportsFunnelsTitle>{Lang.CONSOLE.DASHBOARD.FUNNEL_TITLE}</DashboardReportsFunnelsTitle>
			<DashboardReportsFunnelsButton onClick={onFilterClicked}>
				{effective
					? <FontAwesomeIcon icon={ICON_FILTER}/>
					: <span className="fa-layers fa-fw">
						<FontAwesomeIcon icon={ICON_BAN}/>
						<FontAwesomeIcon icon={ICON_FILTER}/>
					</span>}
			</DashboardReportsFunnelsButton>
		</DashboardReportsFunnelsHeader>
		<DashboardReportsFunnelEditors>
			{state.groups.map(group => {
				return <FunnelEditorWrapper group={group} enums={state.enums} onChange={onFunnelChanged}
				                            key={v4()}/>;
			})}
		</DashboardReportsFunnelEditors>
		<ChartDragHandle onMouseDown={onMouseDown} onMouseUp={onMouseUp}
		                 onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}
		                 dragging={dragState.type !== DragType.NONE}>
			<ChartDragHandlePart data-part-type="dragging" data-position={dragState.type}/>
			<ChartDragHandlePart data-position={DragType.DND} ref={dndRef}>
				<FontAwesomeIcon icon={ICON_DRAG_HANDLE}/>
			</ChartDragHandlePart>
		</ChartDragHandle>
	</DashboardReportsFunnels>;
};