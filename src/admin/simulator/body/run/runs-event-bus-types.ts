import {PipelineRuntimeContext} from './types';

export enum RunsEventTypes {
	RUN_PIPELINE = 'run-pipeline',
}

export interface RunsEventBus {
	fire(type: RunsEventTypes.RUN_PIPELINE, context: PipelineRuntimeContext): this;
	on(type: RunsEventTypes.RUN_PIPELINE, listener: (context: PipelineRuntimeContext) => void): this;
	off(type: RunsEventTypes.RUN_PIPELINE, listener: (context: PipelineRuntimeContext) => void): this;
}