import {
	isWriteToExternalAction
} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {ActionRuntimeContext, InternalUnitRuntimeContext, PipelineRuntimeContext} from '../../types';

export const runWriteToExternal = async (options: {
	pipelineContext: PipelineRuntimeContext,
	internalUnitContext: InternalUnitRuntimeContext,
	context: ActionRuntimeContext,
	logWrite: (message: string) => Promise<void>;
}) => {
	const {pipelineContext, context, logWrite} = options;
	const {action} = context;

	if (!isWriteToExternalAction(action)) {
		throw new Error(`Not a write-to-external action[${action}].`);
	}

	const adapter = action.externalWriterId;
	const value = pipelineContext.triggerData;

	await logWrite(`Value[${value}] written to external through adapter[${adapter}].`);
};