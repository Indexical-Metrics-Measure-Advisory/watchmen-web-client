import {PipelineRuntimeContext, StageRuntimeContext} from '../types';

export enum RuntimeEventTypes {
	DO_PIPELINE_TRIGGER_TYPE_CHECK = 'do-pipeline-trigger-type-check',
	DO_PIPELINE_CONDITION_CHECK = 'do-pipeline-condition-check',
	RUN_STAGES = 'run-stages',
	PIPELINE_IGNORED = 'pipeline-ignored',
	PIPELINE_DONE = 'pipeline-done',
	PIPELINE_FAILED = 'pipeline-failed',

	RUN_STAGE = 'run-stage',
	DO_STAGE_CONDITION_CHECK = 'do-stage-condition-check',
	RUN_UNITS = 'run-units',
	STAGE_IGNORED = 'stage-ignored',
	STAGE_DONE = 'stage-done',
	STAGE_FAILED = 'stage-failed',
}

export interface RuntimeEventBus {
	fire(type: RuntimeEventTypes.DO_PIPELINE_TRIGGER_TYPE_CHECK, context: PipelineRuntimeContext): this;
	on(type: RuntimeEventTypes.DO_PIPELINE_TRIGGER_TYPE_CHECK, listener: (context: PipelineRuntimeContext) => void): this;
	off(type: RuntimeEventTypes.DO_PIPELINE_TRIGGER_TYPE_CHECK, listener: (context: PipelineRuntimeContext) => void): this;

	fire(type: RuntimeEventTypes.DO_PIPELINE_CONDITION_CHECK, context: PipelineRuntimeContext): this;
	on(type: RuntimeEventTypes.DO_PIPELINE_CONDITION_CHECK, listener: (context: PipelineRuntimeContext) => void): this;
	off(type: RuntimeEventTypes.DO_PIPELINE_CONDITION_CHECK, listener: (context: PipelineRuntimeContext) => void): this;

	fire(type: RuntimeEventTypes.RUN_STAGES, context: PipelineRuntimeContext): this;
	on(type: RuntimeEventTypes.RUN_STAGES, listener: (context: PipelineRuntimeContext) => void): this;
	off(type: RuntimeEventTypes.RUN_STAGES, listener: (context: PipelineRuntimeContext) => void): this;

	fire(type: RuntimeEventTypes.PIPELINE_IGNORED, context: PipelineRuntimeContext): this;
	on(type: RuntimeEventTypes.PIPELINE_IGNORED, listener: (context: PipelineRuntimeContext) => void): this;
	off(type: RuntimeEventTypes.PIPELINE_IGNORED, listener: (context: PipelineRuntimeContext) => void): this;

	fire(type: RuntimeEventTypes.PIPELINE_DONE, context: PipelineRuntimeContext): this;
	on(type: RuntimeEventTypes.PIPELINE_DONE, listener: (context: PipelineRuntimeContext) => void): this;
	off(type: RuntimeEventTypes.PIPELINE_DONE, listener: (context: PipelineRuntimeContext) => void): this;

	fire(type: RuntimeEventTypes.PIPELINE_FAILED, context: PipelineRuntimeContext): this;
	on(type: RuntimeEventTypes.PIPELINE_FAILED, listener: (context: PipelineRuntimeContext) => void): this;
	off(type: RuntimeEventTypes.PIPELINE_FAILED, listener: (context: PipelineRuntimeContext) => void): this;

	fire(type: RuntimeEventTypes.RUN_STAGE, context: StageRuntimeContext): this;
	on(type: RuntimeEventTypes.RUN_STAGE, listener: (context: StageRuntimeContext) => void): this;
	off(type: RuntimeEventTypes.RUN_STAGE, listener: (context: StageRuntimeContext) => void): this;

	fire(type: RuntimeEventTypes.DO_STAGE_CONDITION_CHECK, context: StageRuntimeContext): this;
	on(type: RuntimeEventTypes.DO_STAGE_CONDITION_CHECK, listener: (context: StageRuntimeContext) => void): this;
	off(type: RuntimeEventTypes.DO_STAGE_CONDITION_CHECK, listener: (context: StageRuntimeContext) => void): this;

	fire(type: RuntimeEventTypes.RUN_UNITS, context: StageRuntimeContext): this;
	on(type: RuntimeEventTypes.RUN_UNITS, listener: (context: StageRuntimeContext) => void): this;
	off(type: RuntimeEventTypes.RUN_UNITS, listener: (context: StageRuntimeContext) => void): this;

	fire(type: RuntimeEventTypes.STAGE_IGNORED, context: StageRuntimeContext): this;
	on(type: RuntimeEventTypes.STAGE_IGNORED, listener: (context: StageRuntimeContext) => void): this;
	off(type: RuntimeEventTypes.STAGE_IGNORED, listener: (context: StageRuntimeContext) => void): this;

	fire(type: RuntimeEventTypes.STAGE_DONE, context: StageRuntimeContext): this;
	on(type: RuntimeEventTypes.STAGE_DONE, listener: (context: StageRuntimeContext) => void): this;
	off(type: RuntimeEventTypes.STAGE_DONE, listener: (context: StageRuntimeContext) => void): this;

	fire(type: RuntimeEventTypes.STAGE_FAILED, context: StageRuntimeContext): this;
	on(type: RuntimeEventTypes.STAGE_FAILED, listener: (context: StageRuntimeContext) => void): this;
	off(type: RuntimeEventTypes.STAGE_FAILED, listener: (context: StageRuntimeContext) => void): this;
}