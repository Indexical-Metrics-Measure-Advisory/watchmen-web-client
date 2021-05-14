import {useEffect} from 'react';
import {PipelineRuntimeContext, StageRunStatus, StageRuntimeContext} from '../types';
import {useRuntimeEventBus} from '../runtime/runtime-event-bus';
import {RuntimeEventTypes} from '../runtime/runtime-event-bus-types';
import {connectSimulatorDB} from '../../../../../local-persist/db';
import dayjs from 'dayjs';
import {createLogWriter} from './utils';

export const useCompleted = (
	pipelineContext: PipelineRuntimeContext,
	context: StageRuntimeContext,
	setMessage: (message: string) => void
) => {
	const {on, off, fire} = useRuntimeEventBus();
	useEffect(() => {
		const logWrite = createLogWriter(pipelineContext, context, setMessage);
		const finishStage = async () => {
			await connectSimulatorDB().stages.update(context.stageRuntimeId!, {
				body: context,
				dataAfter: pipelineContext.runtimeData,
				lastModifiedAt: dayjs().toDate()
			});
			if (context.status === StageRunStatus.FAIL) {
				// stage failed, break;
				fire(RuntimeEventTypes.PIPELINE_FAILED, pipelineContext);
			} else {
				// try to run next stage
				const stages = pipelineContext.stages;
				const index = stages.indexOf(context);
				if (index === stages.length - 1) {
					// last finished
					fire(RuntimeEventTypes.PIPELINE_DONE, pipelineContext);
				} else {
					// run next stage
					fire(RuntimeEventTypes.RUN_STAGE, stages[index + 1]);
				}
			}
		};
		const onStageCompleted = (status: StageRunStatus) => async (c: StageRuntimeContext) => {
			if (c !== context) {
				return;
			}
			context.status = status;
			await logWrite(`Stage finished on status ${status}.`);
			await finishStage();
		};
		const onStageIgnored = onStageCompleted(StageRunStatus.IGNORED);
		const onStageDone = onStageCompleted(StageRunStatus.DONE);
		const onStageFailed = onStageCompleted(StageRunStatus.FAIL);
		on(RuntimeEventTypes.STAGE_IGNORED, onStageIgnored);
		on(RuntimeEventTypes.STAGE_DONE, onStageDone);
		on(RuntimeEventTypes.STAGE_FAILED, onStageFailed);
		return () => {
			off(RuntimeEventTypes.STAGE_IGNORED, onStageIgnored);
			off(RuntimeEventTypes.STAGE_DONE, onStageDone);
			off(RuntimeEventTypes.STAGE_FAILED, onStageFailed);
		};
	}, [on, off, fire, pipelineContext, context, setMessage]);
};