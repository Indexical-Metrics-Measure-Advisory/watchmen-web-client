import {TopicsData} from '../state/types';
import {PipelineRuntimeContext} from './types';

export enum RunsEventTypes {
	RUN_PIPELINE = 'run-pipeline',

	ASK_RUNTIME_DATA = 'ask-runtime-data',
}

export interface RunsEventBus {
	fire(type: RunsEventTypes.RUN_PIPELINE, context: PipelineRuntimeContext): this;
	on(type: RunsEventTypes.RUN_PIPELINE, listener: (context: PipelineRuntimeContext) => void): this;
	off(type: RunsEventTypes.RUN_PIPELINE, listener: (context: PipelineRuntimeContext) => void): this;

	fire(type: RunsEventTypes.ASK_RUNTIME_DATA, onData: (started: boolean, done: boolean, runtimeData: TopicsData) => void): this;
	on(type: RunsEventTypes.ASK_RUNTIME_DATA, listener: (onData: (started: boolean, done: boolean, runtimeData: TopicsData) => void) => void): this;
	off(type: RunsEventTypes.ASK_RUNTIME_DATA, listener: (onData: (started: boolean, done: boolean, runtimeData: TopicsData) => void) => void): this;
}