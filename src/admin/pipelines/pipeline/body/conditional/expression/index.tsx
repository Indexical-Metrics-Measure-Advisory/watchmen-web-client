import {ICON_DELETE} from '@/basic-widgets/constants';
import {ParameterEventBusProvider} from '@/data-filter/parameter-event-bus';
import {
	ConstantParameter,
	ParameterExpression,
	ParameterExpressionOperator,
	ParameterKind,
	TopicFactorParameter
} from '@/services/tuples/factor-calculator-types';
import {Topic} from '@/services/tuples/topic-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {useExpressionEventBus} from '../event-bus/expression-event-bus';
import {ExpressionEventTypes} from '../event-bus/expression-event-bus-types';
import {RemoveMeButton} from '../widgets';
import {ExpressionSide} from './expression-side';
import {ExpressionOperator} from './operator';
import {Parameter2ExpressionBridge} from './parameter-2-expression-bridge';
import {RightPart} from './right';
import {ExpressionContainer, ExpressionHeader, ExpressionLeadLabel} from './widgets';

const defendExpression = (expression: ParameterExpression) => {
	if (!expression.left) {
		expression.left = {kind: ParameterKind.TOPIC, topicId: '', factorId: ''} as TopicFactorParameter;
	}
	if (!expression.operator) {
		expression.operator = ParameterExpressionOperator.EQUALS;
	}
	if (!expression.right) {
		expression.right = {kind: ParameterKind.CONSTANT, value: ''} as ConstantParameter;
	}
};

export const Expression = (props: { expression: ParameterExpression, topics: Array<Topic>, removeMe: () => void }) => {
	const {expression, topics, removeMe} = props;
	defendExpression(expression);

	const {fire} = useExpressionEventBus();

	const onLeftParameterChanged = () => {
		fire(ExpressionEventTypes.LEFT_CHANGED, expression);
	};

	return <ExpressionContainer>
		<ExpressionHeader>
			<ExpressionLeadLabel>Expression</ExpressionLeadLabel>
			<RemoveMeButton onClick={removeMe}>
				<FontAwesomeIcon icon={ICON_DELETE}/>
			</RemoveMeButton>
		</ExpressionHeader>
		<ParameterEventBusProvider>
			<Parameter2ExpressionBridge onChange={onLeftParameterChanged}/>
			<ExpressionSide base={expression} parameter={expression.left} topics={topics} leftSide={true}
			                expectArray={false}/>
		</ParameterEventBusProvider>
		<ExpressionOperator expression={expression}/>
		<RightPart expression={expression} topics={topics}/>
	</ExpressionContainer>;
};