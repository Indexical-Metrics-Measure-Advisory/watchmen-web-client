import {Pipeline} from '@/services/data/tuples/pipeline-types';
import React, {Fragment, useEffect, useState} from 'react';
import {useRunsEventBus} from '../runs-event-bus';
import {RunsEventTypes} from '../runs-event-bus-types';
import {RuntimeEventBusProvider, useRuntimeEventBus} from '../runtime/runtime-event-bus';
import {RuntimeEventTypes} from '../runtime/runtime-event-bus-types';
import {AllTopics, PipelineRuntimeContext} from '../types';
import {PipelineRuntime} from './pipeline-runtime';
import {RunNextPipeline} from './run-next-pipeline';
import {StagesRuntime} from './stages-runtime';

export const DynamicPipelineRunAutoTrigger = (props: { context: PipelineRuntimeContext }) => {
	const {context} = props;

	const {fire} = useRunsEventBus();
	useEffect(() => {
		fire(RunsEventTypes.RUN_PIPELINE, context);
		// eslint-disable-next-line
	}, []);

	return <Fragment/>;
};

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
		<PipelineRuntime context={context} pipelines={pipelines}/>
		<StagesRuntime context={context}/>
		<RunNextPipeline runNext={runNext}/>
		<DynamicPipelineRunAutoTrigger context={context}/>
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
		<PipelineRuntime context={context} pipelines={pipelines}/>
		<StagesRuntime context={context}/>
		{/* catch pipeline all done */}
		<RunNextPipeline runNext={runNext}/>
		{/* catch start dynamic pipeline */}
		<DynamicPipelineRun topics={topics} pipelines={pipelines} runNext={runNext}/>
	</RuntimeEventBusProvider>;
};