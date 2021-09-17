import React from 'react';
import {InternalUnitRuntimeContext, PipelineRuntimeContext, StageRuntimeContext, UnitRuntimeContext} from '../../types';
import {ActionsRuntime} from './actions-runtime';
import {InternalUnitRuntime} from './internal-unit-runtime';

export const InternalUnitRun = (props: {
	pipelineContext: PipelineRuntimeContext;
	stageContext: StageRuntimeContext;
	unitContext: UnitRuntimeContext;
	context: InternalUnitRuntimeContext;
}) => {
	const {pipelineContext, stageContext, unitContext, context} = props;

	return <>
		<InternalUnitRuntime pipelineContext={pipelineContext} stageContext={stageContext} unitContext={unitContext}
		                     context={context}/>
		<ActionsRuntime pipelineContext={pipelineContext} stageContext={stageContext} unitContext={unitContext}
		                context={context}/>
	</>;
};