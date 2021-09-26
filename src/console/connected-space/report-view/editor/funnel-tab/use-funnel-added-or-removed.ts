import {Report} from '@/services/data/tuples/report-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {useEffect} from 'react';
import {useReportEditEventBus} from '../report-edit-event-bus';
import {ReportEditEventTypes} from '../report-edit-event-bus-types';

export const useFunnelAddedOrRemoved = (report: Report) => {
	const forceUpdate = useForceUpdate();
	const {on, off} = useReportEditEventBus();
	useEffect(() => {
		const onFunnelChanged = (aReport: Report) => {
			if (aReport !== report) {
				return;
			}

			forceUpdate();
		};
		on(ReportEditEventTypes.FUNNEL_ADDED, onFunnelChanged);
		on(ReportEditEventTypes.FUNNEL_REMOVED, onFunnelChanged);
		return () => {
			off(ReportEditEventTypes.FUNNEL_ADDED, onFunnelChanged);
			off(ReportEditEventTypes.FUNNEL_REMOVED, onFunnelChanged);
		};
	}, [on, off, forceUpdate, report]);
};