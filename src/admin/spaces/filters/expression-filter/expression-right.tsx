import {Parameter, ParameterExpressionOperator, ParameterKind} from '@/services/data/tuples/factor-calculator-types';
import {ReportFilterExpression} from '@/services/data/tuples/report-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import React, {useEffect} from 'react';
import {useFilterEventBus} from '../filter-event-bus';
import {FilterEventTypes} from '../filter-event-bus-types';
import {Expression} from './expression';

export const ExpressionRight = (props: {
	topics: Array<Topic>;
	filter: ReportFilterExpression;
	parameter: Parameter
}) => {
	const {topics, filter, parameter} = props;

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

	return <Expression topics={topics}
	                   filter={filter} parameter={parameter} availableKinds={[ParameterKind.CONSTANT]}
	                   visible={visible}/>;
};