import React, {useEffect} from 'react';
import {Report} from '@/services/tuples/report-types';
import {ReportNoFilter, ReportNoFilterCreateButton} from './widgets';
import {Lang} from '@/langs';
import {useReportEditEventBus} from '../report-edit-event-bus';
import {ParameterExpressionOperator, ParameterJointType} from '@/services/tuples/factor-calculator-types';
import {ReportEditEventTypes} from '../report-edit-event-bus-types';
import {createConstantParameter, createTopicFactorParameter} from '@/services/tuples/parameter-utils';
import {useForceUpdate} from '@/basic-widgets/utils';

export const NoFilter = (props: { report: Report }) => {
	const {report} = props;

	const {on, off, fire} = useReportEditEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(ReportEditEventTypes.FILTER_DESTROYED, forceUpdate);
		return () => {
			off(ReportEditEventTypes.FILTER_DESTROYED, forceUpdate);
		};
	}, [on, off, forceUpdate]);

	if (report.filters && report.filters.filters && report.filters.filters.length !== 0) {
		return null;
	}

	const onAddClicked = () => {
		report.filters = {
			jointType: ParameterJointType.AND,
			filters: [{
				// 1 is factor, always be subject itself
				left: createTopicFactorParameter('1'),
				operator: ParameterExpressionOperator.EQUALS,
				right: createConstantParameter()
			}]
		};
		fire(ReportEditEventTypes.FILTER_CREATED, report, report.filters);
		forceUpdate();
	};

	return <ReportNoFilter>
		<span>
			{Lang.CONSOLE.CONNECTED_SPACE.REPORT_NO_FILTER}
			<ReportNoFilterCreateButton onClick={onAddClicked}>
				{Lang.CONSOLE.CONNECTED_SPACE.CREATE_REPORT_FILTER}
			</ReportNoFilterCreateButton>
			{Lang.CONSOLE.CONNECTED_SPACE.REPORT_NO_FILTER_2}
		</span>
	</ReportNoFilter>;
};