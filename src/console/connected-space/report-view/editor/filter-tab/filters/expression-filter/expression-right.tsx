import React, {useEffect} from 'react';
import {useFilterEventBus} from '../filter-event-bus';
import {FilterEventTypes} from '../filter-event-bus-types';
import {Expression} from './expression';
import {Subject} from '@/services/tuples/subject-types';
import {Report, ReportFilterExpression} from '@/services/tuples/report-types';
import {Parameter, ParameterExpressionOperator, ParameterKind} from '@/services/tuples/factor-calculator-types';
import {useForceUpdate} from '@/basic-widgets/utils';

export const ExpressionRight = (props: {
	subject: Subject;
	report: Report;
	filter: ReportFilterExpression;
	parameter: Parameter
}) => {
	const {subject, report, filter, parameter} = props;

	const {on, off} = useFilterEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(FilterEventTypes.CONTENT_CHANGED, forceUpdate);
		return () => {
			off(FilterEventTypes.CONTENT_CHANGED, forceUpdate);
		};
	}, [on, off, forceUpdate]);

	const visible = filter.operator !== ParameterExpressionOperator.NOT_EMPTY
		&& filter.operator !== ParameterExpressionOperator.EMPTY;

	return <Expression subject={subject} report={report}
	                   filter={filter} parameter={parameter} availableKinds={[ParameterKind.CONSTANT]}
	                   visible={visible}/>;
};