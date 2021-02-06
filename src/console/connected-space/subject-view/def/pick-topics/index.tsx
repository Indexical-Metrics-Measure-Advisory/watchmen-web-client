import React from 'react';
import { Lang } from '../../../../../langs';
import { ConnectedSpace } from '../../../../../services/tuples/connected-space-types';
import { Subject } from '../../../../../services/tuples/subject-types';
import { useTopicData } from '../use-topic-data';
import { SubjectDefBodyCover } from '../widgets';
import { AvailableTopic } from './available-topic';
import { AvailableTopicBottomGap, PickTopicsContainer } from './widgets';

export const PickTopics = (props: {
	connectedSpace: ConnectedSpace;
	subject: Subject;
	active: boolean;
}) => {
	const { active } = props;

	const data = useTopicData();

	return <PickTopicsContainer active={active}>
		{data.availableTopics.sort((t1, t2) => {
			return t1.name.toLowerCase().localeCompare(t2.name.toLowerCase());
		}).map(topic => {
			return <AvailableTopic topic={topic} picked={data.pickedTopics.includes(topic)} key={topic.topicId}/>;
		})}
		<AvailableTopicBottomGap/>
		<SubjectDefBodyCover active={active}>{Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_PICK_TOPICS}</SubjectDefBodyCover>
	</PickTopicsContainer>;
};