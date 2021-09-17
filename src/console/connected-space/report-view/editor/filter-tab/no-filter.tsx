import {ParameterExpressionOperator, ParameterJointType} from '@/services/data/tuples/factor-calculator-types';
import {createConstantParameter, createTopicFactorParameter} from '@/services/data/tuples/parameter-utils';
import {Report} from '@/services/data/tuples/report-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import React, {useEffect} from 'react';
import {useReportEditEventBus} from '../report-edit-event-bus';
import {ReportEditEventTypes} from '../report-edit-event-bus-types';
import {ReportNoFilter, ReportNoFilterCreateButton} from './widgets';

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