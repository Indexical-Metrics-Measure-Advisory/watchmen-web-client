import {MonitorRule, MonitorRuleCompareOperator} from '../../../services/data-quality/rules';
import {useForceUpdate} from '../../../basic-widgets/utils';
import {DropdownOption} from '../../../basic-widgets/types';
import {Dropdown} from '../../../basic-widgets/dropdown';
import React from 'react';

const CompareOperatorOptions = [
	{value: MonitorRuleCompareOperator.EQUAL, label: 'Equals'},
	{value: MonitorRuleCompareOperator.LESS_THAN, label: 'Less Than'},
	{value: MonitorRuleCompareOperator.LESS_THAN_OR_EQUAL, label: 'Less Then or Equals'},
	{value: MonitorRuleCompareOperator.GREATER_THAN, label: 'Greater Than'},
	{value: MonitorRuleCompareOperator.GREATER_THAN_EQUAL, label: 'Greater Than or Equals'}
];

export const CompareOperatorParameter = (props: { rule: MonitorRule }) => {
	const {rule} = props;

	const forceUpdate = useForceUpdate();
	const onChanged = (option: DropdownOption) => {
		rule.params = (rule.params || {});
		rule.params.compareOperator = option.value;
		forceUpdate();
	};

	return <Dropdown options={CompareOperatorOptions}
	                 value={(rule.params || {}).compareOperator}
	                 onChange={onChanged}/>;
};
