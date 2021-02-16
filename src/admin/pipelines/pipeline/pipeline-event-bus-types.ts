import { PipelineStage } from '../../../services/tuples/pipeline-stage-types';
import { Pipeline } from '../../../services/tuples/pipeline-types';

export enum PipelineEventTypes {
	RENAME_PIPELINE = 'rename-pipeline',
	SAVE_PIPELINE = 'save-pipeline',
	TOGGLE_PIPELINE_ENABLED = 'toggle-pipeline-enabled',

	PIPELINE_ENABLED_TOGGLED = 'pipeline-enabled-toggled',

	TRIGGER_TYPE_CHANGED = 'trigger-type-changed',
	// condition on pipeline changed
	CONDITION_CHANGED = 'condition-changed',

	STAGE_ADDED = 'stage-added',
	STAGE_REMOVED = 'stage-removed',
	STAGE_CHANGED = 'stage-changed',
	STAGE_SORTED = 'stage-sorted'
}

export interface PipelineEventBus {
	fire(type: PipelineEventTypes.RENAME_PIPELINE, pipeline: Pipeline): this;
	on(type: PipelineEventTypes.RENAME_PIPELINE, listener: (pipeline: Pipeline) => void): this;
	off(type: PipelineEventTypes.RENAME_PIPELINE, listener: (pipeline: Pipeline) => void): this;

	fire(type: PipelineEventTypes.SAVE_PIPELINE, pipeline: Pipeline): this;
	on(type: PipelineEventTypes.SAVE_PIPELINE, listener: (pipeline: Pipeline) => void): this;
	off(type: PipelineEventTypes.SAVE_PIPELINE, listener: (pipeline: Pipeline) => void): this;

	fire(type: PipelineEventTypes.TOGGLE_PIPELINE_ENABLED, pipeline: Pipeline): this;
	on(type: PipelineEventTypes.TOGGLE_PIPELINE_ENABLED, listener: (pipeline: Pipeline) => void): this;
	off(type: PipelineEventTypes.TOGGLE_PIPELINE_ENABLED, listener: (pipeline: Pipeline) => void): this;

	fire(type: PipelineEventTypes.PIPELINE_ENABLED_TOGGLED, pipeline: Pipeline): this;
	on(type: PipelineEventTypes.PIPELINE_ENABLED_TOGGLED, listener: (pipeline: Pipeline) => void): this;
	off(type: PipelineEventTypes.PIPELINE_ENABLED_TOGGLED, listener: (pipeline: Pipeline) => void): this;

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
}