import {useForceUpdate} from '@/basic-widgets/utils';
import {DropdownOption} from '@/basic-widgets/types';
import {Dropdown} from '@/basic-widgets/dropdown';
import React from 'react';
import {MonitorRuleParameters, MonitorRuleStatisticalInterval} from '@/services/data-quality/rule-types';

const StatisticalIntervalOptions = [
	{value: MonitorRuleStatisticalInterval.DAILY, label: 'Daily'},
	{value: MonitorRuleStatisticalInterval.WEEKLY, label: 'Weekly'},
	{value: MonitorRuleStatisticalInterval.MONTHLY, label: 'Monthly'}
];

export const StatisticalIntervalParameter = (props: { params: MonitorRuleParameters }) => {
	const {params} = props;

	const forceUpdate = useForceUpdate();
	const onChanged = (option: DropdownOption) => {
		params.statisticalInterval = option.value;
		forceUpdate();
	};

	return <Dropdown options={StatisticalIntervalOptions}
	                 value={params.statisticalInterval}
	                 onChange={onChanged}/>;
};
