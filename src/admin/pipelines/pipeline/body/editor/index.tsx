import React from 'react';
import { v4 } from 'uuid';
import { Pipeline } from '../../../../../services/tuples/pipeline-types';
import { Topic } from '../../../../../services/tuples/topic-types';
import { PipelinePart } from '../pipeline-part';
import { StageEditor } from '../stage';
import { PipelineEditor } from './widgets';

export const Editor = (props: {
	pipeline: Pipeline;
	topics: Array<Topic>;
}) => {
	const { pipeline, topics } = props;

	const { topicId } = pipeline;
	// eslint-disable-next-line
	const topic = topics.find(topic => topic.topicId == topicId);

	if (!topic) {
		return null;
	}

	return <PipelineEditor>
		<PipelinePart pipeline={pipeline} topic={topic}/>
		{pipeline.stages.map(stage => {
			return <StageEditor pipeline={pipeline} stage={stage} topic={topic}
			                    key={v4()}/>;
		})}
	</PipelineEditor>;
};