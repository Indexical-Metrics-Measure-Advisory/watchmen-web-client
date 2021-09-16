import {useEffect} from 'react';
import {useEventBus} from '@/events/event-bus';
import {EventTypes} from '@/events/types';
import {useReportEventBus} from '@/report/report-event-bus';
import {ReportEventTypes} from '@/report/report-event-bus-types';
import {saveDashboard} from '@/services/tuples/dashboard';
import {Dashboard} from '@/services/tuples/dashboard-types';

export const ParagraphMoveOrResizeMonitor = (props: { dashboard: Dashboard }) => {
	const {dashboard} = props;

	const {fire: fireGlobal} = useEventBus();
	const {on, off} = useReportEventBus();
	useEffect(() => {
		const onMoveOrResize = async () => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await saveDashboard(dashboard),
				() => {
				});
		};
		on(ReportEventTypes.PARAGRAPH_MOVE_OR_RESIZE_COMPLETED, onMoveOrResize);
		return () => {
			off(ReportEventTypes.PARAGRAPH_MOVE_OR_RESIZE_COMPLETED, onMoveOrResize);
		};
	}, [on, off, fireGlobal, dashboard]);
	return <></>;
};