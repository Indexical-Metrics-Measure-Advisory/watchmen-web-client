import {Topic} from '@/services/data/tuples/topic-types';
import {useEffect, useState} from 'react';
import {useSubjectDefEventBus} from '../subject-def-event-bus';
import {SubjectDefData, SubjectDefEventTypes} from '../subject-def-event-bus-types';

export const useTopicData = () => {
	const {on, off} = useSubjectDefEventBus();
	const [data, setData] = useState<Pick<SubjectDefData, 'availableTopics' | 'pickedTopics'>>({
		availableTopics: [],
		pickedTopics: []
	});
	useEffect(() => {
		const onAvailableTopicsLoaded = ({availableTopics, pickedTopics}: SubjectDefData) => {
			setData({availableTopics, pickedTopics});
		};
		const onTopicPicked = (topic: Topic) => {
			setData(data => ({...data, pickedTopics: Array.from(new Set([...data.pickedTopics, topic]))}));
		};
		const onTopicUnpicked = (topic: Topic) => {
			setData(data => ({...data, pickedTopics: data.pickedTopics.filter(exists => exists !== topic)}));
		};
		on(SubjectDefEventTypes.DATA_LOADED, onAvailableTopicsLoaded);
		on(SubjectDefEventTypes.TOPIC_PICKED, onTopicPicked);
		on(SubjectDefEventTypes.TOPIC_UNPICKED, onTopicUnpicked);
		return () => {
			off(SubjectDefEventTypes.DATA_LOADED, onAvailableTopicsLoaded);
			off(SubjectDefEventTypes.TOPIC_PICKED, onTopicPicked);
			off(SubjectDefEventTypes.TOPIC_UNPICKED, onTopicUnpicked);
		};
	}, [on, off]);
	return data;
};