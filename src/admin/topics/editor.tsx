import React from 'react';
import {QueryEnumForHolder} from '../../services/tuples/query-enum-types';
import {Topic} from '../../services/tuples/topic-types';
import {TuplePropertyLabel} from '../widgets/tuple-workbench/tuple-editor';
import {Factors} from './factors';
import {TopicEventBusProvider} from './topic-event-bus';
import {TopicDescriptionInput} from './topic/topic-description-input';
import {TopicKindInput} from './topic/topic-kind-input';
import {TopicNameInput} from './topic/topic-name-input';
import {TopicTypeInput} from './topic/topic-type-input';
import {HoldByTopic} from './types';

const TopicEditor = (props: { topic: Topic, enums: Array<QueryEnumForHolder> }) => {
	const {topic, enums} = props;

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
		<Factors topic={topic} enums={enums}/>
	</TopicEventBusProvider>;
};

export const renderEditor = (topic: Topic, codes?: HoldByTopic) => {
	const enums = codes?.enums || [];
	return <TopicEditor topic={topic} enums={enums}/>;
};
