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