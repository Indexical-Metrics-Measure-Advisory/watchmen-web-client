import {ReportFunnel} from '@/services/data/tuples/report-types';
import React from 'react';
import {NumberValueEditor} from '../../value-editor/number-value-editor';
import {useFunnelEventBus} from '../funnel-event-bus';
import {FunnelEventTypes} from '../funnel-event-bus-types';
import {getAsNumeric, onNumericValueChange} from '../value-utils';

export const Editor = (props: { funnel: ReportFunnel, valueIndex: number }) => {
	const {funnel, valueIndex} = props;

	const {fire} = useFunnelEventBus();

	const value = getAsNumeric(funnel, valueIndex);
	const validate = (value: string) => !isNaN(value as any);
	const onValueChange = onNumericValueChange(funnel, valueIndex, () => fire(FunnelEventTypes.VALUE_CHANGED, funnel));

	return <NumberValueEditor value={value} validate={validate} onValueChange={onValueChange}/>;
};
