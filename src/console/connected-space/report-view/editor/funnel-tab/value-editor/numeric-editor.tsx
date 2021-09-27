import {Report, ReportFunnel, ReportFunnelType} from '@/services/data/tuples/report-types';
import React from 'react';
import {useReportEditEventBus} from '../../report-edit-event-bus';
import {ReportEditEventTypes} from '../../report-edit-event-bus-types';
import {NumberValue} from '../../settings-widgets/number-value';
import {useFunnelRange} from '../use-funnel-range';
import {PairToLabel} from '../widgets';
import {getAsNumeric, onNumericValueChange} from './value-utils';

const Editor = (props: { report: Report, funnel: ReportFunnel, valueIndex: number }) => {
	const {report, funnel, valueIndex} = props;

	const {fire} = useReportEditEventBus();

	const value = getAsNumeric(funnel, valueIndex);
	const validate = (value: string) => !isNaN(value as any);
	const onValueChange = onNumericValueChange(funnel, valueIndex, () => fire(ReportEditEventTypes.FUNNEL_VALUE_CHANGED, report, funnel));

	return <NumberValue value={value} validate={validate} onValueChange={onValueChange}/>;
};

const SingleNumericEditor = (props: { report: Report, funnel: ReportFunnel }) => {
	const {report, funnel} = props;

	useFunnelRange(report, funnel);

	if (!funnel.enabled || funnel.type !== ReportFunnelType.NUMERIC || funnel.range) {
		return null;
	}

	return <Editor report={report} funnel={funnel} valueIndex={0}/>;
};

const PairNumericEditor = (props: { report: Report, funnel: ReportFunnel }) => {
	const {report, funnel} = props;

	useFunnelRange(report, funnel);

	if (!funnel.enabled || funnel.type !== ReportFunnelType.NUMERIC || !funnel.range) {
		return null;
	}

	return <>
		<Editor report={report} funnel={funnel} valueIndex={0}/>
		<PairToLabel>~</PairToLabel>
		<Editor report={report} funnel={funnel} valueIndex={1}/>
	</>;
};

export const NumericEditor = (props: { report: Report, funnel: ReportFunnel }) => {
	const {report, funnel} = props;

	return <>
		<SingleNumericEditor report={report} funnel={funnel}/>
		<PairNumericEditor report={report} funnel={funnel}/>
	</>;
};