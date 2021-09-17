import {connectSimulatorDB} from '@/services/local-persist/db';
import {useForceUpdate} from '@/widgets/basic/utils';
import dayjs from 'dayjs';
import {useEffect} from 'react';
import {useRuntimeEventBus} from '../runtime/runtime-event-bus';
import {RuntimeEventTypes} from '../runtime/runtime-event-bus-types';
import {PipelineRuntimeContext, StageRuntimeContext, UnitRunStatus, UnitRuntimeContext} from '../types';
import {generateRuntimeId} from '../utils';
import {buildContextBody, createLogWriter} from './utils';

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
				context: buildContextBody(context),
				dataBefore: pipelineContext.runtimeData,
				lastModifiedAt: dayjs().toDate()
			});
			context.status = UnitRunStatus.RUNNING;
			forceUpdate();
			fire(RuntimeEventTypes.BUILD_INTERNAL_UNITS, context);
		};
		on(RuntimeEventTypes.RUN_UNIT, onRunUnit);
		return () => {
			off(RuntimeEventTypes.RUN_UNIT, onRunUnit);
		};
	}, [on, off, fire, forceUpdate, pipelineContext, stageContext, context]);
};