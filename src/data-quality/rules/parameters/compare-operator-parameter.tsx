
import {useForceUpdate} from '../../../basic-widgets/utils';
import {DropdownOption} from '../../../basic-widgets/types';
import {Dropdown} from '../../../basic-widgets/dropdown';
import React from 'react';
import {MonitorRuleCompareOperator, MonitorRuleParameters} from '../../../services/data-quality/rule-types';

const CompareOperatorOptions = [
	{value: MonitorRuleCompareOperator.EQUAL, label: 'Equals'},
	{value: MonitorRuleCompareOperator.LESS_THAN, label: 'Less Than'},
	{value: MonitorRuleCompareOperator.LESS_THAN_OR_EQUAL, label: 'Less Then or Equals'},
	{value: MonitorRuleCompareOperator.GREATER_THAN, label: 'Greater Than'},
	{value: MonitorRuleCompareOperator.GREATER_THAN_EQUAL, label: 'Greater Than or Equals'}
];

export const CompareOperatorParameter = (props: { params: MonitorRuleParameters }) => {
	const {params} = props;

	const forceUpdate = useForceUpdate();
	const onChanged = (option: DropdownOption) => {
		params.compareOperator = option.value;
		forceUpdate();
	};

	return <Dropdown options={CompareOperatorOptions}
	                 value={params.compareOperator}
	                 onChange={onChanged}/>;
};
