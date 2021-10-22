import {Dashboard} from '@/services/data/tuples/dashboard-types';
import {Report} from '@/services/data/tuples/report-types';
import {useReportEventBus} from '@/widgets/report/report-event-bus';
import {ReportEventTypes} from '@/widgets/report/report-event-bus-types';
import React, {Fragment, useEffect} from 'react';
import {useDashboardEventBus} from '../../dashboard-event-bus';
import {DashboardEventTypes} from '../../dashboard-event-bus-types';

export const ReportRefresher = (props: { dashboard: Dashboard; reports: Array<Report> }) => {
	const {dashboard, reports} = props;

	const {on, off} = useDashboardEventBus();
	const {fire: fireReport} = useReportEventBus();
	useEffect(() => {
		const refreshReports = (aDashboard: Dashboard) => {
			// eslint-disable-next-line
			if (dashboard.dashboardId != aDashboard.dashboardId) {
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
					fireReport(ReportEventTypes.DO_REFRESH, report);
				}
			});
		};
		on(DashboardEventTypes.REFRESH_REPORTS, refreshReports);
		return () => {
			off(DashboardEventTypes.REFRESH_REPORTS, refreshReports);
		};
	}, [on, off, fireReport, dashboard.dashboardId, dashboard.reports, reports]);

	return <Fragment/>;
};