import {ActionRuntimeContext, InternalUnitRuntimeContext, PipelineRuntimeContext} from '../../types';
import {isCopyToMemoryAction} from '../../../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {computeParameter} from '../../compute/parameter-compute';

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

	const variableName = (action.variableName || '').trim();
	if (!variableName) {
		throw new Error('Variable name of copy to memory action cannot be null or empty.');
	}

	const source = action.source;
	if (source == null) {
		throw new Error('Source of copy to memory action cannot be null.');
	}

	const value = computeParameter({
		parameter: source,
		pipelineContext,
		internalUnitContext
	});
	pipelineContext.variables[variableName] = value;
	await logWrite(`Value[${value}] copied to in-memory variable[${variableName}].`);
};