import {Dashboard} from '@/services/data/tuples/dashboard-types';
import {Report} from '@/services/data/tuples/report-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Chart} from '@/widgets/report';
import {useReportEventBus} from '@/widgets/report/report-event-bus';
import {ReportEventTypes} from '@/widgets/report/report-event-bus-types';
import React, {useEffect} from 'react';
import {useDashboardEventBus} from '../../dashboard-event-bus';
import {DashboardEventTypes} from '../../dashboard-event-bus-types';

export const Palette = (props: { dashboard: Dashboard; reports: Array<Report>; removable: boolean }) => {
	const {dashboard, reports, removable} = props;

	const {on, off} = useDashboardEventBus();
	const {fire: fireReport} = useReportEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onRepaintReports = (d: Dashboard) => {
			// eslint-disable-next-line
			if (d.dashboardId != dashboard.dashboardId) {
				return;
			}

			// refresh all reports
			const reportsMap = reports.reduce((map, report) => {
				map.set(report.reportId, report);
				return map;
			}, new Map<string, Report>());
			(dashboard.reports || []).forEach(({reportId}) => {
				const report = reportsMap.get(reportId);
				if (report) {
					fireReport(ReportEventTypes.DO_RELOAD_DATA_BY_CLIENT, report);
				}
			});
		};
		on(DashboardEventTypes.REPAINT_REPORTS, onRepaintReports);
		return () => {
			off(DashboardEventTypes.REPAINT_REPORTS, onRepaintReports);
		};
	}, [on, off, fireReport, forceUpdate, dashboard.dashboardId, dashboard.reports, reports]);

	return <>
		{reports.map(report => {
			return <Chart report={report} fixed={false} editable={false} editing={false} removable={removable}
			              key={report.reportId}/>;
		})}
	</>;
};