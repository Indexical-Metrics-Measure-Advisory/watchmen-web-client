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
	topics: Array<Topic>;
	parentJoint: ParameterJoint;
	onRemoveMe: () => void;
	notifyChangeToParent: () => void;
	expression: ParameterExpression;
}) => {
	const {parentJoint, onRemoveMe, notifyChangeToParent, topics, expression} = props;

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
			<Expression filter={expression} parameter={expression.left} availableKinds={[ParameterKind.TOPIC]}
			            topics={topics}
			            visible={true}/>
			<ExpressionOperator filter={expression}/>
			<ExpressionRight filter={expression} parameter={expression.right} topics={topics}/>
		</ExpressionFilterContainer>
		<HierarchicalFilterEventBridge notifyChangeToParent={notifyChangeToParent}/>
	</FilterEventBusProvider>;
};