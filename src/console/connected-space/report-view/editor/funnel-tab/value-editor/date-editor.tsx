import {Report, ReportFunnel, ReportFunnelType} from '@/services/data/tuples/report-types';
import {Calendar} from '@/widgets/basic/calendar';
import {useForceUpdate} from '@/widgets/basic/utils';
import React from 'react';
import {useReportEditEventBus} from '../../report-edit-event-bus';
import {ReportEditEventTypes} from '../../report-edit-event-bus-types';
import {PropValue} from '../../settings-widgets/widgets';
import {useFunnelRange} from '../use-funnel-range';
import {PairToLabel} from '../widgets';
import {getAsDate, onDateValueChange} from './value-utils';

const Editor = (props: { report: Report, funnel: ReportFunnel, valueIndex: number }) => {
	const {report, funnel, valueIndex} = props;

	const {fire} = useReportEditEventBus();
	const forceUpdate = useForceUpdate();

	const value = getAsDate(funnel, valueIndex);
	const onValueChange = onDateValueChange(funnel, valueIndex, () => {
		forceUpdate();
		fire(ReportEditEventTypes.FUNNEL_VALUE_CHANGED, report, funnel);
	});

	return <PropValue>
		<Calendar value={value} onChange={onValueChange} showTime={false}/>
	</PropValue>;
};

const SingleDateEditor = (props: { report: Report, funnel: ReportFunnel }) => {
	const {report, funnel} = props;

	useFunnelRange(report, funnel);

	if (!funnel.enabled || funnel.type !== ReportFunnelType.DATE || funnel.range) {
		return null;
	}

	return <Editor report={report} funnel={funnel} valueIndex={0}/>;
};

const PairDateEditor = (props: { report: Report, funnel: ReportFunnel }) => {
	const {report, funnel} = props;

	useFunnelRange(report, funnel);

	if (!funnel.enabled || funnel.type !== ReportFunnelType.DATE || !funnel.range) {
		return null;
	}

	return <>
		<Editor report={report} funnel={funnel} valueIndex={0}/>
		<PairToLabel>~</PairToLabel>
		<Editor report={report} funnel={funnel} valueIndex={1}/>
	</>;
};

export const DateEditor = (props: { report: Report, funnel: ReportFunnel }) => {
	const {report, funnel} = props;

	return <>
		<SingleDateEditor report={report} funnel={funnel}/>
		<PairDateEditor report={report} funnel={funnel}/>
	</>;
};