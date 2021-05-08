import React from 'react';
import {SubjectDataSetFilterJoint} from '../../../../../../services/tuples/subject-types';
import {Topic} from '../../../../../../services/tuples/topic-types';
import {FilterEventBusProvider} from '../filter-event-bus';
import {HierarchicalFilterEventBridge} from '../hierarchical-filter-event-bridge';
import {JointEdit} from './joint-edit';
import {NonTopJointFilterContainer} from './widgets';

export const JointFilterEdit = (props: {
	parentJoint: SubjectDataSetFilterJoint;
	onRemoveMe: () => void;
	joint: SubjectDataSetFilterJoint;
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
	notifyChangeToParent: () => void;
}) => {
	const {
		parentJoint, onRemoveMe,
		joint,
		availableTopics, pickedTopics,
		notifyChangeToParent
	} = props;

	return <FilterEventBusProvider>
		<NonTopJointFilterContainer>
			<JointEdit parentJoint={parentJoint} onRemoveMe={onRemoveMe}
			           joint={joint}
			           availableTopics={availableTopics} pickedTopics={pickedTopics}/>
			<HierarchicalFilterEventBridge notifyChangeToParent={notifyChangeToParent}/>
		</NonTopJointFilterContainer>
	</FilterEventBusProvider>;
};