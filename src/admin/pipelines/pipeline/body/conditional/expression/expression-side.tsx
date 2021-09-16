import React, {useEffect, useState} from 'react';
import {Parameter, ParameterExpression} from '@/services/tuples/factor-calculator-types';
import {Topic} from '@/services/tuples/topic-types';
import {ComputedEditor} from '../../parameter/compute';
import {ConstantEditor} from '../../parameter/constant';
import {ParameterFromEditor} from '../../parameter/param-from';
import {TopicFactorEditor} from '../../parameter/topic-factor';
import {ExpressionSideContainer} from './widgets';
import {ExpressionEventTypes} from '../event-bus/expression-event-bus-types';
import {useExpressionEventBus} from '../event-bus/expression-event-bus';
import {computeValidTypesByExpressionOperator} from '@/services/tuples/factor-calculator-utils';

export const ExpressionSide = (props: {
	base: ParameterExpression;
	parameter: Parameter;
	topics: Array<Topic>;
	visible?: boolean;
	leftSide: boolean;
	// expect array or not, can be true only when left side is false
	expectArray: boolean;
}) => {
	const {base, parameter, topics, visible = true, expectArray} = props;

	const {on, off} = useExpressionEventBus();
	const [expectedTypes, setExpectedTypes] = useState(computeValidTypesByExpressionOperator(base.operator));
	useEffect(() => {
		const onOperatorChanged = (expression: ParameterExpression) => {
			if (base !== expression) {
				return;
			}
			const newExpectedTypes = computeValidTypesByExpressionOperator(expression.operator);
			if (newExpectedTypes !== expectedTypes) {
				setExpectedTypes(newExpectedTypes);
			}
		};
		on(ExpressionEventTypes.OPERATOR_CHANGED, onOperatorChanged);
		return () => {
			off(ExpressionEventTypes.OPERATOR_CHANGED, onOperatorChanged);
		};
	}, [on, off, base, expectedTypes]);

	return <ExpressionSideContainer visible={visible}>
		<ParameterFromEditor parameter={parameter}/>
		<TopicFactorEditor parameter={parameter} topics={topics} expectedTypes={expectedTypes}/>
		<ConstantEditor parameter={parameter} expectedTypes={expectedTypes} expectArray={expectArray}/>
		<ComputedEditor parameter={parameter} topics={topics} expectedTypes={expectedTypes} expectArray={expectArray}/>
	</ExpressionSideContainer>;
};