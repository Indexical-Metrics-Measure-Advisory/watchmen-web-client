import { PipelineStage } from '../../../../../services/tuples/pipeline-stage-types';

export enum StageEventTypes {
	RENAME_STAGE = 'rename-stage',

	CONDITION_CHANGED = 'condition-changed',

	EXPAND_CONTENT = 'expand-content',
	COLLAPSE_CONTENT = 'collapse-content'
}

export interface StageEventBus {
	fire(type: StageEventTypes.RENAME_STAGE, stage: PipelineStage): this;
	on(type: StageEventTypes.RENAME_STAGE, listener: (stage: PipelineStage) => void): this;
	off(type: StageEventTypes.RENAME_STAGE, listener: (stage: PipelineStage) => void): this;

	fire(type: StageEventTypes.CONDITION_CHANGED, stage: PipelineStage): this;
	on(type: StageEventTypes.CONDITION_CHANGED, listener: (stage: PipelineStage) => void): this;
	off(type: StageEventTypes.CONDITION_CHANGED, listener: (stage: PipelineStage) => void): this;

	fire(type: StageEventTypes.EXPAND_CONTENT): this;
	on(type: StageEventTypes.EXPAND_CONTENT, listener: () => void): this;
	off(type: StageEventTypes.EXPAND_CONTENT, listener: () => void): this;

	fire(type: StageEventTypes.COLLAPSE_CONTENT): this;
	on(type: StageEventTypes.COLLAPSE_CONTENT, listener: () => void): this;
	off(type: StageEventTypes.COLLAPSE_CONTENT, listener: () => void): this;
}