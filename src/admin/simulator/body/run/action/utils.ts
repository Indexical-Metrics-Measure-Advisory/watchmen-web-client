import {ActionRuntimeContext, PipelineRuntimeContext, StageRuntimeContext, UnitRuntimeContext} from '../types';
import {connectSimulatorDB} from '../../../../../local-persist/db';
import dayjs from 'dayjs';

export const createLogWriter = (
	pipelineContext: PipelineRuntimeContext,
	stageContext: StageRuntimeContext,
	unitContext: UnitRuntimeContext,
	context: ActionRuntimeContext,
	callback?: (message: string) => void
) => {
	return async (message: string) => {
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
			createdAt: dayjs().toDate()
		});

		callback && callback(message);
	};
};

export const buildContextBody = (context: ActionRuntimeContext): Partial<ActionRuntimeContext> => {
	const {pipelineRuntimeId, stageRuntimeId, unitRuntimeId, actionRuntimeId, actionIndex, status, ...rest} = context;
	return rest;
};