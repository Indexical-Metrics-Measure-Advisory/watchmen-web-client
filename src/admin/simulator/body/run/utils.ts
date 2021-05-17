import {Pipeline} from '../../../../services/tuples/pipeline-types';
import {Topic} from '../../../../services/tuples/topic-types';
import {DataRow} from '../../simulator-event-bus-types';
import {
	ActionRunStatus,
	ActionRuntimeContext,
	InMemoryVariables,
	InternalUnitRuntimeContext,
	PipelineRunStatus,
	PipelineRuntimeContext,
	StageRunStatus,
	StageRuntimeContext,
	UnitRunStatus,
	UnitRuntimeContext
} from './types';
import {PipelineStage} from '../../../../services/tuples/pipeline-stage-types';
import {PipelineStageUnit} from '../../../../services/tuples/pipeline-stage-unit-types';
import {TopicsData} from '../state/types';
import {v4} from 'uuid';
import {PipelineStageUnitAction} from '../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';

export const buildActionRuntimeContext = (action: PipelineStageUnitAction, index: number): ActionRuntimeContext => {
	return {
		actionIndex: index,
		action,
		status: ActionRunStatus.READY
	};
};

export const buildInternalUnitRuntimeContext = (unit: PipelineStageUnit, index: number, variables?: InMemoryVariables): InternalUnitRuntimeContext => {
	return {
		internalUnitIndex: index,
		unit,
		status: UnitRunStatus.READY,
		actions: unit.do.map((action, actionIndex) => buildActionRuntimeContext(action, actionIndex)),
		variables: variables ?? {}
	};
};

export const buildUnitRuntimeContext = (unit: PipelineStageUnit, index: number): UnitRuntimeContext => {
	return {
		unitIndex: index,
		unit,
		status: UnitRunStatus.READY,
		// assume no loop
		internals: [buildInternalUnitRuntimeContext(unit, 0)]

	};
};
export const buildStageRuntimeContext = (stage: PipelineStage, index: number): StageRuntimeContext => {
	return {
		stageIndex: index,
		stage,
		status: StageRunStatus.READY,
		units: stage.units.map((unit, unitIndex) => buildUnitRuntimeContext(unit, unitIndex))
	};
};
export const buildPipelineRuntimeContext = (
	pipeline: Pipeline,
	topic: Topic,
	triggerData: DataRow,
	existsData: Array<DataRow>,
	allData: TopicsData
): PipelineRuntimeContext => {
	return {
		pipeline,
		topic,
		status: PipelineRunStatus.WAIT,
		triggerData,
		existsData,
		stages: pipeline.stages.map((stage, stageIndex) => buildStageRuntimeContext(stage, stageIndex)),

		allData,

		runtimeData: {},
		changedData: [],
		variables: {}
	};
};

export const generateRuntimeId = (): string => {
	return v4();
};

export const isPipelineCompleted = (context: PipelineRuntimeContext): boolean => {
	return [PipelineRunStatus.IGNORED, PipelineRunStatus.DONE, PipelineRunStatus.FAIL].includes(context.status);
};
export const isStageStarted = (context: StageRuntimeContext): boolean => {
	return context.status != StageRunStatus.READY;
};
export const isStageCompleted = (context: StageRuntimeContext) => {
	return [StageRunStatus.IGNORED, StageRunStatus.DONE, StageRunStatus.FAIL].includes(context.status);
};
export const isInternalUnitStarted = (context: InternalUnitRuntimeContext): boolean => {
	return context.status != UnitRunStatus.READY;
};
export const isInternalUnitCompleted = (context: InternalUnitRuntimeContext) => {
	return [UnitRunStatus.IGNORED, UnitRunStatus.DONE, UnitRunStatus.FAIL].includes(context.status);
};
export const isActionStarted = (context: ActionRuntimeContext): boolean => {
	return context.status != ActionRunStatus.READY;
};
export const isActionCompleted = (context: ActionRuntimeContext) => {
	return [ActionRunStatus.DONE, ActionRunStatus.FAIL].includes(context.status);
};