import {MonitorRuleParameters, MonitorRuleStatisticalInterval} from '@/services/data/data-quality/rule-types';
import {Dropdown} from '@/widgets/basic/dropdown';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import React from 'react';

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
