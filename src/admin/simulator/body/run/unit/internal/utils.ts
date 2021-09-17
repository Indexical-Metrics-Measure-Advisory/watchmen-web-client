import {connectSimulatorDB} from '@/services/local-persist/db';
import {InternalUnitRuntimeTable} from '@/services/local-persist/db/simulator';
import dayjs from 'dayjs';
import {InternalUnitRuntimeContext, PipelineRuntimeContext, StageRuntimeContext, UnitRuntimeContext} from '../../types';

export const createLogWriter = (
	pipelineContext: PipelineRuntimeContext,
	stageContext: StageRuntimeContext,
	unitContext: UnitRuntimeContext,
	context: InternalUnitRuntimeContext,
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
			internalUnitRuntimeId: context.internalUnitRuntimeId,
			message,
			error: error ? error.message : error,
			createdAt: dayjs().toDate()
		});

		callback && callback(message);
	};
};

export const buildContextBody = (context: InternalUnitRuntimeContext): Partial<UnitRuntimeContext> => {
	const {
		pipelineRuntimeId,
		stageRuntimeId,
		unitRuntimeId,
		internalUnitRuntimeId,
		internalUnitIndex,
		status,
		...rest
	} = context;
	return rest;
};

export const findRuntimeData = async (internalUnitRuntimeId: string): Promise<InternalUnitRuntimeTable | undefined> => {
	const db = connectSimulatorDB();
	return db.internalUnits.get({internalUnitRuntimeId});
};