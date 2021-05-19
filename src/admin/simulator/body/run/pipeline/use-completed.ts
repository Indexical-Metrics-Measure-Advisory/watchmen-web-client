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
				const topicIds = merged.map(merge => merge.topicId);
				// eslint-disable-next-line
				const availablePipelines = pipelines.filter(p => topicIds.includes(p.topicId));
				if (availablePipelines.length === 0) {
					// no more pipelines needs to be run in this series
					fire(RuntimeEventTypes.RUN_NEXT_PIPELINE);
				} else {
					const nextDynamicPipeline = voteNextDynamicPipeline({
						candidates: availablePipelines,
						allPipelines: pipelines
					});
					const topicId = nextDynamicPipeline.topicId;
					// eslint-disable-next-line
					const trigger = merged.find(merge => merge.topicId == topicId)!;
					const dynamicPipelineContext = buildPipelineRuntimeContext({
						pipeline: nextDynamicPipeline,
						topic: context.allTopics[topicId],
						triggerData: trigger.after,
						triggerDataOnce: trigger.before,
						existsData: context.allData[topicId],
						allData: context.allData,
						allTopics: context.allTopics,
						changedData: merged.filter(merge => merge !== trigger)
					});
					fire(RuntimeEventTypes.RUN_DYNAMIC_PIPELINE, dynamicPipelineContext);
				}
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
		const onPipelineFailed = async (c: PipelineRuntimeContext, error?: Error) => {
			if (c !== context) {
				return;
			}
			context.status = PipelineRunStatus.FAIL;
			await logWrite(`Pipeline failed${error ? ` on error[${error.message}]` : ''}.`);
			await finishPipeline();
		};
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