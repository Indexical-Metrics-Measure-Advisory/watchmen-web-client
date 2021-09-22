import {ParameterExpression, ParameterJoint, ParameterKind} from '@/services/data/tuples/factor-calculator-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {ICON_DELETE} from '@/widgets/basic/constants';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {MouseEvent} from 'react';
import {FilterEventBusProvider} from '../filter-event-bus';
import {HierarchicalFilterEventBridge} from '../hierarchical-filter-event-bridge';
import {RemoveFilterIcon} from '../widgets';
import {Expression} from './expression';
import {ExpressionOperator} from './expression-operator';
import {ExpressionRight} from './expression-right';
import {ExpressionFilterContainer, ExpressionLeadLabel} from './widgets';

export const ExpressionFilterEdit = (props: {
	topic: Topic;
	parentJoint: ParameterJoint;
	onRemoveMe: () => void;
	notifyChangeToParent: () => void;
	expression: ParameterExpression;
}) => {
	const {parentJoint, onRemoveMe, notifyChangeToParent, topic, expression} = props;

	const onRemoveClicked = (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();

		const index = parentJoint.filters.indexOf(expression);
		if (index !== -1) {
			parentJoint.filters.splice(index, 1);
			onRemoveMe && onRemoveMe();
		}
	};

	return <FilterEventBusProvider>
		<ExpressionFilterContainer>
			<ExpressionLeadLabel>Expression</ExpressionLeadLabel>
			<RemoveFilterIcon onClick={onRemoveClicked}>
				<FontAwesomeIcon icon={ICON_DELETE}/>
			</RemoveFilterIcon>
			<Expression expression={expression} parameter={expression.left} availableKinds={[ParameterKind.TOPIC]}
			            topic={topic}
			            visible={true}/>
			<ExpressionOperator expression={expression}/>
			<ExpressionRight expression={expression} right={expression.right} topic={topic}/>
		</ExpressionFilterContainer>
		<HierarchicalFilterEventBridge notifyChangeToParent={notifyChangeToParent}/>
	</FilterEventBusProvider>;
};