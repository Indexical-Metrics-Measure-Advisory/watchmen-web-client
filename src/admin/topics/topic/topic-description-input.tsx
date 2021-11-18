import {Topic} from '@/services/data/tuples/topic-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {TuplePropertyInputLines} from '@/widgets/tuple-workbench/tuple-editor';
import React, {ChangeEvent} from 'react';
import {useTopicEventBus} from '../topic-event-bus';
import {TopicEventTypes} from '../topic-event-bus-types';

export const TopicDescriptionInput = (props: { topic: Topic }) => {
	const {topic} = props;

	const {fire} = useTopicEventBus();
	const forceUpdate = useForceUpdate();

	const onDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		if (topic.description !== event.target.value) {
			topic.description = event.target.value;
			fire(TopicEventTypes.TOPIC_DESCRIPTION_CHANGED, topic);
			forceUpdate();
		}
	};

	return <TuplePropertyInputLines value={topic.description || ''} onChange={onDescriptionChange}/>;
};