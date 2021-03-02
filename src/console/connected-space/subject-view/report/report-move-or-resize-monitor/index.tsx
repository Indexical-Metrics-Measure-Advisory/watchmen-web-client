import { useEffect } from 'react';
import { useEventBus } from '../../../../../events/event-bus';
import { EventTypes } from '../../../../../events/types';
import { useReportEventBus } from '../../../../../report/report-event-bus';
import { ReportEventTypes } from '../../../../../report/report-event-bus-types';
import { saveReport } from '../../../../../services/tuples/report';
import { Report } from '../../../../../services/tuples/report-types';

export const ReportMoveOrResizeMonitor = () => {
	const { fire: fireGlobal } = useEventBus();
	const { on, off } = useReportEventBus();
	useEffect(() => {
		const onMoveOrResize = async (report: Report) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await saveReport(report),
				() => {
				});
		};
		on(ReportEventTypes.REPORT_MOVE_OR_RESIZE_COMPLETED, onMoveOrResize);
		return () => {
			off(ReportEventTypes.REPORT_MOVE_OR_RESIZE_COMPLETED, onMoveOrResize);
		};
	}, [ on, off, fireGlobal ]);
	return <></>;
};