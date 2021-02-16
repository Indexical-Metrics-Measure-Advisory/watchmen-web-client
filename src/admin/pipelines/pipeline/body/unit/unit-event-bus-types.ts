import { PipelineStageUnitAction } from '../../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import { PipelineStageUnit } from '../../../../../services/tuples/pipeline-stage-unit-types';

export enum UnitEventTypes {
	CONDITION_CHANGED = 'condition-changed',

	ACTION_ADDED = 'action-added',
	ACTION_REMOVED = 'action-removed',
	ACTION_CHANGED = 'action-changed',
	ACTION_SORTED = 'action-sorted',

	EXPAND_CONTENT = 'expand-content',
	COLLAPSE_CONTENT = 'collapse-content',
}

export interface UnitEventBus {
	fire(type: UnitEventTypes.CONDITION_CHANGED, unit: PipelineStageUnit): this;
	on(type: UnitEventTypes.CONDITION_CHANGED, listener: (unit: PipelineStageUnit) => void): this;
	off(type: UnitEventTypes.CONDITION_CHANGED, listener: (unit: PipelineStageUnit) => void): this;

	fire(type: UnitEventTypes.ACTION_ADDED, action: PipelineStageUnitAction, unit: PipelineStageUnit): this;
	on(type: UnitEventTypes.ACTION_ADDED, listener: (action: PipelineStageUnitAction, unit: PipelineStageUnit) => void): this;
	off(type: UnitEventTypes.ACTION_ADDED, listener: (action: PipelineStageUnitAction, unit: PipelineStageUnit) => void): this;

	fire(type: UnitEventTypes.ACTION_REMOVED, action: PipelineStageUnitAction, unit: PipelineStageUnit): this;
	on(type: UnitEventTypes.ACTION_REMOVED, listener: (action: PipelineStageUnitAction, unit: PipelineStageUnit) => void): this;
	off(type: UnitEventTypes.ACTION_REMOVED, listener: (action: PipelineStageUnitAction, unit: PipelineStageUnit) => void): this;

	fire(type: UnitEventTypes.ACTION_CHANGED, action: PipelineStageUnitAction, unit: PipelineStageUnit): this;
	on(type: UnitEventTypes.ACTION_CHANGED, listener: (action: PipelineStageUnitAction, unit: PipelineStageUnit) => void): this;
	off(type: UnitEventTypes.ACTION_CHANGED, listener: (action: PipelineStageUnitAction, unit: PipelineStageUnit) => void): this;

	fire(type: UnitEventTypes.ACTION_SORTED, unit: PipelineStageUnit): this;
	on(type: UnitEventTypes.ACTION_SORTED, listener: (unit: PipelineStageUnit) => void): this;
	off(type: UnitEventTypes.ACTION_SORTED, listener: (unit: PipelineStageUnit) => void): this;

	fire(type: UnitEventTypes.EXPAND_CONTENT): this;
	on(type: UnitEventTypes.EXPAND_CONTENT, listener: () => void): this;
	off(type: UnitEventTypes.EXPAND_CONTENT, listener: () => void): this;

	fire(type: UnitEventTypes.COLLAPSE_CONTENT): this;
	on(type: UnitEventTypes.COLLAPSE_CONTENT, listener: () => void): this;
	off(type: UnitEventTypes.COLLAPSE_CONTENT, listener: () => void): this;
}