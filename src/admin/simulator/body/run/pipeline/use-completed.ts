import {useEffect} from 'react';
import {PipelineRunStatus, PipelineRuntimeContext} from '../types';
import {useRuntimeEventBus} from '../runtime/runtime-event-bus';
import {RuntimeEventTypes} from '../runtime/runtime-event-bus-types';
import {connectSimulatorDB} from '../../../../../local-persist/db';
import dayjs from 'dayjs';
import {buildContextBody, createLogWriter} from './utils';

export const useCompleted = (
	context: PipelineRuntimeContext,
	setMessage: (message: string) => void
) => {
	const {on, off} = useRuntimeEventBus();
	useEffect(() => {
		const logWrite = createLogWriter(context, setMessage);
		const finishPipeline = async () => {
			await connectSimulatorDB().pipelines.update(context.pipelineRuntimeId!, {
				body: buildContextBody(context),
				status: context.status,
				dataAfter: context.runtimeData,
				changed: context.changedData,
				lastModifiedAt: dayjs().toDate()
			});
			// TODO run next pipeline
		};
		const onPipelineCompeted = (status: PipelineRunStatus) => async (c: PipelineRuntimeContext) => {
			if (c !== context) {
				return;
			}
			context.status = status;
			await logWrite(`Pipeline finished on status ${status}.`);
			await finishPipeline();
		};
		const onPipelineIgnored = onPipelineCompeted(PipelineRunStatus.IGNORED);
		const onPipelineDone = onPipelineCompeted(PipelineRunStatus.DONE);
		const onPipelineFailed = onPipelineCompeted(PipelineRunStatus.FAIL);
		on(RuntimeEventTypes.PIPELINE_IGNORED, onPipelineIgnored);
		on(RuntimeEventTypes.PIPELINE_DONE, onPipelineDone);
		on(RuntimeEventTypes.PIPELINE_FAILED, onPipelineFailed);
		return () => {
			off(RuntimeEventTypes.PIPELINE_IGNORED, onPipelineIgnored);
			off(RuntimeEventTypes.PIPELINE_DONE, onPipelineDone);
			off(RuntimeEventTypes.PIPELINE_FAILED, onPipelineFailed);
		};
	}, [on, off, context, setMessage]);
};