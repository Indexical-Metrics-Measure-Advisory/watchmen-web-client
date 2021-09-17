import {connectSimulatorDB} from '@/services/local-persist/db';
import {useForceUpdate} from '@/widgets/basic/utils';
import dayjs from 'dayjs';
import {useEffect} from 'react';
import {useRuntimeEventBus} from '../runtime/runtime-event-bus';
import {RuntimeEventTypes} from '../runtime/runtime-event-bus-types';
import {PipelineRuntimeContext, StageRunStatus, StageRuntimeContext} from '../types';
import {generateRuntimeId} from '../utils';
import {buildContextBody, createLogWriter} from './utils';

export const useRunStage = (
	pipelineContext: PipelineRuntimeContext,
	context: StageRuntimeContext
) => {
	const {on, off, fire} = useRuntimeEventBus();
	const forceUpdate = useForceUpdate();

	useEffect(() => {
		const onRunStage = async (c: StageRuntimeContext) => {
			if (c !== context) {
				// only first one handle the pipeline start event
				return;
			}

			context.pipelineRuntimeId = pipelineContext.pipelineRuntimeId;
			context.stageRuntimeId = generateRuntimeId();
			await (createLogWriter(pipelineContext, context)('Start stage'));
			await connectSimulatorDB().stages.add({
				stageId: context.stage.stageId,
				stageRuntimeId: context.stageRuntimeId,
				pipelineId: pipelineContext.pipeline.pipelineId,
				pipelineRuntimeId: pipelineContext.pipelineRuntimeId!,
				stageIndex: context.stageIndex,
				status: context.status,
				context: buildContextBody(context),
				dataBefore: pipelineContext.runtimeData,
				lastModifiedAt: dayjs().toDate()
			});
			context.status = StageRunStatus.RUNNING;
			forceUpdate();
			fire(RuntimeEventTypes.DO_STAGE_CONDITION_CHECK, context);
		};
		on(RuntimeEventTypes.RUN_STAGE, onRunStage);
		return () => {
			off(RuntimeEventTypes.RUN_STAGE, onRunStage);
		};
	}, [on, off, fire, forceUpdate, pipelineContext, context]);
};