import React from 'react';
import { useForceUpdate } from '../../../basic-widgets/utils';
import { Topic } from '../../../services/tuples/topic-types';
import { TuplePropertyInput } from '../../widgets/tuple-workbench/tuple-editor';
import { useTopicEventBus } from '../topic-event-bus';
import { TopicEventTypes } from '../topic-event-bus-types';

export const TopicNameInput = (props: { topic: Topic }) => {
	const { topic } = props;

	const { fire } = useTopicEventBus();
	const forceUpdate = useForceUpdate();
	const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (topic.name !== event.target.value) {
			topic.name = event.target.value;
			fire(TopicEventTypes.TOPIC_NAME_CHANGED, topic);
			forceUpdate();
		}
	};

	return <TuplePropertyInput value={topic.name || ''} onChange={onNameChange}/>;
};