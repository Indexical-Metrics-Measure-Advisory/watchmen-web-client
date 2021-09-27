import {Report, ReportFunnel, ReportFunnelType} from '@/services/data/tuples/report-types';
import {DropdownOption} from '@/widgets/basic/types';
import {Lang} from '@/widgets/langs';
import React from 'react';
import {useReportEditEventBus} from '../../report-edit-event-bus';
import {ReportEditEventTypes} from '../../report-edit-event-bus-types';
import {DropdownValue} from '../../settings-widgets/dropdown-value';
import {useFunnelRange} from '../use-funnel-range';
import {PairToLabel} from '../widgets';
import {getAsString, onDropdownValueChange} from './value-utils';

const Editor = (props: {
	report: Report;
	funnel: ReportFunnel;
	valueIndex: number;
	options: Array<DropdownOption>;
}) => {
	const {report, funnel, valueIndex, options} = props;

	const {fire} = useReportEditEventBus();

	const value = getAsString(funnel, valueIndex);
	const onValueChange = onDropdownValueChange(funnel, valueIndex, () => fire(ReportEditEventTypes.FUNNEL_VALUE_CHANGED, report, funnel));

	return <DropdownValue value={value ? value.toString() : ''}
	                      onValueChange={onValueChange}
	                      options={[{value: '', label: Lang.CHART.PLEASE_SELECT_FUNNEL_VALUE}, ...options]}/>;
};
export const SingleEditor = (props: {
	report: Report;
	funnel: ReportFunnel;
	acceptedType: ReportFunnelType;
	options: Array<DropdownOption>;
}) => {
	const {report, funnel, acceptedType, options} = props;

	useFunnelRange(report, funnel);

	if (!funnel.enabled || funnel.type !== acceptedType || funnel.range) {
		return null;
	}

	return <Editor report={report} funnel={funnel} valueIndex={0} options={options}/>;
};
const PairEditor = (props: {
	report: Report;
	funnel: ReportFunnel;
	acceptedType: ReportFunnelType;
	options: Array<DropdownOption>;
}) => {
	const {report, funnel, acceptedType, options} = props;

	useFunnelRange(report, funnel);

	if (!funnel.enabled || funnel.type !== acceptedType || !funnel.range) {
		return null;
	}

	return <>
		<Editor report={report} funnel={funnel} valueIndex={0} options={options}/>
		<PairToLabel>~</PairToLabel>
		<Editor report={report} funnel={funnel} valueIndex={1} options={options}/>
	</>;
};
export const DropdownEditor = (props: {
	report: Report;
	funnel: ReportFunnel;
	acceptedType: ReportFunnelType;
	options: Array<DropdownOption>;
}) => {
	const {report, funnel, acceptedType, options} = props;

	return <>
		<SingleEditor report={report} funnel={funnel} acceptedType={acceptedType} options={options}/>
		<PairEditor report={report} funnel={funnel} acceptedType={acceptedType} options={options}/>
	</>;
};