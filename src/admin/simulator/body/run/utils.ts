import {Pipeline} from '../../../../services/tuples/pipeline-types';
import {Topic} from '../../../../services/tuples/topic-types';
import {DataRow} from '../../simulator-event-bus-types';
import {
	ActionRunStatus,
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

export const buildUnitRuntimeContext = (unit: PipelineStageUnit, index: number): UnitRuntimeContext => {
	return {
		unitIndex: index,
		unit,
		status: UnitRunStatus.READY,
		actions: unit.do.map((action, actionIndex) => {
			return {
				actionIndex,
				action,
				status: ActionRunStatus.READY
			};
		})
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
		changedData: []
	};
};

export const generateRuntimeId = (): string => {
	return v4();
};