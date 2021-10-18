import {ReportFunnel} from '@/services/data/tuples/report-types';
import React from 'react';
import {DropdownOption} from '../../basic/types';
import {Lang} from '../../langs';
import {DropdownValueEditor} from '../../value-editor/dropdown-value-editor';
import {useFunnelEventBus} from '../funnel-event-bus';
import {FunnelEventTypes} from '../funnel-event-bus-types';
import {getAsString, onDropdownValueChange} from '../value-utils';

export const Editor = (props: {
	funnel: ReportFunnel;
	valueIndex: number;
	options: Array<DropdownOption>;
}) => {
	const {funnel, valueIndex, options} = props;

	const {fire} = useFunnelEventBus();

	const value = getAsString(funnel, valueIndex);
	const onValueChange = onDropdownValueChange(funnel, valueIndex, () => fire(FunnelEventTypes.VALUE_CHANGED, funnel));

	return <DropdownValueEditor value={value ? value.toString() : ''}
	                            onValueChange={onValueChange}
	                            options={[{value: '', label: Lang.CHART.PLEASE_SELECT_FUNNEL_VALUE}, ...options]}/>;
};