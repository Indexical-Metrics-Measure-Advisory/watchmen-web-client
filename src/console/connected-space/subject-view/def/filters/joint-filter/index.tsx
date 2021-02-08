import React from 'react';
import { Subject, SubjectDataSetFilterJoint } from '../../../../../../services/tuples/subject-types';
import { Topic } from '../../../../../../services/tuples/topic-types';
import { FilterEventBusProvider } from '../filter-event-bus';
import { JointEdit } from './joint-edit';

export const JointFilterEdit = (props: {
	subject: Subject;
	joint: SubjectDataSetFilterJoint;
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
}) => {
	const { subject, joint, availableTopics, pickedTopics } = props;

	return <FilterEventBusProvider>
		<JointEdit subject={subject} joint={joint}
		           availableTopics={availableTopics} pickedTopics={pickedTopics} removable={true}/>
	</FilterEventBusProvider>;
};