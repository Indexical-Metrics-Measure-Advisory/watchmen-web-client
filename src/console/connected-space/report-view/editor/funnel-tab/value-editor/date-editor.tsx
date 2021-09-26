import {Report, ReportFunnel, ReportFunnelType} from '@/services/data/tuples/report-types';
import {Calendar} from '@/widgets/basic/calendar';
import {useForceUpdate} from '@/widgets/basic/utils';
import React from 'react';
import {useReportEditEventBus} from '../../report-edit-event-bus';
import {ReportEditEventTypes} from '../../report-edit-event-bus-types';
import {PropValue} from '../../settings-widgets/widgets';
import {useFunnelRange} from '../use-funnel-range';
import {getAsDate, onDateValueChange} from './value-utils';

export const DateEditor = (props: { report: Report, funnel: ReportFunnel }) => {
	const {report, funnel} = props;

	const {fire} = useReportEditEventBus();
	const forceUpdate = useForceUpdate();
	useFunnelRange(report, funnel);

	if (!funnel.enabled || funnel.type !== ReportFunnelType.DATE || funnel.range) {
		return null;
	}

	const value = getAsDate(funnel);
	const onValueChange = onDateValueChange(funnel, () => {
		forceUpdate();
		fire(ReportEditEventTypes.FUNNEL_VALUE_CHANGED, report, funnel);
	});

	return <PropValue>
		<Calendar value={value} onChange={onValueChange} showTime={false}/>
	</PropValue>;
};