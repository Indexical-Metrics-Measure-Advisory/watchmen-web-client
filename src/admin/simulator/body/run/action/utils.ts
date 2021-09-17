import {connectSimulatorDB} from '@/services/local-persist/db';
import {ActionRuntimeTable} from '@/services/local-persist/db/simulator';
import dayjs from 'dayjs';
import {ActionRuntimeContext, PipelineRuntimeContext, StageRuntimeContext, UnitRuntimeContext} from '../types';

export const createLogWriter = (
	pipelineContext: PipelineRuntimeContext,
	stageContext: StageRuntimeContext,
	unitContext: UnitRuntimeContext,
	context: ActionRuntimeContext,
	callback?: (message: string, error?: Error) => void
) => {
	return async (message: string, error?: Error) => {
		const db = connectSimulatorDB();
		await db.logs.add({
			pipelineId: pipelineContext.pipeline.pipelineId,
			pipelineRuntimeId: pipelineContext.pipelineRuntimeId!,
			stageId: stageContext.stage.stageId,
			stageRuntimeId: stageContext.stageRuntimeId,
			unitId: unitContext.unit.unitId,
			unitRuntimeId: unitContext.unitRuntimeId,
			actionId: context.action.actionId,
			actionRuntimeId: context.actionRuntimeId,
			message,
			error: error?.message,
			createdAt: dayjs().toDate()
		});

		callback && callback(message);
	};
};

export const buildContextBody = (context: ActionRuntimeContext): Partial<ActionRuntimeContext> => {
	const {pipelineRuntimeId, stageRuntimeId, unitRuntimeId, actionRuntimeId, actionIndex, status, ...rest} = context;
	return rest;
};

export const findRuntimeData = async (actionRuntimeId: string): Promise<ActionRuntimeTable | undefined> => {
	const db = connectSimulatorDB();
	return db.actions.get({actionRuntimeId});
};