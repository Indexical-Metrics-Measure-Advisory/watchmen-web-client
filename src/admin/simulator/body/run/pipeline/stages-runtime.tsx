import React from 'react';
import {StageRun} from '../stage';
import {PipelineRuntimeContext} from '../types';

export const StagesRuntime = (props: { context: PipelineRuntimeContext }) => {
	const {context: pipelineContext} = props;

	return <>
		{pipelineContext.stages.map(context => {
			return <StageRun pipelineContext={pipelineContext} context={context}
			                 key={context.stage.stageId}/>;
		})}
	</>;
};