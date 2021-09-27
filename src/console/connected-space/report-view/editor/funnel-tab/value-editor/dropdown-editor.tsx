import {useFunnelRange} from '@/console/connected-space/report-view/editor/funnel-tab/use-funnel-range';
import {
	getAsString,
	onDropdownValueChange
} from '@/console/connected-space/report-view/editor/funnel-tab/value-editor/value-utils';
import {PairToLabel} from '@/console/connected-space/report-view/editor/funnel-tab/widgets';
import {useReportEditEventBus} from '@/console/connected-space/report-view/editor/report-edit-event-bus';
import {ReportEditEventTypes} from '@/console/connected-space/report-view/editor/report-edit-event-bus-types';
import {DropdownValue} from '@/console/connected-space/report-view/editor/settings-widgets/dropdown-value';
import {Report, ReportFunnel, ReportFunnelType} from '@/services/data/tuples/report-types';
import {DropdownOption} from '@/widgets/basic/types';
import {Lang} from '@/widgets/langs';
import React from 'react';

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