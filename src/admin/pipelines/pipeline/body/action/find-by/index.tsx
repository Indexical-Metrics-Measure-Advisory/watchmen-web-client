import {
	FindBy,
	FromTopic,
	ToTopic
} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {Conditional} from '@/services/data/tuples/pipeline-super-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import React, {useEffect} from 'react';
import {ConditionalEditor} from '../../conditional';
import {useActionEventBus} from '../action-event-bus';
import {ActionEventTypes} from '../action-event-bus-types';

export const FindByCondition = (props: { action: FindBy & (FromTopic | ToTopic), topics: Array<Topic>, topic: Topic }) => {
	const {action, topics, topic} = props;

	const {on, off, fire} = useActionEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(ActionEventTypes.TOPIC_CHANGED, forceUpdate);
		return () => {
			off(ActionEventTypes.TOPIC_CHANGED, forceUpdate);
		};
	}, [on, off, forceUpdate]);

	const onConditionTypeChange = () => {
		fire(ActionEventTypes.ACTION_CONTENT_CHANGED, action);
	};
	const conditional: Conditional = {conditional: true, on: action.by};
	const availableTopics = [topic];
	if (action.topicId) {
		// eslint-disable-next-line
		const anotherTopic = topics.find(topic => topic.topicId == action.topicId);
		if (anotherTopic && anotherTopic !== topic) {
			availableTopics.push(anotherTopic);
		}
		availableTopics.sort((t1, t2) => {
			return t1.name.toLowerCase().localeCompare(t2.name.toLowerCase());
		});
	}

	return <ConditionalEditor conditional={conditional} topics={availableTopics} force={true}
	                          onChange={onConditionTypeChange}/>;
};