import {useRuntimeEventBus} from '../runtime/runtime-event-bus';
import {useEffect} from 'react';
import {PipelineRuntimeContext, StageRuntimeContext, UnitRunStatus, UnitRuntimeContext} from '../types';
import {generateRuntimeId} from '../utils';
import {RuntimeEventTypes} from '../runtime/runtime-event-bus-types';
import {useForceUpdate} from '../../../../../basic-widgets/utils';
import {buildContextBody, createLogWriter} from './utils';
import {connectSimulatorDB} from '../../../../../local-persist/db';
import dayjs from 'dayjs';

export const useRunUnit = (
	pipelineContext: PipelineRuntimeContext,
	stageContext: StageRuntimeContext,
	context: UnitRuntimeContext
) => {
	const {on, off, fire} = useRuntimeEventBus();
	const forceUpdate = useForceUpdate();

	useEffect(() => {
		const onRunUnit = async (c: UnitRuntimeContext) => {
			if (c !== context) {
				// only first one handle the pipeline start event
				return;
			}

			context.pipelineRuntimeId = pipelineContext.pipelineRuntimeId;
			context.stageRuntimeId = stageContext.stageRuntimeId!;
			context.unitRuntimeId = generateRuntimeId();
			await (createLogWriter(pipelineContext, stageContext, context)('Start unit'));
			await connectSimulatorDB().units.add({
				unitId: context.unit.unitId,
				unitRuntimeId: context.unitRuntimeId!,
				stageId: stageContext.stage.stageId,
				stageRuntimeId: stageContext.stageRuntimeId!,
				pipelineId: pipelineContext.pipeline.pipelineId,
				pipelineRuntimeId: pipelineContext.pipelineRuntimeId!,
				unitIndex: context.unitIndex,
				status: context.status,
				body: buildContextBody(context),
				dataBefore: pipelineContext.runtimeData,
				lastModifiedAt: dayjs().toDate()
			});
			context.status = UnitRunStatus.RUNNING;
			forceUpdate();
			fire(RuntimeEventTypes.DO_UNIT_CONDITION_CHECK, context);
		};
		on(RuntimeEventTypes.RUN_UNIT, onRunUnit);
		return () => {
			off(RuntimeEventTypes.RUN_UNIT, onRunUnit);
		};
	}, [on, off, fire, forceUpdate, pipelineContext, stageContext, context]);
};