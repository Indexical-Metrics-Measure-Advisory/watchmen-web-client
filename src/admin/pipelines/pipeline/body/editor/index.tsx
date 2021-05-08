import React from 'react';
import {Pipeline} from '../../../../../services/tuples/pipeline-types';
import {Topic} from '../../../../../services/tuples/topic-types';
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
		<Stages pipeline={pipeline} topics={topics} topic={topic}/>
		<PipelineFooterLeadLabel>End of Pipeline</PipelineFooterLeadLabel>
	</PipelineEditor>;
};