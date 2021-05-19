import {useEffect} from 'react';
import {ChangedDataRow, PipelineRunStatus, PipelineRuntimeContext} from '../types';
import {useRuntimeEventBus} from '../runtime/runtime-event-bus';
import {RuntimeEventTypes} from '../runtime/runtime-event-bus-types';
import {connectSimulatorDB} from '../../../../../local-persist/db';
import dayjs from 'dayjs';
import {buildContextBody, createLogWriter} from './utils';
import {Pipeline} from '../../../../../services/tuples/pipeline-types';
import {buildPipelineRuntimeContext} from '../utils';
import {voteNextDynamicPipeline} from './vote';

export const useCompleted = (
	context: PipelineRuntimeContext,
	pipelines: Array<Pipeline>,
	setMessage: (message: string) => void
) => {
	const {on, off, fire} = useRuntimeEventBus();
	useEffect(() => {
		const logWrite = createLogWriter(context, setMessage);
		const finishPipeline = async () => {
			await connectSimulatorDB().pipelines.update(context.pipelineRuntimeId!, {
				status: context.status,
				context: buildContextBody(context),
				dataAfter: context.runtimeData,
				changed: context.changedData,
				lastModifiedAt: dayjs().toDate()
			});
			if (context.changedData.length > 0) {
				// merge changed data
				const merged = context.changedData.reduce((merged, changed) => {
					if (!merged.some(item => item.after === changed.after)) {
						merged.push(changed);
					}
					return merged;
				}, [] as Array<ChangedDataRow>);
				context.changedData = merged;
				const [first] = merged;
				const {topicId} = first;
				const topic = context.allTopics[topicId];
				// eslint-disable-next-line
				const availablePipelines = pipelines.filter(p => p.topicId == topicId);
				const nextDynamicPipeline = voteNextDynamicPipeline({
					candidates: availablePipelines,
					allPipelines: pipelines
				});
				const dynamicPipelineContext = buildPipelineRuntimeContext({
					pipeline: nextDynamicPipeline,
					topic,
					triggerData: first.after,
					triggerDataOnce: first.before,
					existsData: context.allData[topicId],
					allData: context.allData,
					allTopics: context.allTopics
				});
				fire(RuntimeEventTypes.RUN_DYNAMIC_PIPELINE, dynamicPipelineContext);
			} else {
				// nothing changed, never occurs
				fire(RuntimeEventTypes.RUN_NEXT_PIPELINE);
			}
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
	}, [on, off, fire, context, pipelines, setMessage]);
};