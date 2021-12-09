import {PipelineStage} from '@/services/data/tuples/pipeline-stage-types';
import {
	PipelineStageUnitAction
} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {PipelineStageUnit} from '@/services/data/tuples/pipeline-stage-unit-types';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {v4} from 'uuid';
import {DataRow} from '../../types';
import {TopicsData} from '../state/types';
import {
	ActionRunStatus,
	ActionRuntimeContext,
	AllTopics,
	ChangedDataRow,
	InMemoryVariables,
	InternalUnitRuntimeContext,
	PipelineRunStatus,
	PipelineRuntimeContext,
	StageRunStatus,
	StageRuntimeContext,
	UnitRunStatus,
	UnitRuntimeContext
} from './types';

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
export const buildPipelineRuntimeContext = (options: {
	pipeline: Pipeline,
	topic: Topic,
	triggerData: DataRow,
	triggerDataOnce?: DataRow,
	runtimeData: TopicsData,
	allTopics: AllTopics,
	changedData?: Array<ChangedDataRow>
}): PipelineRuntimeContext => {
	const {pipeline, topic, triggerData, triggerDataOnce, runtimeData, allTopics, changedData = []} = options;
	return {
		pipeline,
		topic,
		status: PipelineRunStatus.WAIT,
		triggerData,
		triggerDataOnce,
		stages: pipeline.stages.map((stage, stageIndex) => buildStageRuntimeContext(stage, stageIndex)),

		allTopics,

		runtimeData,
		changedData,
		variables: {}
	};
};

export const generateRuntimeId = (): string => {
	return v4();
};

export const isPipelineCompleted = (context: PipelineRuntimeContext): boolean => {
	return ([PipelineRunStatus.IGNORED, PipelineRunStatus.DONE, PipelineRunStatus.FAIL] as Array<PipelineRunStatus>).includes(context.status);
};
export const isStageStarted = (context: StageRuntimeContext): boolean => {
	return context.status !== StageRunStatus.READY;
};
export const isStageCompleted = (context: StageRuntimeContext) => {
	return ([StageRunStatus.IGNORED, StageRunStatus.DONE, StageRunStatus.FAIL] as Array<StageRunStatus>).includes(context.status);
};
export const isInternalUnitStarted = (context: InternalUnitRuntimeContext): boolean => {
	return context.status !== UnitRunStatus.READY;
};
export const isInternalUnitCompleted = (context: InternalUnitRuntimeContext) => {
	return ([UnitRunStatus.IGNORED, UnitRunStatus.DONE, UnitRunStatus.FAIL] as Array<UnitRunStatus>).includes(context.status);
};
export const isActionStarted = (context: ActionRuntimeContext): boolean => {
	return context.status !== ActionRunStatus.READY;
};
export const isActionCompleted = (context: ActionRuntimeContext) => {
	return ([ActionRunStatus.DONE, ActionRunStatus.FAIL] as Array<ActionRunStatus>).includes(context.status);
};