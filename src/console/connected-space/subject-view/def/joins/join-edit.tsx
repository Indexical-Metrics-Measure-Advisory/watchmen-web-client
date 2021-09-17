import {Subject, SubjectDataSetJoin} from '@/services/data/tuples/subject-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {ICON_DELETE} from '@/widgets/basic/constants';
import {ParameterEventBusProvider} from '@/widgets/parameter/parameter-event-bus';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {useSubjectDefEventBus} from '../subject-def-event-bus';
import {SubjectDefEventTypes} from '../subject-def-event-bus-types';
import {Join2DefEventBridge} from './join-2-def-event-bridge';
import {JoinEventBusProvider} from './join-event-bus';
import {JoinTypeEdit} from './join-type-edit';
import {JoinTopicFactorEdit} from './topic-factor-edit';
import {JoinEditContainer, JoinIndex, RemoveJoinIcon} from './widgets';

export const JoinEdit = (props: {
	subject: Subject;
	join: SubjectDataSetJoin;
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
}) => {
	const {subject, join, availableTopics, pickedTopics} = props;

	const {fire} = useSubjectDefEventBus();

	const onRemoveClicked = () => {
		const index = subject.dataset.joins.indexOf(join);
		if (index !== -1) {
			subject.dataset.joins.splice(index, 1);
			fire(SubjectDefEventTypes.DATASET_JOIN_REMOVED, join);
		}
	};

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
			<RemoveJoinIcon onClick={onRemoveClicked}>
				<FontAwesomeIcon icon={ICON_DELETE}/>
			</RemoveJoinIcon>
		</JoinEditContainer>
		<Join2DefEventBridge subject={subject} join={join}/>
	</JoinEventBusProvider>;
};