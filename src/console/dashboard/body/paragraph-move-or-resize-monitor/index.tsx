import {saveDashboard} from '@/services/data/tuples/dashboard';
import {Dashboard} from '@/services/data/tuples/dashboard-types';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {useReportEventBus} from '@/widgets/report/report-event-bus';
import {ReportEventTypes} from '@/widgets/report/report-event-bus-types';
import {useEffect} from 'react';

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