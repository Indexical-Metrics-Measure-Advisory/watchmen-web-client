import {PipelineStage} from '@/services/data/tuples/pipeline-stage-types';
import {PipelineStageUnit} from '@/services/data/tuples/pipeline-stage-unit-types';

export enum StageEventTypes {
	RENAME_STAGE = 'rename-stage',
	CONDITION_CHANGED = 'condition-changed',

	UNIT_ADDED = 'unit-added',
	UNIT_REMOVED = 'unit-removed',
	UNIT_CHANGED = 'unit-changed',
	UNIT_SORTED = 'unit-sorted',

	EXPAND_CONTENT = 'expand-content',
	COLLAPSE_CONTENT = 'collapse-content',
}

export interface StageEventBus {
	fire(type: StageEventTypes.RENAME_STAGE, stage: PipelineStage): this;
	on(type: StageEventTypes.RENAME_STAGE, listener: (stage: PipelineStage) => void): this;
	off(type: StageEventTypes.RENAME_STAGE, listener: (stage: PipelineStage) => void): this;

	fire(type: StageEventTypes.CONDITION_CHANGED, stage: PipelineStage): this;
	on(type: StageEventTypes.CONDITION_CHANGED, listener: (stage: PipelineStage) => void): this;
	off(type: StageEventTypes.CONDITION_CHANGED, listener: (stage: PipelineStage) => void): this;

	fire(type: StageEventTypes.UNIT_ADDED, unit: PipelineStageUnit, stage: PipelineStage): this;
	on(type: StageEventTypes.UNIT_ADDED, listener: (unit: PipelineStageUnit, stage: PipelineStage) => void): this;
	off(type: StageEventTypes.UNIT_ADDED, listener: (unit: PipelineStageUnit, stage: PipelineStage) => void): this;

	fire(type: StageEventTypes.UNIT_REMOVED, unit: PipelineStageUnit, stage: PipelineStage): this;
	on(type: StageEventTypes.UNIT_REMOVED, listener: (unit: PipelineStageUnit, stage: PipelineStage) => void): this;
	off(type: StageEventTypes.UNIT_REMOVED, listener: (unit: PipelineStageUnit, stage: PipelineStage) => void): this;

	fire(type: StageEventTypes.UNIT_CHANGED, unit: PipelineStageUnit, stage: PipelineStage): this;
	on(type: StageEventTypes.UNIT_CHANGED, listener: (unit: PipelineStageUnit, stage: PipelineStage) => void): this;
	off(type: StageEventTypes.UNIT_CHANGED, listener: (unit: PipelineStageUnit, stage: PipelineStage) => void): this;

	fire(type: StageEventTypes.UNIT_SORTED, stage: PipelineStage): this;
	on(type: StageEventTypes.UNIT_SORTED, listener: (stage: PipelineStage) => void): this;
	off(type: StageEventTypes.UNIT_SORTED, listener: (stage: PipelineStage) => void): this;

	fire(type: StageEventTypes.EXPAND_CONTENT): this;
	on(type: StageEventTypes.EXPAND_CONTENT, listener: () => void): this;
	off(type: StageEventTypes.EXPAND_CONTENT, listener: () => void): this;

	fire(type: StageEventTypes.COLLAPSE_CONTENT): this;
	on(type: StageEventTypes.COLLAPSE_CONTENT, listener: () => void): this;
	off(type: StageEventTypes.COLLAPSE_CONTENT, listener: () => void): this;
}