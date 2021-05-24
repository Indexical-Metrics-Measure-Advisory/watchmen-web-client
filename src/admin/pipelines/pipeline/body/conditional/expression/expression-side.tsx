import React, {useEffect, useState} from 'react';
import {
	Parameter,
	ParameterExpression,
	ParameterExpressionOperator,
	ValidFactorTypes
} from '../../../../../../services/tuples/factor-calculator-types';
import {Topic} from '../../../../../../services/tuples/topic-types';
import {ComputedEditor} from '../../parameter/compute';
import {ConstantEditor} from '../../parameter/constant';
import {ParameterFromEditor} from '../../parameter/param-from';
import {TopicFactorEditor} from '../../parameter/topic-factor';
import {ExpressionSideContainer} from './widgets';
import {ExpressionEventTypes} from '../event-bus/expression-event-bus-types';
import {useExpressionEventBus} from '../event-bus/expression-event-bus';

const computeValidTypes = (operator?: ParameterExpressionOperator) => {
	switch (operator) {
		case ParameterExpressionOperator.MORE:
		case ParameterExpressionOperator.MORE_EQUALS:
		case ParameterExpressionOperator.LESS:
		case ParameterExpressionOperator.LESS_EQUALS:
			return ValidFactorTypes.NUMBER_AND_DATE;
		default:
			return ValidFactorTypes.ANY;
	}
};

export const ExpressionSide = (props: {
	base: ParameterExpression;
	parameter: Parameter;
	topics: Array<Topic>;
	visible?: boolean;
	leftSide: boolean;
}) => {
	const {base, parameter, topics, visible = true} = props;

	const {on, off} = useExpressionEventBus();
	const [validTypes, setValidTypes] = useState(computeValidTypes(base.operator));
	useEffect(() => {
		const onOperatorChanged = (expression: ParameterExpression) => {
			if (base !== expression) {
				return;
			}
			const newValidTypes = computeValidTypes(expression.operator);
			if (newValidTypes !== validTypes) {
				setValidTypes(newValidTypes);
			}
		};
		on(ExpressionEventTypes.OPERATOR_CHANGED, onOperatorChanged);
		return () => {
			off(ExpressionEventTypes.OPERATOR_CHANGED, onOperatorChanged);
		};
	}, [on, off, base, validTypes]);

	return <ExpressionSideContainer visible={visible}>
		<ParameterFromEditor parameter={parameter}/>
		<TopicFactorEditor parameter={parameter} topics={topics} validTypes={validTypes}/>
		<ConstantEditor parameter={parameter} validTypes={validTypes}/>
		<ComputedEditor parameter={parameter} topics={topics} validTypes={validTypes}/>
	</ExpressionSideContainer>;
};