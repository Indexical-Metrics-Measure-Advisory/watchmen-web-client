import {InternalUnitRuntimeContext, PipelineRuntimeContext, StageRuntimeContext} from '../types';
import {computeJoint} from './condition-compute';

export const checkPipelineCondition = (context: PipelineRuntimeContext): boolean => {
	return computeJoint(context.pipeline.on!, context);
};

export const checkStageCondition = (pipelineContext: PipelineRuntimeContext, context: StageRuntimeContext): boolean => {
	return computeJoint(context.stage.on!, pipelineContext);
};

export const checkInternalUnitCondition = (pipelineContext: PipelineRuntimeContext, context: InternalUnitRuntimeContext): boolean => {
	return computeJoint(context.unit.on!, pipelineContext, context);
};