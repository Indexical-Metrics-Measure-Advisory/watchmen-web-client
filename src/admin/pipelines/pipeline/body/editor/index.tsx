import React from 'react';
import { Pipeline } from '../../../../../services/tuples/pipeline-types';
import { Topic } from '../../../../../services/tuples/topic-types';
import { PipelinePart } from '../pipeline-part';
import { PipelineEditor } from './widgets';

export const Editor = (props: {
	pipeline: Pipeline;
	topics: Array<Topic>;
}) => {
	const { pipeline, topics } = props;

	return <PipelineEditor>
		<PipelinePart pipeline={pipeline} topics={topics}/>
	</PipelineEditor>;
};