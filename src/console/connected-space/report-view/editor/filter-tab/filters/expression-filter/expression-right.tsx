import {Parameter, ParameterExpressionOperator, ParameterKind} from '@/services/data/tuples/factor-calculator-types';
import {Report, ReportFilterExpression} from '@/services/data/tuples/report-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import React, {useEffect} from 'react';
import {useFilterEventBus} from '../filter-event-bus';
import {FilterEventTypes} from '../filter-event-bus-types';
import {Expression} from './expression';

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