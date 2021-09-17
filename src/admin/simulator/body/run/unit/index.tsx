import React from 'react';
import {PipelineRuntimeContext, StageRuntimeContext, UnitRuntimeContext} from '../types';
import {InternalUnitsRuntime} from './internal-units-runtime';
import {UnitRuntime} from './unit-runtime';

export const UnitRun = (props: {
	pipelineContext: PipelineRuntimeContext;
	stageContext: StageRuntimeContext;
	context: UnitRuntimeContext;
}) => {
	const {pipelineContext, stageContext, context} = props;

	return <>
		<UnitRuntime pipelineContext={pipelineContext} stageContext={stageContext} context={context}/>
		<InternalUnitsRuntime pipelineContext={pipelineContext} stageContext={stageContext} context={context}/>
	</>;
};