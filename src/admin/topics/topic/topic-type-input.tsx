import React from 'react';
import { DropdownOption } from '../../../basic-widgets/types';
import { useForceUpdate } from '../../../basic-widgets/utils';
import { Topic, TopicType } from '../../../services/tuples/topic-types';
import { TuplePropertyDropdown } from '../../widgets/tuple-workbench/tuple-editor';
import { useTopicEventBus } from '../topic-event-bus';
import { TopicEventTypes } from '../topic-event-bus-types';

const TopicTypeOptions: Array<DropdownOption> = [
	{ value: TopicType.RAW, label: 'Raw' },
	{ value: TopicType.DISTINCT, label: 'Distinct' },
	{ value: TopicType.AGGREGATE, label: 'Aggregate' },
	{ value: TopicType.TIME, label: 'Time' },
	{ value: TopicType.RATIO, label: 'Ratio' },
	{ value: TopicType.SYSTEM, label: 'System' }
];

export const TopicTypeInput = (props: { topic: Topic }) => {
	const { topic } = props;

	const { fire } = useTopicEventBus();
	const forceUpdate = useForceUpdate();
	const onTypeChange = (option: DropdownOption) => {
		topic.type = option.value as TopicType;
		fire(TopicEventTypes.TOPIC_TYPE_CHANGED, topic);
		forceUpdate();
	};

	return <TuplePropertyDropdown value={topic.type} options={TopicTypeOptions} onChange={onTypeChange}/>;
};