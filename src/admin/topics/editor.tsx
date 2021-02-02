import React from 'react';
import { DropdownOption } from '../../basic-widgets/types';
import { useForceUpdate } from '../../basic-widgets/utils';
import { Topic, TopicType } from '../../services/tuples/topic-types';
import {
	TuplePropertyDropdown,
	TuplePropertyInput,
	TuplePropertyInputLines,
	TuplePropertyLabel
} from '../widgets/tuple-workbench/tuple-editor';
import { useTupleEventBus } from '../widgets/tuple-workbench/tuple-event-bus';
import { TupleEventTypes, TupleState } from '../widgets/tuple-workbench/tuple-event-bus-types';
import { Factors } from './factors';
import { TopicEventBusProvider } from './topic-event-bus';

const TopicTypeOptions: Array<DropdownOption> = [
	{ value: TopicType.RAW, label: 'Raw' },
	{ value: TopicType.DISTINCT, label: 'Distinct' },
	{ value: TopicType.AGGREGATE, label: 'Aggregate' },
	{ value: TopicType.TIME, label: 'Time' },
	{ value: TopicType.RATIO, label: 'Ratio' },
	{ value: TopicType.SYSTEM, label: 'System' }
];

const TopicEditor = (props: { topic: Topic }) => {
	const { topic } = props;

	const { fire } = useTupleEventBus();
	const forceUpdate = useForceUpdate();

	const onPropChange = (prop: 'name' | 'description') => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		if (topic[prop] !== event.target.value) {
			topic[prop] = event.target.value;
			fire(TupleEventTypes.CHANGE_TUPLE_STATE, TupleState.CHANGED);
			forceUpdate();
		}
	};
	const onTypeChange = (option: DropdownOption) => {
		topic.type = option.value as TopicType;
		fire(TupleEventTypes.CHANGE_TUPLE_STATE, TupleState.CHANGED);
		forceUpdate();
	};

	return <TopicEventBusProvider>
		<TuplePropertyLabel>Topic Name:</TuplePropertyLabel>
		<TuplePropertyInput value={topic.name || ''} onChange={onPropChange('name')}/>
		<TuplePropertyLabel>Topic Type:</TuplePropertyLabel>
		<TuplePropertyDropdown value={topic.type} options={TopicTypeOptions} onChange={onTypeChange}/>
		<TuplePropertyLabel>Description:</TuplePropertyLabel>
		<TuplePropertyInputLines value={topic.description || ''} onChange={onPropChange('description')}/>
		<TuplePropertyLabel>Factors:</TuplePropertyLabel>
		<Factors topic={topic}/>
	</TopicEventBusProvider>;
};
export const renderEditor = (topic: Topic) => {
	return <TopicEditor topic={topic}/>;
};
