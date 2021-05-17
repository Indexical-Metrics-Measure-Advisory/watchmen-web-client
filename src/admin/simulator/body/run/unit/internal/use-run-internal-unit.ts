import {useRuntimeEventBus} from '../../runtime/runtime-event-bus';
import {useEffect} from 'react';
import {
	InternalUnitRuntimeContext,
	PipelineRuntimeContext,
	StageRuntimeContext,
	UnitRunStatus,
	UnitRuntimeContext
} from '../../types';
import {useForceUpdate} from '../../../../../../basic-widgets/utils';
import {buildContextBody, createLogWriter} from './utils';
import {connectSimulatorDB} from '../../../../../../local-persist/db';
import dayjs from 'dayjs';
import {generateRuntimeId} from '../../utils';
import {RuntimeEventTypes} from '../../runtime/runtime-event-bus-types';

export const useRunInternalUnit = (
	pipelineContext: PipelineRuntimeContext,
	stageContext: StageRuntimeContext,
	unitContext: UnitRuntimeContext,
	context: InternalUnitRuntimeContext
) => {
	const {on, off, fire} = useRuntimeEventBus();
	const forceUpdate = useForceUpdate();

	useEffect(() => {
		const onRunUnit = async (c: InternalUnitRuntimeContext) => {
			if (c !== context) {
				return;
			}

			context.pipelineRuntimeId = pipelineContext.pipelineRuntimeId;
			context.stageRuntimeId = stageContext.stageRuntimeId!;
			context.unitRuntimeId = unitContext.unitRuntimeId!;
			context.internalUnitRuntimeId = generateRuntimeId();
			await (createLogWriter(pipelineContext, stageContext, unitContext, context)('Start unit'));
			await connectSimulatorDB().internalUnits.add({
				internalUnitRuntimeId: context.internalUnitRuntimeId,
				unitId: unitContext.unit.unitId,
				unitRuntimeId: unitContext.unitRuntimeId!,
				stageId: stageContext.stage.stageId,
				stageRuntimeId: stageContext.stageRuntimeId!,
				pipelineId: pipelineContext.pipeline.pipelineId,
				pipelineRuntimeId: pipelineContext.pipelineRuntimeId!,
				internalUnitIndex: context.internalUnitIndex,
				status: context.status,
				context: buildContextBody(context),
				dataBefore: pipelineContext.runtimeData,
				lastModifiedAt: dayjs().toDate()
			});
			context.status = UnitRunStatus.RUNNING;
			forceUpdate();
			fire(RuntimeEventTypes.DO_INTERNAL_UNIT_CONDITION_CHECK, context);
		};
		on(RuntimeEventTypes.RUN_INTERNAL_UNIT, onRunUnit);
		return () => {
			off(RuntimeEventTypes.RUN_INTERNAL_UNIT, onRunUnit);
		};
	}, [on, off, fire, forceUpdate, pipelineContext, stageContext, unitContext, context]);
};