import {PipelineRuntimeContext} from './types';
import {TopicsData} from '../state/types';

export enum RunsEventTypes {
	RUN_PIPELINE = 'run-pipeline',

	ASK_RUNTIME_DATA = 'ask-runtime-data',
	REPLY_RUNTIME_DATA = 'reply-runtime-data'
}

export interface RunsEventBus {
	fire(type: RunsEventTypes.RUN_PIPELINE, context: PipelineRuntimeContext): this;
	on(type: RunsEventTypes.RUN_PIPELINE, listener: (context: PipelineRuntimeContext) => void): this;
	off(type: RunsEventTypes.RUN_PIPELINE, listener: (context: PipelineRuntimeContext) => void): this;

	fire(type: RunsEventTypes.ASK_RUNTIME_DATA): this;
	on(type: RunsEventTypes.ASK_RUNTIME_DATA, listener: () => void): this;
	off(type: RunsEventTypes.ASK_RUNTIME_DATA, listener: () => void): this;

	fire(type: RunsEventTypes.REPLY_RUNTIME_DATA, started: boolean, done: boolean, runtimeData: TopicsData): this;
	once(type: RunsEventTypes.REPLY_RUNTIME_DATA, listener: (started: boolean, done: boolean, runtimeData: TopicsData) => void): this;
}