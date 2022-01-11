import {PipelineStage} from '@/services/data/tuples/pipeline-stage-types';
import {
	PipelineStageUnitAction
} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {PipelineStageUnit} from '@/services/data/tuples/pipeline-stage-unit-types';
import {Pipeline} from '@/services/data/tuples/pipeline-types';

export enum PipelineFocusMode {
	STAGE = 'stage',
	UNIT = 'unit',
	FREE_WALK = 'free-walk'
}

export enum PipelineEventTypes {
	RENAME_PIPELINE = 'rename-pipeline',
	SAVE_PIPELINE = 'save-pipeline',
	TOGGLE_PIPELINE_ENABLEMENT = 'toggle-pipeline-enablement',

	PIPELINE_SAVED = 'pipeline-saved',

	TRIGGER_TYPE_CHANGED = 'trigger-type-changed',
	// condition on pipeline changed
	CONDITION_CHANGED = 'condition-changed',

	STAGE_ADDED = 'stage-added',
	STAGE_REMOVED = 'stage-removed',
	STAGE_CHANGED = 'stage-changed',
	STAGE_SORTED = 'stage-sorted',

	ACTION_CHANGED = 'action-changed',

	STAGE_EXPANDED = 'stage-expanded',
	UNIT_EXPANDED = 'unit-expanded',

	SHOW_DSL = 'show-dsl',
	COLLAPSE_ALL = 'collapse-all',
	EXPAND_ALL = 'expand-all',

	ASK_FOCUS_MODE = 'ask-focus-mode',
	FOCUS_MODE_CHANGED = 'focus-mode-changed'
}

export interface PipelineEventBus {
	fire(type: PipelineEventTypes.RENAME_PIPELINE, pipeline: Pipeline): this;
	on(type: PipelineEventTypes.RENAME_PIPELINE, listener: (pipeline: Pipeline) => void): this;
	off(type: PipelineEventTypes.RENAME_PIPELINE, listener: (pipeline: Pipeline) => void): this;

	fire(type: PipelineEventTypes.SAVE_PIPELINE, pipeline: Pipeline, onSaved: (saved: boolean) => void): this;
	on(type: PipelineEventTypes.SAVE_PIPELINE, listener: (pipeline: Pipeline, onSaved: (saved: boolean) => void) => void): this;
	off(type: PipelineEventTypes.SAVE_PIPELINE, listener: (pipeline: Pipeline, onSaved: (saved: boolean) => void) => void): this;

	fire(type: PipelineEventTypes.TOGGLE_PIPELINE_ENABLEMENT, pipeline: Pipeline): this;
	on(type: PipelineEventTypes.TOGGLE_PIPELINE_ENABLEMENT, listener: (pipeline: Pipeline) => void): this;
	off(type: PipelineEventTypes.TOGGLE_PIPELINE_ENABLEMENT, listener: (pipeline: Pipeline) => void): this;

	fire(type: PipelineEventTypes.PIPELINE_SAVED, pipeline: Pipeline, saved: boolean): this;
	on(type: PipelineEventTypes.PIPELINE_SAVED, listener: (pipeline: Pipeline, saved: boolean) => void): this;
	off(type: PipelineEventTypes.PIPELINE_SAVED, listener: (pipeline: Pipeline, saved: boolean) => void): this;

	fire(type: PipelineEventTypes.TRIGGER_TYPE_CHANGED, pipeline: Pipeline): this;
	on(type: PipelineEventTypes.TRIGGER_TYPE_CHANGED, listener: (pipeline: Pipeline) => void): this;
	off(type: PipelineEventTypes.TRIGGER_TYPE_CHANGED, listener: (pipeline: Pipeline) => void): this;

	fire(type: PipelineEventTypes.CONDITION_CHANGED, pipeline: Pipeline): this;
	on(type: PipelineEventTypes.CONDITION_CHANGED, listener: (pipeline: Pipeline) => void): this;
	off(type: PipelineEventTypes.CONDITION_CHANGED, listener: (pipeline: Pipeline) => void): this;

	fire(type: PipelineEventTypes.STAGE_ADDED, stage: PipelineStage, pipeline: Pipeline): this;
	on(type: PipelineEventTypes.STAGE_ADDED, listener: (stage: PipelineStage, pipeline: Pipeline) => void): this;
	off(type: PipelineEventTypes.STAGE_ADDED, listener: (stage: PipelineStage, pipeline: Pipeline) => void): this;

	fire(type: PipelineEventTypes.STAGE_REMOVED, stage: PipelineStage, pipeline: Pipeline): this;
	on(type: PipelineEventTypes.STAGE_REMOVED, listener: (stage: PipelineStage, pipeline: Pipeline) => void): this;
	off(type: PipelineEventTypes.STAGE_REMOVED, listener: (stage: PipelineStage, pipeline: Pipeline) => void): this;

	fire(type: PipelineEventTypes.STAGE_CHANGED, stage: PipelineStage, pipeline: Pipeline): this;
	on(type: PipelineEventTypes.STAGE_CHANGED, listener: (stage: PipelineStage, pipeline: Pipeline) => void): this;
	off(type: PipelineEventTypes.STAGE_CHANGED, listener: (stage: PipelineStage, pipeline: Pipeline) => void): this;

	fire(type: PipelineEventTypes.STAGE_SORTED, pipeline: Pipeline): this;
	on(type: PipelineEventTypes.STAGE_SORTED, listener: (pipeline: Pipeline) => void): this;
	off(type: PipelineEventTypes.STAGE_SORTED, listener: (pipeline: Pipeline) => void): this;

	fire(type: PipelineEventTypes.ACTION_CHANGED, pipeline: Pipeline, stage: PipelineStage, unit: PipelineStageUnit, action: PipelineStageUnitAction): this;
	on(type: PipelineEventTypes.ACTION_CHANGED, listener: (pipeline: Pipeline, stage: PipelineStage, unit: PipelineStageUnit, action: PipelineStageUnitAction) => void): this;
	off(type: PipelineEventTypes.ACTION_CHANGED, listener: (pipeline: Pipeline, stage: PipelineStage, unit: PipelineStageUnit, action: PipelineStageUnitAction) => void): this;

	fire(type: PipelineEventTypes.STAGE_EXPANDED, pipeline: Pipeline, stage: PipelineStage): this;
	on(type: PipelineEventTypes.STAGE_EXPANDED, listener: (pipeline: Pipeline, stage: PipelineStage) => void): this;
	off(type: PipelineEventTypes.STAGE_EXPANDED, listener: (pipeline: Pipeline, stage: PipelineStage) => void): this;

	fire(type: PipelineEventTypes.UNIT_EXPANDED, pipeline: Pipeline, stage: PipelineStage, unit: PipelineStageUnit): this;
	on(type: PipelineEventTypes.UNIT_EXPANDED, listener: (pipeline: Pipeline, stage: PipelineStage, unit: PipelineStageUnit) => void): this;
	off(type: PipelineEventTypes.UNIT_EXPANDED, listener: (pipeline: Pipeline, stage: PipelineStage, unit: PipelineStageUnit) => void): this;

	fire(type: PipelineEventTypes.SHOW_DSL, pipeline: Pipeline): this;
	on(type: PipelineEventTypes.SHOW_DSL, listener: (pipeline: Pipeline) => void): this;
	off(type: PipelineEventTypes.SHOW_DSL, listener: (pipeline: Pipeline) => void): this;

	fire(type: PipelineEventTypes.COLLAPSE_ALL, pipeline: Pipeline): this;
	on(type: PipelineEventTypes.COLLAPSE_ALL, listener: (pipeline: Pipeline) => void): this;
	off(type: PipelineEventTypes.COLLAPSE_ALL, listener: (pipeline: Pipeline) => void): this;

	fire(type: PipelineEventTypes.EXPAND_ALL, pipeline: Pipeline): this;
	on(type: PipelineEventTypes.EXPAND_ALL, listener: (pipeline: Pipeline) => void): this;
	off(type: PipelineEventTypes.EXPAND_ALL, listener: (pipeline: Pipeline) => void): this;

	fire(type: PipelineEventTypes.ASK_FOCUS_MODE, pipeline: Pipeline, onModeGet: (mode: PipelineFocusMode) => void): this;
	on(type: PipelineEventTypes.ASK_FOCUS_MODE, listener: (pipeline: Pipeline, onModeGet: (mode: PipelineFocusMode) => void) => void): this;
	off(type: PipelineEventTypes.ASK_FOCUS_MODE, listener: (pipeline: Pipeline, onModeGet: (mode: PipelineFocusMode) => void) => void): this;

	fire(type: PipelineEventTypes.FOCUS_MODE_CHANGED, pipeline: Pipeline, mode: PipelineFocusMode): this;
	on(type: PipelineEventTypes.FOCUS_MODE_CHANGED, listener: (pipeline: Pipeline, mode: PipelineFocusMode) => void): this;
	off(type: PipelineEventTypes.FOCUS_MODE_CHANGED, listener: (pipeline: Pipeline, mode: PipelineFocusMode) => void): this;
}