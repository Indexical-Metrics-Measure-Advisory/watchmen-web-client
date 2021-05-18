import React, {useEffect, useState} from 'react';
import {AllTopics, PipelineRuntimeContext} from '../types';
import {RuntimeEventBusProvider, useRuntimeEventBus} from '../runtime/runtime-event-bus';
import {PipelineRuntime} from './pipeline-runtime';
import {StagesRuntime} from './stages-runtime';
import {Pipeline} from '../../../../../services/tuples/pipeline-types';
import {RunNextPipeline} from './run-next-pipeline';
import {RuntimeEventTypes} from '../runtime/runtime-event-bus-types';

export const DynamicPipelineRun = (props: {
	topics: AllTopics;
	pipelines: Array<Pipeline>;
	runNext: () => void;
}) => {
	const {topics, pipelines, runNext} = props;

	// from upper
	const {on, off} = useRuntimeEventBus();
	const [context, setContext] = useState<PipelineRuntimeContext | null>(null);
	useEffect(() => {
		const onRunDynamicPipeline = (context: PipelineRuntimeContext) => {
			setContext(context);
		};
		on(RuntimeEventTypes.RUN_DYNAMIC_PIPELINE, onRunDynamicPipeline);
		return () => {
			off(RuntimeEventTypes.RUN_DYNAMIC_PIPELINE, onRunDynamicPipeline);
		};
	}, [on, off]);

	if (!context) {
		return null;
	}

	return <RuntimeEventBusProvider>
		<PipelineRuntime context={context}/>
		<StagesRuntime context={context}/>
		<RunNextPipeline runNext={runNext}/>
		<DynamicPipelineRun topics={topics} pipelines={pipelines} runNext={runNext}/>
	</RuntimeEventBusProvider>;
};

export const PipelineRun = (props: {
	context: PipelineRuntimeContext;
	topics: AllTopics;
	pipelines: Array<Pipeline>;
	runNext: () => void;
}) => {
	const {context, topics, pipelines, runNext} = props;

	return <RuntimeEventBusProvider>
		<PipelineRuntime context={context}/>
		<StagesRuntime context={context}/>
		{/* catch pipeline all done */}
		<RunNextPipeline runNext={runNext}/>
		{/* catch start dynamic pipeline */}
		<DynamicPipelineRun topics={topics} pipelines={pipelines} runNext={runNext}/>
	</RuntimeEventBusProvider>;
};