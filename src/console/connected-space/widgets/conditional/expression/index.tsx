import {
	ConstantParameter,
	ParameterExpression,
	ParameterExpressionOperator,
	ParameterKind,
	TopicFactorParameter
} from '@/services/data/tuples/factor-calculator-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {ICON_DELETE} from '@/widgets/basic/constants';
import {ParameterEventBusProvider} from '@/widgets/parameter/parameter-event-bus';
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

export const Expression = (props: {
	expression: ParameterExpression;
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
	removeMe: () => void
}) => {
	const {expression, availableTopics, pickedTopics, removeMe} = props;
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
			<ExpressionSide base={expression} parameter={expression.left}
			                availableTopics={availableTopics} pickedTopics={pickedTopics}
			                leftSide={true}/>
		</ParameterEventBusProvider>
		<ExpressionOperator expression={expression}/>
		<RightPart expression={expression} availableTopics={availableTopics} pickedTopics={pickedTopics}/>
	</ExpressionContainer>;
};