import {StageRun} from '../stage';
import React from 'react';
import {PipelineRuntimeContext} from '../types';

export const StagesRuntime = (props: { context: PipelineRuntimeContext }) => {
	const {context} = props;

	return <>
		{context.stages.map(context => <StageRun context={context} key={context.stage.stageId}/>)}
	</>;
};