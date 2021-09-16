import {useEffect} from 'react';
import {useEventBus} from '@/events/event-bus';
import {EventTypes} from '@/events/types';
import {useReportEventBus} from '@/report/report-event-bus';
import {ReportEventTypes} from '@/report/report-event-bus-types';
import {saveDashboard} from '@/services/tuples/dashboard';
import {Dashboard} from '@/services/tuples/dashboard-types';
import {Report} from '@/services/tuples/report-types';

export const ReportMoveOrResizeMonitor = (props: { dashboard: Dashboard }) => {
	const {dashboard} = props;

	const {fire: fireGlobal} = useEventBus();
	const {on, off} = useReportEventBus();
	useEffect(() => {
		const onMoveOrResize = async (report: Report) => {
			// eslint-disable-next-line
			const dashboardReport = (dashboard.reports || []).find(dashboardReport => dashboardReport.reportId == report.reportId);
			if (!dashboardReport) {
				return;
			}
			dashboardReport.rect.x = report.rect.x;
			dashboardReport.rect.y = report.rect.y;
			dashboardReport.rect.width = report.rect.width;
			dashboardReport.rect.height = report.rect.height;

			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await saveDashboard(dashboard),
				() => {
				});
		};
		on(ReportEventTypes.REPORT_MOVE_OR_RESIZE_COMPLETED, onMoveOrResize);
		return () => {
			off(ReportEventTypes.REPORT_MOVE_OR_RESIZE_COMPLETED, onMoveOrResize);
		};
	}, [on, off, fireGlobal, dashboard]);
	return <></>;
};