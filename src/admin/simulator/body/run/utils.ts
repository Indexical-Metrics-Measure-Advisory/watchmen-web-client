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
	const context = {
		unitIndex: index,
		unit,
		status: UnitRunStatus.READY
	} as UnitRuntimeContext;

	context.actions = unit.do.map((action, actionIndex) => {
		return {
			actionIndex,
			action,
			status: ActionRunStatus.READY
		};
	});

	return context;
};
export const buildStageRuntimeContext = (stage: PipelineStage, index: number): StageRuntimeContext => {
	const context = {
		stageIndex: index,
		stage,
		status: StageRunStatus.READY
	} as StageRuntimeContext;

	context.units = stage.units.map((unit, unitIndex) => buildUnitRuntimeContext(unit, unitIndex));

	return context;
};
export const buildPipelineRuntimeContext = (
	pipeline: Pipeline,
	topic: Topic,
	triggerData: DataRow,
	existsData: Array<DataRow>,
	allData: TopicsData
): PipelineRuntimeContext => {
	const context = {
		pipeline,
		topic,
		status: PipelineRunStatus.WAIT,
		triggerData,
		existsData,
		allData
	} as PipelineRuntimeContext;

	context.stages = pipeline.stages.map((stage, stageIndex) => buildStageRuntimeContext(stage, stageIndex));

	return context;
};

export const generateRuntimeId = (): string => {
	return v4();
};