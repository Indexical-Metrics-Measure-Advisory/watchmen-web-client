import {PipelineRuntimeContext, StageRuntimeContext} from '../types';
import {connectSimulatorDB} from '../../../../../local-persist/db';
import dayjs from 'dayjs';

export const createLogWriter = (
	pipelineContext: PipelineRuntimeContext,
	context: StageRuntimeContext,
	callback?: (message: string) => void
) => {
	return async (message: string) => {
		const db = connectSimulatorDB();
		await db.logs.add({
			pipelineId: pipelineContext.pipeline.pipelineId,
			pipelineRuntimeId: pipelineContext.pipelineRuntimeId!,
			stageId: context.stage.stageId,
			stageRuntimeId: context.stageRuntimeId,
			message,
			createdAt: dayjs().toDate()
		});

		callback && callback(message);
	};
};

export const buildContextBody = (context: StageRuntimeContext): Partial<StageRuntimeContext> => {
	const {pipelineRuntimeId, stageRuntimeId, stageIndex, status, ...rest} = context;
	return rest;
};