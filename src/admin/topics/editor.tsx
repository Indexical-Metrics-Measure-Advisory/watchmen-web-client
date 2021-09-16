import React from 'react';
import {QueryEnumForHolder} from '@/services/tuples/query-enum-types';
import {Topic} from '@/services/tuples/topic-types';
import {TuplePropertyLabel} from '../widgets/tuple-workbench/tuple-editor';
import {Factors} from './factors';
import {TopicEventBusProvider} from './topic-event-bus';
import {TopicDescriptionInput} from './topic/topic-description-input';
import {TopicKindInput} from './topic/topic-kind-input';
import {TopicNameInput} from './topic/topic-name-input';
import {TopicTypeInput} from './topic/topic-type-input';
import {HoldByTopic} from './types';
import {isMultipleDataSourcesEnabled} from '@/feature-switch';
import {QueryDataSourceForHolder} from '@/services/tuples/query-data-source-types';
import {TopicDataSourceInput} from './topic/topic-data-source-input';

const TopicEditor = (props: { topic: Topic, enums: Array<QueryEnumForHolder>, dataSources: Array<QueryDataSourceForHolder> }) => {
	const {topic, enums, dataSources} = props;

	return <TopicEventBusProvider>
		<TuplePropertyLabel>Topic Name:</TuplePropertyLabel>
		<TopicNameInput topic={topic}/>
		<TuplePropertyLabel>Topic Kind:</TuplePropertyLabel>
		<TopicKindInput topic={topic}/>
		<TuplePropertyLabel>Topic Type:</TuplePropertyLabel>
		<TopicTypeInput topic={topic}/>
		{isMultipleDataSourcesEnabled()
			? <>
				<TuplePropertyLabel>Data Source:</TuplePropertyLabel>
				<TopicDataSourceInput topic={topic} dataSources={dataSources}/>
			</>
			: null}
		<TuplePropertyLabel>Description:</TuplePropertyLabel>
		<TopicDescriptionInput topic={topic}/>
		<TuplePropertyLabel>Factors:</TuplePropertyLabel>
		<Factors topic={topic} enums={enums}/>
	</TopicEventBusProvider>;
};

export const renderEditor = (topic: Topic, codes?: HoldByTopic) => {
	return <TopicEditor topic={topic} enums={codes?.enums || []} dataSources={codes?.dataSources || []}/>;
};
