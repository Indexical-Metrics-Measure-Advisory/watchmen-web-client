import {SubjectDataSetFilterExpression, SubjectDataSetFilterJoint} from '@/services/data/tuples/subject-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {ICON_DELETE} from '@/widgets/basic/constants';
import {Lang} from '@/widgets/langs';
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
	parentJoint: SubjectDataSetFilterJoint;
	onRemoveMe: () => void;
	notifyChangeToParent: () => void;
	filter: SubjectDataSetFilterExpression;
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
}) => {
	const {
		parentJoint, onRemoveMe, notifyChangeToParent,
		filter, availableTopics, pickedTopics
	} = props;

	const onRemoveClicked = (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();

		const index = parentJoint.filters.indexOf(filter);
		if (index !== -1) {
			parentJoint.filters.splice(index, 1);
			onRemoveMe && onRemoveMe();
		}
	};

	return <FilterEventBusProvider>
		<ExpressionFilterContainer>
			<ExpressionLeadLabel>{Lang.PARAMETER.EXPRESSION}</ExpressionLeadLabel>
			<RemoveFilterIcon onClick={onRemoveClicked}>
				<FontAwesomeIcon icon={ICON_DELETE}/>
			</RemoveFilterIcon>
			<Expression filter={filter} parameter={filter.left}
			            availableTopics={availableTopics} pickedTopics={pickedTopics}
			            visible={true}/>
			<ExpressionOperator filter={filter}/>
			<ExpressionRight filter={filter} parameter={filter.right}
			                 availableTopics={availableTopics} pickedTopics={pickedTopics}/>
		</ExpressionFilterContainer>
		<HierarchicalFilterEventBridge notifyChangeToParent={notifyChangeToParent}/>
	</FilterEventBusProvider>;
};