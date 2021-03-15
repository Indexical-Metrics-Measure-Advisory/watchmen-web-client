import React from 'react';
import { Topic } from '../../services/tuples/topic-types';
import { TuplePropertyLabel } from '../widgets/tuple-workbench/tuple-editor';
import { Factors } from './factors';
import { TopicEventBusProvider } from './topic-event-bus';
import { TopicDescriptionInput } from './topic/topic-description-input';
import { TopicKindInput } from './topic/topic-kind-input';
import { TopicNameInput } from './topic/topic-name-input';
import { TopicTypeInput } from './topic/topic-type-input';

const TopicEditor = (props: { topic: Topic }) => {
	const { topic } = props;

	return <TopicEventBusProvider>
		<TuplePropertyLabel>Topic Name:</TuplePropertyLabel>
		<TopicNameInput topic={topic}/>
		<TuplePropertyLabel>Topic Kind:</TuplePropertyLabel>
		<TopicKindInput topic={topic}/>
		<TuplePropertyLabel>Topic Type:</TuplePropertyLabel>
		<TopicTypeInput topic={topic}/>
		<TuplePropertyLabel>Description:</TuplePropertyLabel>
		<TopicDescriptionInput topic={topic}/>
		<TuplePropertyLabel>Factors:</TuplePropertyLabel>
		<Factors topic={topic}/>
	</TopicEventBusProvider>;
};

export const renderEditor = (topic: Topic) => {
	return <TopicEditor topic={topic}/>;
};
