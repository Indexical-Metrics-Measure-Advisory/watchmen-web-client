import {Report, ReportFunnel, ReportFunnelType} from '@/services/data/tuples/report-types';
import React from 'react';
import {useReportEditEventBus} from '../../report-edit-event-bus';
import {ReportEditEventTypes} from '../../report-edit-event-bus-types';
import {NumberValue} from '../../settings-widgets/number-value';
import {useFunnelRange} from '../use-funnel-range';
import {getAsNumeric, onNumericValueChange} from './value-utils';

export const NumericEditor = (props: { report: Report, funnel: ReportFunnel }) => {
	const {report, funnel} = props;

	const {fire} = useReportEditEventBus();
	useFunnelRange(report, funnel);

	if (!funnel.enabled || funnel.type !== ReportFunnelType.NUMERIC || funnel.range) {
		return null;
	}

	const value = getAsNumeric(funnel);
	const validate = (value: string) => !isNaN(value as any);
	const onValueChange = onNumericValueChange(funnel, () => fire(ReportEditEventTypes.FUNNEL_VALUE_CHANGED, report, funnel));

	return <NumberValue value={value} validate={validate} onValueChange={onValueChange}/>;
};