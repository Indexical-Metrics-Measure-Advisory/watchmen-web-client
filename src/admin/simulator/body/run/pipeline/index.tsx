import React from 'react';
import {AllTopics, PipelineRuntimeContext} from '../types';
import {RuntimeEventBusProvider} from '../runtime/runtime-event-bus';
import {PipelineRuntime} from './pipeline-runtime';
import {StagesRuntime} from './stages-runtime';
import {Pipeline} from '../../../../../services/tuples/pipeline-types';
import {RunNextPipeline} from './run-next-pipeline';

export const PipelineRun = (props: {
	context: PipelineRuntimeContext;
	topics: AllTopics;
	pipelines: Array<Pipeline>;
	runNext: () => void;
}) => {
	const {context, runNext} = props;

	return <RuntimeEventBusProvider>
		<PipelineRuntime context={context}/>
		<StagesRuntime context={context}/>
		<RunNextPipeline runNext={runNext}/>
	</RuntimeEventBusProvider>;
};