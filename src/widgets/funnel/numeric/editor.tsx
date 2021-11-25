import {ReportFunnel} from '@/services/data/tuples/report-types';
import {isXaNumber} from '@/services/utils';
import React from 'react';
import {NumberValueEditor} from '../../value-editor/number-value-editor';
import {useFunnelEventBus} from '../funnel-event-bus';
import {FunnelEventTypes} from '../funnel-event-bus-types';
import {getAsNumeric, onNumericValueChange} from '../value-utils';

export const Editor = (props: { funnel: ReportFunnel, valueIndex: number }) => {
	const {funnel, valueIndex} = props;

	const {fire} = useFunnelEventBus();

	const value = getAsNumeric(funnel, valueIndex);
	const validate = (value: string) => isXaNumber(value);
	const onValueChange = onNumericValueChange(funnel, valueIndex, () => fire(FunnelEventTypes.VALUE_CHANGED, funnel));

	return <NumberValueEditor value={value} validate={validate} onValueChange={onValueChange}/>;
};
