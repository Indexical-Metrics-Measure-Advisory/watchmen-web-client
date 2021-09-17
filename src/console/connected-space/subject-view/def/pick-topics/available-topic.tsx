import {Topic} from '@/services/data/tuples/topic-types';
import {ICON_SELECTED} from '@/widgets/basic/constants';
import React from 'react';
import {useSubjectDefEventBus} from '../subject-def-event-bus';
import {SubjectDefEventTypes} from '../subject-def-event-bus-types';
import {AvailableTopicCard, TopicName, TopicPicked} from './widgets';

export const AvailableTopic = (props: { topic: Topic, picked: boolean }) => {
	const {topic, picked} = props;

	const {fire} = useSubjectDefEventBus();
	const onCardClicked = () => {
		if (picked) {
			fire(SubjectDefEventTypes.TOPIC_UNPICKED, topic);
		} else {
			fire(SubjectDefEventTypes.TOPIC_PICKED, topic);
		}
	};

	return <AvailableTopicCard onClick={onCardClicked}>
		<TopicName data-picked={picked}>{topic.name}</TopicName>
		<TopicPicked icon={ICON_SELECTED} data-picked={picked}/>
	</AvailableTopicCard>;
};