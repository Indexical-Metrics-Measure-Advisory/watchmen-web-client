import {PipelineRuntimeContext, StageRuntimeContext, UnitRuntimeContext} from '../types';
import {ActionRun} from '../action';
import React from 'react';

export const ActionsRuntime = (props: {
	pipelineContext: PipelineRuntimeContext;
	stageContext: StageRuntimeContext;
	context: UnitRuntimeContext;
}) => {
	const {pipelineContext, stageContext, context: unitContext} = props;

	return <>
		{unitContext.actions.map(context => {
			return <ActionRun pipelineContext={pipelineContext} stageContext={stageContext}
			                  unitContext={unitContext} context={context}
			                  key={context.action.actionId}/>;
		})}
	</>;
};