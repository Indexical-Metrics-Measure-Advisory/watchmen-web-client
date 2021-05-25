import React, {useEffect, useState} from 'react';
import {Parameter, ParameterExpression} from '../../../../../../services/tuples/factor-calculator-types';
import {Topic} from '../../../../../../services/tuples/topic-types';
import {ComputedEditor} from '../../parameter/compute';
import {ConstantEditor} from '../../parameter/constant';
import {ParameterFromEditor} from '../../parameter/param-from';
import {TopicFactorEditor} from '../../parameter/topic-factor';
import {ExpressionSideContainer} from './widgets';
import {ExpressionEventTypes} from '../event-bus/expression-event-bus-types';
import {useExpressionEventBus} from '../event-bus/expression-event-bus';
import {computeValidTypesByExpressionOperator} from '../../../../../../services/tuples/factor-calculator-utils';

export const ExpressionSide = (props: {
	base: ParameterExpression;
	parameter: Parameter;
	topics: Array<Topic>;
	visible?: boolean;
	leftSide: boolean;
}) => {
	const {base, parameter, topics, visible = true} = props;

	const {on, off} = useExpressionEventBus();
	const [validTypes, setValidTypes] = useState(computeValidTypesByExpressionOperator(base.operator));
	useEffect(() => {
		const onOperatorChanged = (expression: ParameterExpression) => {
			if (base !== expression) {
				return;
			}
			const newValidTypes = computeValidTypesByExpressionOperator(expression.operator);
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
		<TopicFactorEditor parameter={parameter} topics={topics} expectedTypes={validTypes}/>
		<ConstantEditor parameter={parameter} expectedTypes={validTypes}/>
		<ComputedEditor parameter={parameter} topics={topics} expectedTypes={validTypes}/>
	</ExpressionSideContainer>;
};