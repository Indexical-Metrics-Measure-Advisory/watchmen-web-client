import { PipelineStage } from '../../../../../services/tuples/pipeline-stage-types';

export enum StageEventTypes {
	RENAME_STAGE = 'rename-stage',

	CONDITION_CHANGED = 'condition-changed'
}

export interface StageEventBus {
	fire(type: StageEventTypes.RENAME_STAGE, stage: PipelineStage): this;
	on(type: StageEventTypes.RENAME_STAGE, listener: (stage: PipelineStage) => void): this;
	off(type: StageEventTypes.RENAME_STAGE, listener: (stage: PipelineStage) => void): this;

	fire(type: StageEventTypes.CONDITION_CHANGED, stage: PipelineStage): this;
	on(type: StageEventTypes.CONDITION_CHANGED, listener: (stage: PipelineStage) => void): this;
	off(type: StageEventTypes.CONDITION_CHANGED, listener: (stage: PipelineStage) => void): this;
}