import {saveDashboard} from '@/services/data/tuples/dashboard';
import {Dashboard} from '@/services/data/tuples/dashboard-types';
import {Report} from '@/services/data/tuples/report-types';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {useReportEventBus} from '@/widgets/report/report-event-bus';
import {ReportEventTypes} from '@/widgets/report/report-event-bus-types';
import {useEffect} from 'react';

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