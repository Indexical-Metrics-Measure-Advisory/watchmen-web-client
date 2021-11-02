import {Topic} from '@/services/data/tuples/topic-types';
import {useEffect} from 'react';
import {useSubjectDefEventBus} from '../subject-def-event-bus';
import {SubjectDefEventTypes} from '../subject-def-event-bus-types';

export const usePickedTopics = (pickedTopics: Array<Topic>) => {
	const {on, off, fire} = useSubjectDefEventBus();
	useEffect(() => {
		const onTopicPicked = (topic: Topic) => {
			const index = pickedTopics.indexOf(topic);
			if (index === -1) {
				pickedTopics.push(topic);
			}
		};
		const onTopicUnpicked = (topic: Topic) => {
			const index = pickedTopics.indexOf(topic);
			if (index !== -1) {
				pickedTopics.splice(index, 1);
			}
		};
		const onAskPickedTopics = (onData: (topics: Array<Topic>) => void) => {
			onData(pickedTopics);
		};

		on(SubjectDefEventTypes.ASK_PICKED_TOPICS, onAskPickedTopics);
		on(SubjectDefEventTypes.TOPIC_PICKED, onTopicPicked);
		on(SubjectDefEventTypes.TOPIC_UNPICKED, onTopicUnpicked);

		return () => {
			off(SubjectDefEventTypes.ASK_PICKED_TOPICS, onAskPickedTopics);
			off(SubjectDefEventTypes.TOPIC_PICKED, onTopicPicked);
			off(SubjectDefEventTypes.TOPIC_UNPICKED, onTopicUnpicked);
		};
	}, [on, off, fire, pickedTopics]);
};