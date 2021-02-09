import React from 'react';
import { Lang } from '../../../../../langs';
import { Subject } from '../../../../../services/tuples/subject-types';
import { Topic } from '../../../../../services/tuples/topic-types';
import { From } from './from';
import { Select } from './select';
import { Where } from './where';
import { LeadKeyword, OverviewPanelContainer } from './widgets';

export const OverviewPanel = (props: {
	subject: Subject;
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
	active: boolean;
}) => {
	const { subject, availableTopics, pickedTopics, active } = props;

	return <OverviewPanelContainer>
		<LeadKeyword>{Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_SELECT}</LeadKeyword>
		<Select subject={subject}
		        availableTopics={availableTopics} pickedTopics={pickedTopics}
		        active={active}/>
		<LeadKeyword>{Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_FROM}</LeadKeyword>
		<From subject={subject}
		      availableTopics={availableTopics} pickedTopics={pickedTopics}
		      active={active}/>
		<LeadKeyword>{Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_WHERE}</LeadKeyword>
		<Where subject={subject}
		       availableTopics={availableTopics} pickedTopics={pickedTopics}
		       active={active}/>
	</OverviewPanelContainer>;
};