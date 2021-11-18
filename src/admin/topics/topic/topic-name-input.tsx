import {Topic} from '@/services/data/tuples/topic-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {TuplePropertyInput} from '@/widgets/tuple-workbench/tuple-editor';
import React, {ChangeEvent} from 'react';
import {useTopicEventBus} from '../topic-event-bus';
import {TopicEventTypes} from '../topic-event-bus-types';

export const TopicNameInput = (props: { topic: Topic }) => {
	const {topic} = props;

	const {fire} = useTopicEventBus();
	const forceUpdate = useForceUpdate();
	const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (topic.name !== event.target.value) {
			topic.name = event.target.value;
			fire(TopicEventTypes.TOPIC_NAME_CHANGED, topic);
			forceUpdate();
		}
	};

	return <TuplePropertyInput value={topic.name || ''} onChange={onNameChange}/>;
};