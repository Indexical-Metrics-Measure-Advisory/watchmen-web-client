import {ReportFunnel} from '@/services/data/tuples/report-types';
import React from 'react';
import {Calendar} from '../../basic/calendar';
import {useForceUpdate} from '../../basic/utils';
import {useFunnelEventBus} from '../funnel-event-bus';
import {FunnelEventTypes} from '../funnel-event-bus-types';
import {getAsDate, onDateValueChange} from '../value-utils';

export const Editor = (props: { funnel: ReportFunnel, valueIndex: number }) => {
	const {funnel, valueIndex} = props;

	const {fire} = useFunnelEventBus();
	const forceUpdate = useForceUpdate();

	const value = getAsDate(funnel, valueIndex);
	const onValueChange = onDateValueChange(funnel, valueIndex, () => {
		forceUpdate();
		fire(FunnelEventTypes.VALUE_CHANGED, funnel);
	});

	return <Calendar value={value} onChange={onValueChange} showTime={false}/>;
};
