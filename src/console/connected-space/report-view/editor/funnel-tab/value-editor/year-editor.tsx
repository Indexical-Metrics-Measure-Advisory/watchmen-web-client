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
	const validate = (value: string) => {
		return new RegExp(`^[1|2]\\d{3}$`).test(value);
	};
	const onValueChange = onNumericValueChange(funnel, valueIndex, () => fire(ReportEditEventTypes.FUNNEL_VALUE_CHANGED, report, funnel));

	return <NumberValue value={value} validate={validate} onValueChange={onValueChange}/>;
};

const SingleYearEditor = (props: { report: Report, funnel: ReportFunnel }) => {
	const {report, funnel} = props;

	useFunnelRange(report, funnel);

	if (!funnel.enabled || funnel.type !== ReportFunnelType.YEAR || funnel.range) {
		return null;
	}

	return <Editor report={report} funnel={funnel} valueIndex={0}/>;
};

const PairYearEditor = (props: { report: Report, funnel: ReportFunnel }) => {
	const {report, funnel} = props;

	useFunnelRange(report, funnel);

	if (!funnel.enabled || funnel.type !== ReportFunnelType.YEAR || !funnel.range) {
		return null;
	}

	return <>
		<Editor report={report} funnel={funnel} valueIndex={0}/>
		<PairToLabel>~</PairToLabel>
		<Editor report={report} funnel={funnel} valueIndex={1}/>
	</>;
};

export const YearEditor = (props: { report: Report, funnel: ReportFunnel }) => {
	const {report, funnel} = props;

	return <>
		<SingleYearEditor report={report} funnel={funnel}/>
		<PairYearEditor report={report} funnel={funnel}/>
	</>;
};