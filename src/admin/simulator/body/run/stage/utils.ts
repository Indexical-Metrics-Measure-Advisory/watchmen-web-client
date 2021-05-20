import {PipelineRuntimeContext, StageRuntimeContext} from '../types';
import {connectSimulatorDB} from '../../../../../local-persist/db';
import dayjs from 'dayjs';
import {StageRuntimeTable} from '../../../../../local-persist/db/simulator';

export const createLogWriter = (
	pipelineContext: PipelineRuntimeContext,
	context: StageRuntimeContext,
	callback?: (message: string, error?: Error) => void
) => {
	return async (message: string, error?: Error) => {
		const db = connectSimulatorDB();
		await db.logs.add({
			pipelineId: pipelineContext.pipeline.pipelineId,
			pipelineRuntimeId: pipelineContext.pipelineRuntimeId!,
			stageId: context.stage.stageId,
			stageRuntimeId: context.stageRuntimeId,
			message,
			error: error ? error.message : error,
			createdAt: dayjs().toDate()
		});

		callback && callback(message);
	};
};

export const buildContextBody = (context: StageRuntimeContext): Partial<StageRuntimeContext> => {
	const {pipelineRuntimeId, stageRuntimeId, stageIndex, status, ...rest} = context;
	return rest;
};

export const findRuntimeData = async (stageRuntimeId: string): Promise<StageRuntimeTable | undefined> => {
	const db = connectSimulatorDB();
	return db.stages.get({stageRuntimeId});
};