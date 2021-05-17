import {useRuntimeEventBus} from '../runtime/runtime-event-bus';
import {useEffect} from 'react';
import {
	ActionRunStatus,
	ActionRuntimeContext, InternalUnitRuntimeContext,
	PipelineRuntimeContext,
	StageRuntimeContext,
	UnitRuntimeContext
} from '../types';
import {generateRuntimeId} from '../utils';
import {RuntimeEventTypes} from '../runtime/runtime-event-bus-types';
import {useForceUpdate} from '../../../../../basic-widgets/utils';
import {connectSimulatorDB} from '../../../../../local-persist/db';
import dayjs from 'dayjs';
import {buildContextBody, createLogWriter} from './utils';

export const useRunAction = (
	pipelineContext: PipelineRuntimeContext,
	stageContext: StageRuntimeContext,
	unitContext: UnitRuntimeContext,
	internalUnitContext: InternalUnitRuntimeContext,
	context: ActionRuntimeContext
) => {
	const {on, off, fire} = useRuntimeEventBus();
	const forceUpdate = useForceUpdate();

	useEffect(() => {
		const onRunAction = async (c: ActionRuntimeContext) => {
			if (c !== context) {
				return;
			}

			context.pipelineRuntimeId = pipelineContext.pipelineRuntimeId;
			context.stageRuntimeId = stageContext.stageRuntimeId!;
			context.unitRuntimeId = unitContext.unitRuntimeId!;
			context.actionRuntimeId = generateRuntimeId();
			await (createLogWriter(pipelineContext, stageContext, unitContext, context)('Start action'));
			context.status = ActionRunStatus.RUNNING;
			await connectSimulatorDB().actions.add({
				actionId: context.action.actionId,
				actionRuntimeId: context.actionRuntimeId!,
				internalUnitRuntimeId: internalUnitContext.internalUnitRuntimeId!,
				unitId: unitContext.unit.unitId,
				unitRuntimeId: unitContext.unitRuntimeId!,
				stageId: stageContext.stage.stageId,
				stageRuntimeId: stageContext.stageRuntimeId!,
				pipelineId: pipelineContext.pipeline.pipelineId,
				pipelineRuntimeId: pipelineContext.pipelineRuntimeId!,
				actionIndex: context.actionIndex,
				status: context.status,
				context: buildContextBody(context),
				dataBefore: pipelineContext.runtimeData,
				lastModifiedAt: dayjs().toDate()
			});
			forceUpdate();
		};
		on(RuntimeEventTypes.RUN_ACTION, onRunAction);
		return () => {
			off(RuntimeEventTypes.RUN_ACTION, onRunAction);
		};
	}, [on, off, fire, forceUpdate, pipelineContext, stageContext, unitContext, context]);
};