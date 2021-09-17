import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {Topic} from '@/services/data/tuples/topic-types';
import React from 'react';
import {PipelineDsl} from '../../pipeline-dsl';
import {Editor} from './editor';
import {PipelineBodyContainer} from './widgets';

export const PipelineBody = (props: {
	pipeline: Pipeline;
	topics: Array<Topic>;
}) => {
	const {pipeline, topics} = props;

	return <PipelineBodyContainer>
		<Editor pipeline={pipeline} topics={topics}/>
		<PipelineDsl pipeline={pipeline} topics={topics}/>
	</PipelineBodyContainer>;
};