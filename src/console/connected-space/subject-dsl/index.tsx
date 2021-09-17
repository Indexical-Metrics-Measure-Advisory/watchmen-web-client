import {Subject} from '@/services/data/tuples/subject-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {Lang} from '@/widgets/langs';
import React from 'react';
import {From} from './from';
import {Select} from './select';
import {Where} from './where';
import {LeadKeyword} from './widgets';

/**
 * this component renders 3 pairs sub components.
 * can be layout by outside.
 */
export const SubjectDsl = (props: {
	subject: Subject;
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
	visible: boolean;
}) => {
	const {subject, availableTopics, pickedTopics, visible} = props;

	if (!visible) {
		return null;
	}

	return <>
		<LeadKeyword>{Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_SELECT}</LeadKeyword>
		<Select subject={subject}
		        availableTopics={availableTopics} pickedTopics={pickedTopics}/>
		<LeadKeyword>{Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_FROM}</LeadKeyword>
		<From subject={subject}
		      availableTopics={availableTopics} pickedTopics={pickedTopics}/>
		<LeadKeyword>{Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_WHERE}</LeadKeyword>
		<Where subject={subject}
		       availableTopics={availableTopics} pickedTopics={pickedTopics}/>
	</>;
};