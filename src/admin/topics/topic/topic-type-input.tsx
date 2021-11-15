import {Topic, TopicType} from '@/services/data/tuples/topic-types';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {TuplePropertyDropdown} from '@/widgets/tuple-workbench/tuple-editor';
import React from 'react';
import {useTopicEventBus} from '../topic-event-bus';
import {TopicEventTypes} from '../topic-event-bus-types';

const TopicTypeOptions: Array<DropdownOption> = [
	{value: TopicType.RAW, label: 'Raw'},
	{value: TopicType.META, label: 'Meta'},
	{value: TopicType.DISTINCT, label: 'Distinct'},
	{value: TopicType.AGGREGATE, label: 'Aggregate'},
	{value: TopicType.TIME, label: 'Time'},
	{value: TopicType.RATIO, label: 'Ratio'}
];

export const TopicTypeInput = (props: { topic: Topic }) => {
	const {topic} = props;

	const {fire} = useTopicEventBus();
	const forceUpdate = useForceUpdate();
	const onTypeChange = (option: DropdownOption) => {
		topic.type = option.value as TopicType;
		fire(TopicEventTypes.TOPIC_TYPE_CHANGED, topic);
		forceUpdate();
	};

	return <TuplePropertyDropdown value={topic.type} options={TopicTypeOptions} onChange={onTypeChange}/>;
};