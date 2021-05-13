import {Pipeline} from '../../../../services/tuples/pipeline-types';
import {Topic} from '../../../../services/tuples/topic-types';
import {DataRow} from '../../simulator-event-bus-types';
import {PipelineRuntimeContext, RunStatus, StageRuntimeContext, UnitRuntimeContext} from './types';
import {PipelineStage} from '../../../../services/tuples/pipeline-stage-types';
import {PipelineStageUnit} from '../../../../services/tuples/pipeline-stage-unit-types';

export const buildUnitRuntimeContext = (unit: PipelineStageUnit, parentContext: StageRuntimeContext): UnitRuntimeContext => {
	const context = {
		unit,
		status: RunStatus.READY,
		parentContext
	} as UnitRuntimeContext;

	context.actions = unit.do.map(action => {
		return {
			action,
			status: RunStatus.READY,
			parentContext: context
		};
	});

	return context;
};
export const buildStageRuntimeContext = (stage: PipelineStage, parentContext: PipelineRuntimeContext): StageRuntimeContext => {
	const context = {
		stage,
		status: RunStatus.READY,
		parentContext
	} as StageRuntimeContext;

	context.units = stage.units.map(unit => buildUnitRuntimeContext(unit, context));

	return context;
};
export const buildPipelineRuntimeContext = (pipeline: Pipeline, topic: Topic, triggerData: DataRow): PipelineRuntimeContext => {
	const context = {
		pipeline,
		topic,
		status: RunStatus.WAIT,
		triggerData
	} as PipelineRuntimeContext;

	context.stages = pipeline.stages.map(stage => buildStageRuntimeContext(stage, context));

	return context;
};