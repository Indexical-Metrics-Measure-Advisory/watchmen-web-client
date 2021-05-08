import React from 'react';
import {DropdownOption} from '../../../basic-widgets/types';
import {useForceUpdate} from '../../../basic-widgets/utils';
import {Topic, TopicKind} from '../../../services/tuples/topic-types';
import {TuplePropertyDropdown} from '../../widgets/tuple-workbench/tuple-editor';
import {useTopicEventBus} from '../topic-event-bus';
import {TopicEventTypes} from '../topic-event-bus-types';

const TopicKindOptions: Array<DropdownOption> = [
	{value: TopicKind.SYSTEM, label: 'System'},
	{value: TopicKind.BUSINESS, label: 'Business'}
];

export const TopicKindInput = (props: { topic: Topic }) => {
	const {topic} = props;

	const {fire} = useTopicEventBus();
	const forceUpdate = useForceUpdate();
	const onTypeChange = (option: DropdownOption) => {
		topic.kind = option.value as TopicKind;
		fire(TopicEventTypes.TOPIC_KIND_CHANGED, topic);
		forceUpdate();
	};

	return <TuplePropertyDropdown value={topic.kind} options={TopicKindOptions} onChange={onTypeChange}/>;
};