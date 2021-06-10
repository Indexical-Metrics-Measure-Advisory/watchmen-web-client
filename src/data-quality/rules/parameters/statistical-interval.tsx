import {MonitorRule, MonitorRuleStatisticalInterval} from '../../../services/data-quality/rules';
import {useForceUpdate} from '../../../basic-widgets/utils';
import {DropdownOption} from '../../../basic-widgets/types';
import {Dropdown} from '../../../basic-widgets/dropdown';
import React from 'react';

const StatisticalIntervalOptions = [
	{value: MonitorRuleStatisticalInterval.DAILY, label: 'Daily'},
	{value: MonitorRuleStatisticalInterval.WEEKLY, label: 'Weekly'},
	{value: MonitorRuleStatisticalInterval.MONTHLY, label: 'Monthly'}
];

export const StatisticalInterval = (props: { rule: MonitorRule }) => {
	const {rule} = props;

	const forceUpdate = useForceUpdate();
	const onChanged = (option: DropdownOption) => {
		rule.params = (rule.params || {});
		rule.params.statisticalInterval = option.value;
		forceUpdate();
	};

	return <Dropdown options={StatisticalIntervalOptions} onChange={onChanged}/>;
};
