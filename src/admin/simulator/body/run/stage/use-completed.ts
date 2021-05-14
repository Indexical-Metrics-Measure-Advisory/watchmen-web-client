import {useEffect} from 'react';
import {PipelineRuntimeContext, StageRunStatus, StageRuntimeContext} from '../types';
import {useRuntimeEventBus} from '../runtime/runtime-event-bus';
import {RuntimeEventTypes} from '../runtime/runtime-event-bus-types';
import {connectSimulatorDB} from '../../../../../local-persist/db';
import dayjs from 'dayjs';
import {useForceUpdate} from '../../../../../basic-widgets/utils';

export const useCompleted = (
	pipelineContext: PipelineRuntimeContext,
	context: StageRuntimeContext
) => {
	const {on, off, fire} = useRuntimeEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const finishStage = async () => {
			await connectSimulatorDB().stages.update(context.stageRuntimeId!, {
				body: context,
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
			forceUpdate();
			await finishStage();
		};
		const onPipelineIgnored = onStageCompleted(StageRunStatus.IGNORED);
		const onPipelineDone = onStageCompleted(StageRunStatus.DONE);
		const onPipelineFailed = onStageCompleted(StageRunStatus.FAIL);
		on(RuntimeEventTypes.STAGE_IGNORED, onPipelineIgnored);
		on(RuntimeEventTypes.STAGE_DONE, onPipelineDone);
		on(RuntimeEventTypes.STAGE_FAILED, onPipelineFailed);
		return () => {
			off(RuntimeEventTypes.STAGE_IGNORED, onPipelineIgnored);
			off(RuntimeEventTypes.STAGE_DONE, onPipelineDone);
			off(RuntimeEventTypes.STAGE_FAILED, onPipelineFailed);
		};
	}, [on, off, fire, forceUpdate, pipelineContext, context]);
};