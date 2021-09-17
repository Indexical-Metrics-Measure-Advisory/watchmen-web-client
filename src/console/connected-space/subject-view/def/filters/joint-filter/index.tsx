import {SubjectDataSetFilterJoint} from '@/services/data/tuples/subject-types';
import {Topic} from '@/services/data/tuples/topic-types';
import React from 'react';
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