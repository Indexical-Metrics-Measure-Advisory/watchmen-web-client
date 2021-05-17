import React from 'react';
import {AllTopics, PipelineRuntimeContext} from '../types';
import {RuntimeEventBusProvider} from '../runtime/runtime-event-bus';
import {PipelineRuntime} from './pipeline-runtime';
import {StagesRuntime} from './stages-runtime';
import {Pipeline} from '../../../../../services/tuples/pipeline-types';

export const PipelineRun = (props: {
	context: PipelineRuntimeContext;
	topics: AllTopics;
	pipelines: Array<Pipeline>;
}) => {
	const {context} = props;

	return <RuntimeEventBusProvider>
		<PipelineRuntime context={context}/>
		<StagesRuntime context={context}/>
	</RuntimeEventBusProvider>;
};