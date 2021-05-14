import React from 'react';
import {PipelineRuntimeContext} from '../types';
import {RuntimeEventBusProvider} from '../runtime/runtime-event-bus';
import {PipelineRuntime} from './pipeline-runtime';
import {StagesRuntime} from './stages-runtime';
import {Topic} from '../../../../../services/tuples/topic-types';
import {Pipeline} from '../../../../../services/tuples/pipeline-types';

export const PipelineRun = (props: {
	context: PipelineRuntimeContext;
	topics: { [key in string]: Topic };
	pipelines: Array<Pipeline>;
}) => {
	const {context} = props;

	return <RuntimeEventBusProvider>
		<PipelineRuntime context={context}/>
		<StagesRuntime context={context}/>
	</RuntimeEventBusProvider>;
};