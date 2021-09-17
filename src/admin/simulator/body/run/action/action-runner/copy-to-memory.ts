import {isCopyToMemoryAction} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {computeParameter} from '../../compute/parameter-compute';
import {ActionRuntimeContext, InternalUnitRuntimeContext, PipelineRuntimeContext} from '../../types';
import {prepareSource, prepareVariable} from './utils';

export const runCopyToMemory = async (options: {
	pipelineContext: PipelineRuntimeContext,
	internalUnitContext: InternalUnitRuntimeContext,
	context: ActionRuntimeContext,
	logWrite: (message: string) => Promise<void>;
}) => {
	const {pipelineContext, internalUnitContext, context, logWrite} = options;
	const {action} = context;

	if (!isCopyToMemoryAction(action)) {
		throw new Error(`Not a copy-to-memory action[${action}].`);
	}

	const variableName = prepareVariable(action);
	const source = prepareSource(action);

	const value = computeParameter({
		parameter: source,
		pipelineContext,
		internalUnitContext,
		alternativeTriggerData: null
	});
	pipelineContext.variables[variableName] = value;
	await logWrite(`Value[${value}] copied to in-memory variable[${variableName}].`);
};