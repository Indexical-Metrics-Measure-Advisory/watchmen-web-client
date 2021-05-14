import React from 'react';
import {PipelineRuntimeContext, StageRuntimeContext, UnitRuntimeContext} from '../types';
import {UnitRuntime} from './unit-runtime';
import {ActionsRuntime} from './actions-runtime';

export const UnitRun = (props: {
	pipelineContext: PipelineRuntimeContext;
	stageContext: StageRuntimeContext;
	context: UnitRuntimeContext;
}) => {
	const {pipelineContext, stageContext, context} = props;

	// TODO get loop variable value to check loop is needed or not

	return <>
		<UnitRuntime pipelineContext={pipelineContext} stageContext={stageContext} context={context}/>
		<ActionsRuntime pipelineContext={pipelineContext} stageContext={stageContext} context={context}/>
	</>;
};