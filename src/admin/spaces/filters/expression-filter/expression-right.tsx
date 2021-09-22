import {
	Parameter,
	ParameterExpression,
	ParameterExpressionOperator,
	ParameterKind
} from '@/services/data/tuples/factor-calculator-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import React, {useEffect} from 'react';
import {useFilterEventBus} from '../filter-event-bus';
import {FilterEventTypes} from '../filter-event-bus-types';
import {Expression} from './expression';

export const ExpressionRight = (props: {
	topic: Topic;
	expression: ParameterExpression;
	right: Parameter
}) => {
	const {topic, expression, right} = props;

	const {on, off} = useFilterEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(FilterEventTypes.CONTENT_CHANGED, forceUpdate);
		return () => {
			off(FilterEventTypes.CONTENT_CHANGED, forceUpdate);
		};
	}, [on, off, forceUpdate]);

	const visible = expression.operator !== ParameterExpressionOperator.NOT_EMPTY
		&& expression.operator !== ParameterExpressionOperator.EMPTY;

	return <Expression topic={topic}
	                   expression={expression} parameter={right} availableKinds={[ParameterKind.CONSTANT]}
	                   visible={visible}/>;
};