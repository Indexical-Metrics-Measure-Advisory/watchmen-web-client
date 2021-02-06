import React, { useEffect, useState } from 'react';
import { ConnectedSpace } from '../../../../../services/tuples/connected-space-types';
import { Subject } from '../../../../../services/tuples/subject-types';
import { Topic } from '../../../../../services/tuples/topic-types';
import { useSubjectDefEventBus } from '../subject-def-event-bus';
import { SubjectDefData, SubjectDefEventTypes } from '../subject-def-event-bus-types';
import { AvailableTopic } from './available-topic';
import { PickTopicsContainer } from './widgets';

export const PickTopics = (props: {
	connectedSpace: ConnectedSpace;
	subject: Subject;
	active: boolean;
}) => {
	const { active } = props;

	const { on, off } = useSubjectDefEventBus();
	const [ data, setData ] = useState<Pick<SubjectDefData, 'availableTopics' | 'pickedTopics'>>({
		availableTopics: [],
		pickedTopics: []
	});
	useEffect(() => {
		const onAvailableTopicsLoaded = ({ availableTopics, pickedTopics }: SubjectDefData) => {
			setData({ availableTopics, pickedTopics });
		};
		const onTopicPicked = (topic: Topic) => {
			setData(data => ({ ...data, pickedTopics: Array.from(new Set([ ...data.pickedTopics, topic ])) }));
		};
		const onTopicUnpicked = (topic: Topic) => {
			setData(data => ({ ...data, pickedTopics: data.pickedTopics.filter(exists => exists !== topic) }));
		};
		on(SubjectDefEventTypes.DATA_LOADED, onAvailableTopicsLoaded);
		on(SubjectDefEventTypes.TOPIC_PICKED, onTopicPicked);
		on(SubjectDefEventTypes.TOPIC_UNPICKED, onTopicUnpicked);
		return () => {
			off(SubjectDefEventTypes.DATA_LOADED, onAvailableTopicsLoaded);
			off(SubjectDefEventTypes.TOPIC_PICKED, onTopicPicked);
			off(SubjectDefEventTypes.TOPIC_UNPICKED, onTopicUnpicked);
		};
	}, [ on, off ]);

	return <PickTopicsContainer active={active}>
		{data.availableTopics.sort((t1, t2) => {
			return t1.name.toLowerCase().localeCompare(t2.name.toLowerCase());
		}).map(topic => {
			return <AvailableTopic topic={topic} picked={data.pickedTopics.includes(topic)} key={topic.topicId}/>;
		})}
	</PickTopicsContainer>;
};