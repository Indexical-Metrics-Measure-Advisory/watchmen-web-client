import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {Topic} from '@/services/data/tuples/topic-types';
import React from 'react';
import {PipelinePart} from '../pipeline-part';
import {PipelineFooterLeadLabel} from '../widgets';
import {Stages} from './stages';
import {PipelineEditor} from './widgets';

export const Editor = (props: {
	pipeline: Pipeline;
	topics: Array<Topic>;
}) => {
	const {pipeline, topics} = props;

	const {topicId} = pipeline;
	// eslint-disable-next-line
	const topic = topics.find(topic => topic.topicId == topicId);

	if (!topic) {
		return null;
	}

	return <PipelineEditor>
		<PipelinePart pipeline={pipeline} topic={topic}/>
		<Stages pipeline={pipeline} topics={topics} triggerTopic={topic}/>
		<PipelineFooterLeadLabel>End of Pipeline</PipelineFooterLeadLabel>
	</PipelineEditor>;
};