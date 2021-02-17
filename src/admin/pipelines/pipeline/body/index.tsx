import React from 'react';
import { Pipeline } from '../../../../services/tuples/pipeline-types';
import { Topic } from '../../../../services/tuples/topic-types';
import { PipelineDsl } from './dsl';
import { Editor } from './editor';
import { PipelineBodyContainer } from './widgets';

export const PipelineBody = (props: {
	pipeline: Pipeline;
	topics: Array<Topic>;
}) => {
	const { pipeline, topics } = props;

	return <PipelineBodyContainer>
		<Editor pipeline={pipeline} topics={topics}/>
		<PipelineDsl pipeline={pipeline} topics={topics}/>
	</PipelineBodyContainer>;
};