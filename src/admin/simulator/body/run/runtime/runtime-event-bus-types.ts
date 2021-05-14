import {PipelineRuntimeContext} from '../types';

export enum RuntimeEventTypes {
	DO_PIPELINE_TRIGGER_TYPE_CHECK = 'do-pipeline-trigger-type-check',
	DO_PIPELINE_CONDITION_CHECK = 'do-pipeline-condition-check',
	START_PIPELINE = 'start-pipeline',
	PIPELINE_IGNORED = 'pipeline-ignored'
}

export interface RuntimeEventBus {
	fire(type: RuntimeEventTypes.DO_PIPELINE_TRIGGER_TYPE_CHECK, context: PipelineRuntimeContext): this;
	on(type: RuntimeEventTypes.DO_PIPELINE_TRIGGER_TYPE_CHECK, listener: (context: PipelineRuntimeContext) => void): this;
	off(type: RuntimeEventTypes.DO_PIPELINE_TRIGGER_TYPE_CHECK, listener: (context: PipelineRuntimeContext) => void): this;

	fire(type: RuntimeEventTypes.DO_PIPELINE_CONDITION_CHECK, context: PipelineRuntimeContext): this;
	on(type: RuntimeEventTypes.DO_PIPELINE_CONDITION_CHECK, listener: (context: PipelineRuntimeContext) => void): this;
	off(type: RuntimeEventTypes.DO_PIPELINE_CONDITION_CHECK, listener: (context: PipelineRuntimeContext) => void): this;

	fire(type: RuntimeEventTypes.START_PIPELINE, context: PipelineRuntimeContext): this;
	on(type: RuntimeEventTypes.START_PIPELINE, listener: (context: PipelineRuntimeContext) => void): this;
	off(type: RuntimeEventTypes.START_PIPELINE, listener: (context: PipelineRuntimeContext) => void): this;

	fire(type: RuntimeEventTypes.PIPELINE_IGNORED, context: PipelineRuntimeContext): this;
	on(type: RuntimeEventTypes.PIPELINE_IGNORED, listener: (context: PipelineRuntimeContext) => void): this;
	off(type: RuntimeEventTypes.PIPELINE_IGNORED, listener: (context: PipelineRuntimeContext) => void): this;
}