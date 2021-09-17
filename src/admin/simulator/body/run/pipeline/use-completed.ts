import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {connectSimulatorDB} from '@/services/local-persist/db';
import dayjs from 'dayjs';
import {useEffect} from 'react';
import {useRuntimeEventBus} from '../runtime/runtime-event-bus';
import {RuntimeEventTypes} from '../runtime/runtime-event-bus-types';
import {ChangedDataRow, PipelineRunStatus, PipelineRuntimeContext} from '../types';
import {buildPipelineRuntimeContext} from '../utils';
import {buildContextBody, createLogWriter} from './utils';
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
			let defeatedPipelines = context.defeatedPipelines || [];
			if (context.changedData.length > 0 || defeatedPipelines.length > 0) {
				// changed data which come from defeated pipelines in candidates voting on previous pipelines done
				const previousChanged = (context.defeatedPipelines || []).map(dp => dp.triggerData);
				// merge changed data which changed in this pipeline
				const newChanged = context.changedData.reduce((merged, changed) => {
					if (!merged.some(item => item.after === changed.after)) {
						merged.push(changed);
					}
					return merged;
				}, [] as Array<ChangedDataRow>);
				// all changed data, including changed in this pipeline, and changed in previous pipelines
				// sometimes, data changed in previous pipelines are changed in this pipeline again.
				const allMerged = [...new Set([...newChanged, ...previousChanged])];
				// distinct changed data on context in this pipeline
				context.changedData = newChanged;
				// find topics of these changed data
				const topicIds = allMerged.map(merge => merge.topicId);
				// find pipelines triggered by changed data
				// eslint-disable-next-line
				let availablePipelines = pipelines.filter(p => topicIds.includes(p.topicId));
				// available pipelines might include this pipeline, consider the following situation:
				// 1. topic A changed, triggered pipelines X and Y,
				// 2. vote in X & Y, X win,
				// 3. run pipeline X, changes topic B. in runtime context of pipeline X, pipeline Y is defeated pipeline,
				// 4. topic B change trigger pipeline Z, now we have pipeline Z comes from topic B and pipeline Y comes from topic A,
				// 5. gather changed topics, obviously we got A & B.
				// 6. find available pipelines by A & B, we got X/Y from A and Z from B. but in this case X was run, it is not needed anymore.
				// so following statement will find available pipelines from change data introduced by this pipeline
				// and if any pipeline is not included in this, it must be triggered by defeated.
				// and if cannot find it in defeated list, it will be removed. like in example above, pipeline X must be removed after step 6.
				const availablePipelinesOnNewChanged = (() => {
					const topicIds = newChanged.map(changed => changed.topicId);
					return pipelines.filter(p => topicIds.includes(p.topicId));
				})();
				let concernedPipelines = availablePipelines.filter(p => !availablePipelinesOnNewChanged.includes(p));
				concernedPipelines = concernedPipelines.filter(p => {
					// eslint-disable-next-line
					const defeated = defeatedPipelines.find(dp => dp.triggerData.topicId == p.topicId);
					if (!defeated) {
						return true;
					} else {
						return !defeated.pipelines.includes(p.pipelineId);
					}
				});
				availablePipelines = availablePipelines.filter(p => !concernedPipelines.includes(p));

				if (availablePipelines.length === 0) {
					// no more pipelines needs to be run in this series
					fire(RuntimeEventTypes.RUN_NEXT_PIPELINE);
				} else {
					const nextDynamicPipeline = voteNextDynamicPipeline({
						candidates: availablePipelines,
						allPipelines: pipelines
					});
					const topicId = nextDynamicPipeline.topicId;
					let trigger;
					// find trigger in defeated pipelines first
					// eslint-disable-next-line
					const defeats = defeatedPipelines.find(defeated => defeated.triggerData.topicId == topicId);
					let defeatedPicked = false;
					// eslint-disable-next-line
					if (defeats && defeats.pipelines.some(pipelineId => pipelineId == nextDynamicPipeline.pipelineId)) {
						// pipeline voted exists in defeated pipelines, use its data as trigger
						trigger = defeats.triggerData;
						// remove this pipeline from defeated list
						// eslint-disable-next-line
						defeats.pipelines = defeats.pipelines.filter(pipelineId => pipelineId != nextDynamicPipeline.pipelineId);
						if (defeats.pipelines.length === 0) {
							// all defeated pipelines are run or scheduled
							// remove this defeated
							defeatedPipelines = defeatedPipelines.filter(dp => dp !== defeats);
						}
						defeatedPicked = true;
					} else {
						// pipeline voted doesn't exist in defeated pipelines, use changed data from this pipeline
						// eslint-disable-next-line
						trigger = newChanged.find(changed => changed.topicId == topicId)!;
						defeatedPicked = false;
					}

					const dynamicPipelineContext = buildPipelineRuntimeContext({
						pipeline: nextDynamicPipeline,
						topic: context.allTopics[topicId],
						triggerData: trigger.after,
						triggerDataOnce: trigger.before,
						runtimeData: context.runtimeData,
						allTopics: context.allTopics
					});
					// save defeated pipelines to context, will used in next round
					dynamicPipelineContext.defeatedPipelines = [
						// comes from defeated pipelines, from previous pipelines
						//
						...defeatedPipelines,
						// comes from changed data introduced by this pipeline
						...newChanged.map(changed => {
							// eslint-disable-next-line
							let availablePipelines = pipelines.filter(p => changed.topicId == p.topicId);
							if (!defeatedPicked) {
								// if next dynamic pipeline comes from defeated pipelines
								// then any pipelines must add into new defeated list
								// otherwise picked one must be filtered
								availablePipelines = availablePipelines.filter(p => p !== nextDynamicPipeline);
							}
							return {
								triggerData: changed,
								pipelines: availablePipelines.map(p => p.pipelineId)
							};
						}).filter(x => x.pipelines.length > 0)
					];
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