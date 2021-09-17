import {Pipeline} from '@/services/data/tuples/pipeline-types';
import React from 'react';
import {NameEditor} from './name-editor';
import {PipelineHeaderButtons} from './pipeline-header-buttons';
import {PageHeaderHolder} from './widgets';

export const PipelineHeader = (props: { pipeline: Pipeline }) => {
	const {pipeline} = props;

	return <PageHeaderHolder>
		<NameEditor pipeline={pipeline}/>
		<PipelineHeaderButtons pipeline={pipeline}/>
	</PageHeaderHolder>;
};
