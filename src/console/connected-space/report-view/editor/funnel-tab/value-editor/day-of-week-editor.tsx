import {Report, ReportFunnel, ReportFunnelType} from '@/services/data/tuples/report-types';
import {Lang} from '@/widgets/langs';
import React from 'react';
import {useReportEditEventBus} from '../../report-edit-event-bus';
import {ReportEditEventTypes} from '../../report-edit-event-bus-types';
import {DropdownValue} from '../../settings-widgets/dropdown-value';
import {useFunnelRange} from '../use-funnel-range';
import {getAsNumeric, onDropdownValueChange} from './value-utils';

export const DayOfWeekEditor = (props: { report: Report, funnel: ReportFunnel }) => {
	const {report, funnel} = props;

	const {fire} = useReportEditEventBus();
	useFunnelRange(report, funnel);

	if (!funnel.enabled || funnel.type !== ReportFunnelType.DAY_OF_WEEK || funnel.range) {
		return null;
	}

	const value = getAsNumeric(funnel);
	const onValueChange = onDropdownValueChange(funnel, () => fire(ReportEditEventTypes.FUNNEL_VALUE_CHANGED, report, funnel));
	const options = [
		{value: '', label: Lang.CHART.PLEASE_SELECT_FUNNEL_VALUE},
		...new Array(31).fill(1)
			.map((_, index) => index + 1)
			.map(date => {
				return {value: `${date}`, label: `${date}`};
			})
	];

	return <DropdownValue value={value ? value.toString() : ''}
	                      onValueChange={onValueChange}
	                      options={options}/>;
};