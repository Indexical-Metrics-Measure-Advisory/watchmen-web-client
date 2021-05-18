import {InternalUnitRuntimeContext, PipelineRuntimeContext, StageRuntimeContext} from '../types';
import {computeJoint} from './condition-compute';

export const checkPipelineCondition = (context: PipelineRuntimeContext): boolean => {
	return computeJoint({joint: context.pipeline.on!, pipelineContext: context});
};

export const checkStageCondition = (pipelineContext: PipelineRuntimeContext, context: StageRuntimeContext): boolean => {
	return computeJoint({joint: context.stage.on!, pipelineContext});
};

export const checkInternalUnitCondition = (pipelineContext: PipelineRuntimeContext, context: InternalUnitRuntimeContext): boolean => {
	return computeJoint({joint: context.unit.on!, pipelineContext, internalUnitContext: context});
};