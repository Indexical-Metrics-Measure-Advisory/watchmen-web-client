import React, { useEffect } from 'react';
import { useReportEventBus } from '../../../../report/report-event-bus';
import { ReportEventTypes } from '../../../../report/report-event-bus-types';
import { Dashboard } from '../../../../services/tuples/dashboard-types';
import { Report } from '../../../../services/tuples/report-types';
import { useDashboardEventBus } from '../../dashboard-event-bus';
import { DashboardEventTypes } from '../../dashboard-event-bus-types';

export const ReportRefresher = (props: { dashboard: Dashboard; reports: Array<Report> }) => {
	const { dashboard, reports } = props;

	const { on, off } = useDashboardEventBus();
	const { fire: fireReport } = useReportEventBus();
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
			(dashboard.reports || []).forEach(({ reportId }) => {
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
	}, [ on, off, fireReport, dashboard.dashboardId, dashboard.reports, reports ]);

	return <></>;
};