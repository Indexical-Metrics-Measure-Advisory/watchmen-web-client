import {Report, ReportFunnel} from '@/services/data/tuples/report-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {useEffect} from 'react';
import {useReportEditEventBus} from '../report-edit-event-bus';
import {ReportEditEventTypes} from '../report-edit-event-bus-types';

export const useFunnelRange = (report: Report, funnel: ReportFunnel) => {
	const forceUpdate = useForceUpdate();
	const {on, off} = useReportEditEventBus();
	useEffect(() => {
		const onFunnelRangeChanged = (aReport: Report, aFunnel: ReportFunnel) => {
			if (aReport !== report || aFunnel !== funnel) {
				return;
			}

			forceUpdate();
		};
		on(ReportEditEventTypes.FUNNEL_RANGE_CHANGED, onFunnelRangeChanged);
		return () => {
			off(ReportEditEventTypes.FUNNEL_RANGE_CHANGED, onFunnelRangeChanged);
		};
	}, [on, off, forceUpdate, report, funnel]);
};