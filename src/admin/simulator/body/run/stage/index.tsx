import React from 'react';
import {PipelineRuntimeContext, StageRuntimeContext} from '../types';
import {StageRuntime} from './stage-runtime';
import {UnitsRuntime} from './units-runtime';

export const StageRun = (props: {
	pipelineContext: PipelineRuntimeContext;
	context: StageRuntimeContext;
}) => {
	const {pipelineContext, context} = props;

	return <>
		<StageRuntime pipelineContext={pipelineContext} context={context}/>
		<UnitsRuntime pipelineContext={pipelineContext} context={context}/>
	</>;
};