import {PipelineRuntimeContext} from '../types';
import {connectSimulatorDB} from '../../../../../local-persist/db';
import dayjs from 'dayjs';

export const createLogWriter = (context: PipelineRuntimeContext, callback?: (message: string) => void) => {
	return async (message: string) => {
		const db = connectSimulatorDB();
		await db.logs.add({
			pipelineId: context.pipeline.pipelineId,
			pipelineRuntimeId: context.pipelineRuntimeId!,
			message,
			createdAt: dayjs().toDate()
		});

		callback && callback(message);
	};
};

export const buildContextBody = (context: PipelineRuntimeContext): Partial<PipelineRuntimeContext> => {
	const {status, runtimeData, changedData, ...rest} = context;
	return rest;
};