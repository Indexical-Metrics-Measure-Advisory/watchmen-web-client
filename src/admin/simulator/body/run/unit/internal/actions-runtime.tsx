import {InternalUnitRuntimeContext, PipelineRuntimeContext, StageRuntimeContext, UnitRuntimeContext} from '../../types';
import {ActionRun} from '../../action';
import React from 'react';

export const ActionsRuntime = (props: {
	pipelineContext: PipelineRuntimeContext;
	stageContext: StageRuntimeContext;
	unitContext: UnitRuntimeContext;
	context: InternalUnitRuntimeContext;
}) => {
	const {pipelineContext, stageContext, unitContext, context: internalUnitContext} = props;

	return <>
		{internalUnitContext.actions.map(context => {
			return <ActionRun pipelineContext={pipelineContext} stageContext={stageContext}
			                  unitContext={unitContext} internalUnitContext={internalUnitContext}
			                  context={context}
			                  key={context.action.actionId}/>;
		})}
	</>;
};