import React, {useEffect} from 'react';
import {useForceUpdate} from '@/basic-widgets/utils';
import {ParameterExpression, ParameterExpressionOperator} from '@/services/tuples/factor-calculator-types';
import {Topic} from '@/services/tuples/topic-types';
import {ParameterEventBusProvider} from '../../../parameter/parameter/parameter-event-bus';
import {useExpressionEventBus} from '../../event-bus/expression-event-bus';
import {ExpressionEventTypes} from '../../event-bus/expression-event-bus-types';
import {ExpressionSide} from '../expression-side';
import {Parameter2ExpressionBridge} from '../parameter-2-expression-bridge';

export const RightPart = (props: { expression: ParameterExpression, topics: Array<Topic> }) => {
	const {expression, topics} = props;

	const {on, off, fire} = useExpressionEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(ExpressionEventTypes.OPERATOR_CHANGED, forceUpdate);
		return () => {
			off(ExpressionEventTypes.OPERATOR_CHANGED, forceUpdate);
		};
	}, [on, off, forceUpdate]);

	const onRightParameterChanged = () => {
		fire(ExpressionEventTypes.RIGHT_CHANGED, expression);
	};

	const visible = expression.operator !== ParameterExpressionOperator.EMPTY
		&& expression.operator !== ParameterExpressionOperator.NOT_EMPTY;

	if (!visible) {
		return null;
	}

	const expectArray = expression.operator === ParameterExpressionOperator.IN
		|| expression.operator === ParameterExpressionOperator.NOT_IN;

	return <ParameterEventBusProvider>
		<Parameter2ExpressionBridge onChange={onRightParameterChanged}/>
		<ExpressionSide base={expression} parameter={expression.right} topics={topics}
		                visible={visible}
		                leftSide={false} expectArray={expectArray}/>
	</ParameterEventBusProvider>;
};
