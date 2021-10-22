import {Dashboard} from '@/services/data/tuples/dashboard-types';
import {useReportEventBus} from '@/widgets/report/report-event-bus';
import {ReportEventTypes} from '@/widgets/report/report-event-bus-types';
import {Fragment, useEffect} from 'react';
import {useDashboardEventBus} from '../../dashboard-event-bus';
import {DashboardEventTypes} from '../../dashboard-event-bus-types';

export const ParagraphMoveOrResizeMonitor = (props: { dashboard: Dashboard }) => {
	const {dashboard} = props;

	const {fire: fireDashboard} = useDashboardEventBus();
	const {on, off} = useReportEventBus();
	useEffect(() => {
		const onMoveOrResize = () => {
			fireDashboard(DashboardEventTypes.SAVE_DASHBOARD, dashboard);
		};
		on(ReportEventTypes.PARAGRAPH_MOVE_OR_RESIZE_COMPLETED, onMoveOrResize);
		return () => {
			off(ReportEventTypes.PARAGRAPH_MOVE_OR_RESIZE_COMPLETED, onMoveOrResize);
		};
	}, [on, off, fireDashboard, dashboard]);
	return <Fragment/>;
};