import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { MouseEvent } from 'react';
import { ICON_DELETE } from '../../../../../../basic-widgets/constants';
import {
	Subject,
	SubjectDataSetFilterExpression,
	SubjectDataSetFilterJoint
} from '../../../../../../services/tuples/subject-types';
import { Topic } from '../../../../../../services/tuples/topic-types';
import { FilterEventBusProvider } from '../filter-event-bus';
import { HierarchicalFilterEventBridge } from '../hierarchical-filter-event-bridge';
import { Expression } from './expression';
import { ExpressionOperator } from './expression-operator';
import { ExpressionFilterContainer, ExpressionLeadLabel } from './widgets';
import { RemoveFilterIcon } from '../widgets';

export const ExpressionFilterEdit = (props: {
	subject: Subject;
	parentJoint: SubjectDataSetFilterJoint;
	onRemoveMe: () => void;
	notifyChangeToParent: () => void;
	filter: SubjectDataSetFilterExpression;
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
}) => {
	const {
		subject,
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
			<ExpressionLeadLabel>Expression</ExpressionLeadLabel>
			<RemoveFilterIcon onClick={onRemoveClicked}>
				<FontAwesomeIcon icon={ICON_DELETE}/>
			</RemoveFilterIcon>
			<Expression subject={subject} filter={filter} parameter={filter.left}
			            availableTopics={availableTopics} pickedTopics={pickedTopics}/>
			<ExpressionOperator filter={filter}/>
			<Expression subject={subject} filter={filter} parameter={filter.right}
			            availableTopics={availableTopics} pickedTopics={pickedTopics}/>
		</ExpressionFilterContainer>
		<HierarchicalFilterEventBridge notifyChangeToParent={notifyChangeToParent}/>
	</FilterEventBusProvider>;
};