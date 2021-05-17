import {Parameter} from '../../../../../services/tuples/factor-calculator-types';
import {InternalUnitRuntimeContext, PipelineRuntimeContext} from '../types';

export const computeParameter = (
	parameter: Parameter,
	pipelineContext: PipelineRuntimeContext,
	internalUnitContext: InternalUnitRuntimeContext | null = null
): any => {
	console.log(parameter, pipelineContext, internalUnitContext);
	// TODO compute parameter
	return null;
};