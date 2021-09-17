import {connectSimulatorDB} from '@/services/local-persist/db';
import dayjs from 'dayjs';
import {PipelineRuntimeContext, StageRuntimeContext, UnitRuntimeContext} from '../types';

export const createLogWriter = (
	pipelineContext: PipelineRuntimeContext,
	stageContext: StageRuntimeContext,
	context: UnitRuntimeContext,
	callback?: (message: string) => void
) => {
	return async (message: string) => {
		const db = connectSimulatorDB();
		await db.logs.add({
			pipelineId: pipelineContext.pipeline.pipelineId,
			pipelineRuntimeId: pipelineContext.pipelineRuntimeId!,
			stageId: stageContext.stage.stageId,
			stageRuntimeId: stageContext.stageRuntimeId,
			unitId: context.unit.unitId,
			unitRuntimeId: context.unitRuntimeId,
			message,
			createdAt: dayjs().toDate()
		});

		callback && callback(message);
	};
};

export const buildContextBody = (context: UnitRuntimeContext): Partial<UnitRuntimeContext> => {
	const {pipelineRuntimeId, stageRuntimeId, unitRuntimeId, unitIndex, status, ...rest} = context;
	return rest;
};