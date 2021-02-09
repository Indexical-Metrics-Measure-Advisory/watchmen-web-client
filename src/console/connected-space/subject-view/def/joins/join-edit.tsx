import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ICON_DELETE } from '../../../../../basic-widgets/constants';
import { Subject, SubjectDataSetJoin } from '../../../../../services/tuples/subject-types';
import { Topic } from '../../../../../services/tuples/topic-types';
import { ParameterEventBusProvider } from '../parameter/parameter-event-bus';
import { Join2DefEventBridge } from './join-2-def-event-bridge';
import { JoinEventBusProvider } from './join-event-bus';
import { JoinTypeEdit } from './join-type-edit';
import { JoinTopicFactorEdit } from './topic-factor-edit';
import { JoinEditContainer, JoinIndex, RemoveJoinIcon } from './widgets';

export const JoinEdit = (props: {
	subject: Subject;
	join: SubjectDataSetJoin;
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
}) => {
	const { subject, join, availableTopics, pickedTopics } = props;

	const index = subject.dataset.joins.indexOf(join) + 1;

	return <JoinEventBusProvider>
		<JoinEditContainer>
			<JoinIndex>{index}</JoinIndex>
			<ParameterEventBusProvider>
				<JoinTopicFactorEdit subject={subject} join={join} first={true}
				                     availableTopics={availableTopics} pickedTopics={pickedTopics}/>
			</ParameterEventBusProvider>
			<JoinTypeEdit join={join}/>
			<ParameterEventBusProvider>
				<JoinTopicFactorEdit subject={subject} join={join} first={false}
				                     availableTopics={availableTopics} pickedTopics={pickedTopics}/>
			</ParameterEventBusProvider>
			<RemoveJoinIcon>
				<FontAwesomeIcon icon={ICON_DELETE}/>
			</RemoveJoinIcon>
		</JoinEditContainer>
		<Join2DefEventBridge subject={subject} join={join}/>
	</JoinEventBusProvider>;
};