import React from 'react';
import {PipelineRuntimeContext} from '../types';
import {RuntimeEventBusProvider} from '../runtime/runtime-event-bus';
import {PipelineRuntime} from './pipeline-runtime';
import {StagesRuntime} from './stages-runtime';

export const PipelineRun = (props: { context: PipelineRuntimeContext }) => {
	const {context} = props;

	return <RuntimeEventBusProvider>
		<PipelineRuntime context={context}/>
		<StagesRuntime context={context}/>
	</RuntimeEventBusProvider>;
};