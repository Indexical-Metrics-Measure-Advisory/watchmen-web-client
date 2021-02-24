import { useEffect } from 'react';
import { useReportEventBus } from '../../../../../report/report-event-bus';
import { ReportEventTypes } from '../../../../../report/report-event-bus-types';
import { saveReport } from '../../../../../services/tuples/report';
import { Report } from '../../../../../services/tuples/report-types';

export const ReportMoveOrResizeMonitor = () => {
	const { on, off } = useReportEventBus();
	useEffect(() => {
		const onMoveOrResize = async (report: Report) => {
			await saveReport(report);
		};
		on(ReportEventTypes.MOVE_OR_RESIZE_COMPLETED, onMoveOrResize);
		return () => {
			off(ReportEventTypes.MOVE_OR_RESIZE_COMPLETED, onMoveOrResize);
		};
	}, [ on, off ]);
	return <></>;
};