import {Dashboard} from '@/services/data/tuples/dashboard-types';
import {Report} from '@/services/data/tuples/report-types';
import {useReportEventBus} from '@/widgets/report/report-event-bus';
import {ReportEventTypes} from '@/widgets/report/report-event-bus-types';
import {Fragment, useEffect} from 'react';
import {useDashboardEventBus} from '../../dashboard-event-bus';
import {DashboardEventTypes} from '../../dashboard-event-bus-types';

export const ReportMoveOrResizeMonitor = (props: { dashboard: Dashboard }) => {
	const {dashboard} = props;

	const {fire: fireDashboard} = useDashboardEventBus();
	const {on, off} = useReportEventBus();
	useEffect(() => {
		const onMoveOrResize = (report: Report) => {
			// eslint-disable-next-line
			const dashboardReport = (dashboard.reports || []).find(dashboardReport => dashboardReport.reportId == report.reportId);
			if (!dashboardReport) {
				return;
			}
			dashboardReport.rect.x = report.rect.x;
			dashboardReport.rect.y = report.rect.y;
			dashboardReport.rect.width = report.rect.width;
			dashboardReport.rect.height = report.rect.height;

			fireDashboard(DashboardEventTypes.SAVE_DASHBOARD, dashboard);
		};
		on(ReportEventTypes.REPORT_MOVE_OR_RESIZE_COMPLETED, onMoveOrResize);
		return () => {
			off(ReportEventTypes.REPORT_MOVE_OR_RESIZE_COMPLETED, onMoveOrResize);
		};
	}, [on, off, fireDashboard, dashboard]);
	return <Fragment/>;
};