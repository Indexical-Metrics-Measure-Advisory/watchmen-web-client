import {
	PipelineStageUnitAction
} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {PipelineStageUnit} from '@/services/data/tuples/pipeline-stage-unit-types';

export enum UnitEventTypes {
	RENAME_UNIT = 'rename-unit',
	LOOP_VARIABLE_CHANGED = 'loop-variable-changed',
	CONDITION_CHANGED = 'condition-changed',

	ACTION_ADDED = 'action-added',
	ACTION_REMOVED = 'action-removed',
	ACTION_CHANGED = 'action-changed',
	ACTION_SORTED = 'action-sorted',

	EXPAND_CONTENT = 'expand-content',
	COLLAPSE_CONTENT = 'collapse-content',
}

export interface UnitEventBus {
	fire(type: UnitEventTypes.RENAME_UNIT, unit: PipelineStageUnit): this;
	on(type: UnitEventTypes.RENAME_UNIT, listener: (unit: PipelineStageUnit) => void): this;
	off(type: UnitEventTypes.RENAME_UNIT, listener: (unit: PipelineStageUnit) => void): this;

	fire(type: UnitEventTypes.LOOP_VARIABLE_CHANGED, unit: PipelineStageUnit): this;
	on(type: UnitEventTypes.LOOP_VARIABLE_CHANGED, listener: (unit: PipelineStageUnit) => void): this;
	off(type: UnitEventTypes.LOOP_VARIABLE_CHANGED, listener: (unit: PipelineStageUnit) => void): this;

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
