import { Pipeline } from '../../../services/tuples/pipeline-types';

export enum PipelineEventTypes {
	RENAME_PIPELINE = 'rename-pipeline',
	SAVE_PIPELINE = 'save-pipeline',
	TOGGLE_PIPELINE_ENABLED = 'toggle-pipeline-enabled',

	PIPELINE_ENABLED_TOGGLED = 'pipeline-enabled-toggled'
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
}