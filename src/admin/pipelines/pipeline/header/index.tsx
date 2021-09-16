import React from 'react';
import {Pipeline} from '@/services/tuples/pipeline-types';
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
