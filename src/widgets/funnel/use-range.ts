import {ReportFunnel} from '@/services/data/tuples/report-types';
import {useEffect} from 'react';
import {useForceUpdate} from '../basic/utils';
import {useFunnelEventBus} from './funnel-event-bus';
import {FunnelEventTypes} from './funnel-event-bus-types';

export const useRange = (funnel: ReportFunnel) => {
	const forceUpdate = useForceUpdate();
	const {on, off} = useFunnelEventBus();
	useEffect(() => {
		const onFunnelRangeChanged = (aFunnel: ReportFunnel) => {
			if (aFunnel !== funnel) {
				return;
			}

			forceUpdate();
		};
		on(FunnelEventTypes.RANGE_CHANGED, onFunnelRangeChanged);
		return () => {
			off(FunnelEventTypes.RANGE_CHANGED, onFunnelRangeChanged);
		};
	}, [on, off, forceUpdate, funnel]);
};