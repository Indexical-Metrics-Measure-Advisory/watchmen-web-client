import {PipelineRuntimeContext} from '../types';
import {connectSimulatorDB} from '../../../../../local-persist/db';
import dayjs from 'dayjs';
import {PipelineRuntimeTable} from '../../../../../local-persist/db/simulator';

export const createLogWriter = (context: PipelineRuntimeContext, callback?: (message: string, error?: Error) => void) => {
	return async (message: string, error?: Error) => {
		const db = connectSimulatorDB();
		await db.logs.add({
			pipelineId: context.pipeline.pipelineId,
			pipelineRuntimeId: context.pipelineRuntimeId!,
			message,
			error: error ? error.message : error,
			createdAt: dayjs().toDate()
		});

		callback && callback(message);
	};
};

export const buildContextBody = (context: PipelineRuntimeContext): Partial<PipelineRuntimeContext> => {
	const {pipelineRuntimeId, status, allTopics, runtimeData, ...rest} = context;
	return rest;
};

export const findRuntimeData = async (pipelineRuntimeId: string): Promise<PipelineRuntimeTable | undefined> => {
	const db = connectSimulatorDB();
	return db.pipelines.get({pipelineRuntimeId});
};