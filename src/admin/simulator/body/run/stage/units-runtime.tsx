import {PipelineRuntimeContext, StageRuntimeContext} from '../types';
import {UnitRun} from '../unit';
import React from 'react';

export const UnitsRuntime = (props: {
	pipelineContext: PipelineRuntimeContext;
	context: StageRuntimeContext;
}) => {
	const {pipelineContext, context: stageContext} = props;

	return <>
		{stageContext.units.map(context => {
			return <UnitRun pipelineContext={pipelineContext} stageContext={stageContext} context={context}
			                key={context.unit.unitId}/>;
		})}
	</>;
};