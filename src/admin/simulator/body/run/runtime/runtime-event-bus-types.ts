import {
	ActionRuntimeContext,
	InternalUnitRuntimeContext,
	PipelineRuntimeContext,
	StageRuntimeContext,
	UnitRuntimeContext
} from '../types';

export enum RuntimeEventTypes {
	DO_PIPELINE_TRIGGER_TYPE_CHECK = 'do-pipeline-trigger-type-check',
	DO_PIPELINE_CONDITION_CHECK = 'do-pipeline-condition-check',
	RUN_STAGES = 'run-stages',
	PIPELINE_IGNORED = 'pipeline-ignored',
	PIPELINE_DONE = 'pipeline-done',
	PIPELINE_FAILED = 'pipeline-failed',
	RUN_DYNAMIC_PIPELINE = 'run-dynamic-pipeline',
	RUN_NEXT_PIPELINE = 'run-next-pipeline',

	RUN_STAGE = 'run-stage',
	DO_STAGE_CONDITION_CHECK = 'do-stage-condition-check',
	RUN_UNITS = 'run-units',
	STAGE_IGNORED = 'stage-ignored',
	STAGE_DONE = 'stage-done',
	STAGE_FAILED = 'stage-failed',

	RUN_UNIT = 'run-unit',
	BUILD_INTERNAL_UNITS = 'build-internal-units',
	RUN_INTERNAL_UNITS = 'run-internal-units',
	UNIT_IGNORED = 'unit-ignored',
	UNIT_DONE = 'unit-done',
	UNIT_FAILED = 'unit-failed',

	RUN_INTERNAL_UNIT = 'run-internal-unit',
	DO_INTERNAL_UNIT_CONDITION_CHECK = 'do-internal-unit-condition-check',
	RUN_ACTIONS = 'run-actions',
	INTERNAL_UNIT_IGNORED = 'internal-unit-ignored',
	INTERNAL_UNIT_DONE = 'internal-unit-done',
	INTERNAL_UNIT_FAILED = 'internal-unit-failed',

	RUN_ACTION = 'run-action',
	DO_RUN_ACTION = 'do-run-action',
	ACTION_DONE = 'action-done',
	ACTION_FAILED = 'action-failed'
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

	fire(type: RuntimeEventTypes.PIPELINE_FAILED, context: PipelineRuntimeContext, error?: Error): this;
	on(type: RuntimeEventTypes.PIPELINE_FAILED, listener: (context: PipelineRuntimeContext, error?: Error) => void): this;
	off(type: RuntimeEventTypes.PIPELINE_FAILED, listener: (context: PipelineRuntimeContext, error?: Error) => void): this;

	fire(type: RuntimeEventTypes.RUN_DYNAMIC_PIPELINE, context: PipelineRuntimeContext): this;
	on(type: RuntimeEventTypes.RUN_DYNAMIC_PIPELINE, listener: (context: PipelineRuntimeContext) => void): this;
	off(type: RuntimeEventTypes.RUN_DYNAMIC_PIPELINE, listener: (context: PipelineRuntimeContext) => void): this;

	fire(type: RuntimeEventTypes.RUN_NEXT_PIPELINE): this;
	on(type: RuntimeEventTypes.RUN_NEXT_PIPELINE, listener: () => void): this;
	off(type: RuntimeEventTypes.RUN_NEXT_PIPELINE, listener: () => void): this;

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

	fire(type: RuntimeEventTypes.STAGE_FAILED, context: StageRuntimeContext, error?: Error): this;
	on(type: RuntimeEventTypes.STAGE_FAILED, listener: (context: StageRuntimeContext, error?: Error) => void): this;
	off(type: RuntimeEventTypes.STAGE_FAILED, listener: (context: StageRuntimeContext, error?: Error) => void): this;

	fire(type: RuntimeEventTypes.RUN_UNIT, context: UnitRuntimeContext): this;
	on(type: RuntimeEventTypes.RUN_UNIT, listener: (context: UnitRuntimeContext) => void): this;
	off(type: RuntimeEventTypes.RUN_UNIT, listener: (context: UnitRuntimeContext) => void): this;

	fire(type: RuntimeEventTypes.BUILD_INTERNAL_UNITS, context: UnitRuntimeContext): this;
	on(type: RuntimeEventTypes.BUILD_INTERNAL_UNITS, listener: (context: UnitRuntimeContext) => void): this;
	off(type: RuntimeEventTypes.BUILD_INTERNAL_UNITS, listener: (context: UnitRuntimeContext) => void): this;

	fire(type: RuntimeEventTypes.RUN_INTERNAL_UNITS, context: UnitRuntimeContext): this;
	on(type: RuntimeEventTypes.RUN_INTERNAL_UNITS, listener: (context: UnitRuntimeContext) => void): this;
	off(type: RuntimeEventTypes.RUN_INTERNAL_UNITS, listener: (context: UnitRuntimeContext) => void): this;

	fire(type: RuntimeEventTypes.UNIT_IGNORED, context: UnitRuntimeContext): this;
	on(type: RuntimeEventTypes.UNIT_IGNORED, listener: (context: UnitRuntimeContext) => void): this;
	off(type: RuntimeEventTypes.UNIT_IGNORED, listener: (context: UnitRuntimeContext) => void): this;

	fire(type: RuntimeEventTypes.UNIT_DONE, context: UnitRuntimeContext): this;
	on(type: RuntimeEventTypes.UNIT_DONE, listener: (context: UnitRuntimeContext) => void): this;
	off(type: RuntimeEventTypes.UNIT_DONE, listener: (context: UnitRuntimeContext) => void): this;

	fire(type: RuntimeEventTypes.UNIT_FAILED, context: UnitRuntimeContext): this;
	on(type: RuntimeEventTypes.UNIT_FAILED, listener: (context: UnitRuntimeContext) => void): this;
	off(type: RuntimeEventTypes.UNIT_FAILED, listener: (context: UnitRuntimeContext) => void): this;

	fire(type: RuntimeEventTypes.RUN_INTERNAL_UNIT, context: InternalUnitRuntimeContext): this;
	on(type: RuntimeEventTypes.RUN_INTERNAL_UNIT, listener: (context: InternalUnitRuntimeContext) => void): this;
	off(type: RuntimeEventTypes.RUN_INTERNAL_UNIT, listener: (context: InternalUnitRuntimeContext) => void): this;

	fire(type: RuntimeEventTypes.DO_INTERNAL_UNIT_CONDITION_CHECK, context: InternalUnitRuntimeContext): this;
	on(type: RuntimeEventTypes.DO_INTERNAL_UNIT_CONDITION_CHECK, listener: (context: InternalUnitRuntimeContext) => void): this;
	off(type: RuntimeEventTypes.DO_INTERNAL_UNIT_CONDITION_CHECK, listener: (context: InternalUnitRuntimeContext) => void): this;

	fire(type: RuntimeEventTypes.RUN_ACTIONS, context: InternalUnitRuntimeContext): this;
	on(type: RuntimeEventTypes.RUN_ACTIONS, listener: (context: InternalUnitRuntimeContext) => void): this;
	off(type: RuntimeEventTypes.RUN_ACTIONS, listener: (context: InternalUnitRuntimeContext) => void): this;

	fire(type: RuntimeEventTypes.INTERNAL_UNIT_IGNORED, context: InternalUnitRuntimeContext): this;
	on(type: RuntimeEventTypes.INTERNAL_UNIT_IGNORED, listener: (context: InternalUnitRuntimeContext) => void): this;
	off(type: RuntimeEventTypes.INTERNAL_UNIT_IGNORED, listener: (context: InternalUnitRuntimeContext) => void): this;

	fire(type: RuntimeEventTypes.INTERNAL_UNIT_DONE, context: InternalUnitRuntimeContext): this;
	on(type: RuntimeEventTypes.INTERNAL_UNIT_DONE, listener: (context: InternalUnitRuntimeContext) => void): this;
	off(type: RuntimeEventTypes.INTERNAL_UNIT_DONE, listener: (context: InternalUnitRuntimeContext) => void): this;

	fire(type: RuntimeEventTypes.INTERNAL_UNIT_FAILED, context: InternalUnitRuntimeContext, error?: Error): this;
	on(type: RuntimeEventTypes.INTERNAL_UNIT_FAILED, listener: (context: InternalUnitRuntimeContext, error?: Error) => void): this;
	off(type: RuntimeEventTypes.INTERNAL_UNIT_FAILED, listener: (context: InternalUnitRuntimeContext, error?: Error) => void): this;

	fire(type: RuntimeEventTypes.RUN_ACTION, context: ActionRuntimeContext): this;
	on(type: RuntimeEventTypes.RUN_ACTION, listener: (context: ActionRuntimeContext) => void): this;
	off(type: RuntimeEventTypes.RUN_ACTION, listener: (context: ActionRuntimeContext) => void): this;

	fire(type: RuntimeEventTypes.DO_RUN_ACTION, context: ActionRuntimeContext): this;
	on(type: RuntimeEventTypes.DO_RUN_ACTION, listener: (context: ActionRuntimeContext) => void): this;
	off(type: RuntimeEventTypes.DO_RUN_ACTION, listener: (context: ActionRuntimeContext) => void): this;

	fire(type: RuntimeEventTypes.ACTION_DONE, context: ActionRuntimeContext): this;
	on(type: RuntimeEventTypes.ACTION_DONE, listener: (context: ActionRuntimeContext) => void): this;
	off(type: RuntimeEventTypes.ACTION_DONE, listener: (context: ActionRuntimeContext) => void): this;

	fire(type: RuntimeEventTypes.ACTION_FAILED, context: ActionRuntimeContext, error: Error): this;
	on(type: RuntimeEventTypes.ACTION_FAILED, listener: (context: ActionRuntimeContext, error: Error) => void): this;
	off(type: RuntimeEventTypes.ACTION_FAILED, listener: (context: ActionRuntimeContext, error: Error) => void): this;
}