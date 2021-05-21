import React, {useState} from 'react';
import {Pipeline} from '../../../../services/tuples/pipeline-types';
import {TopicsData} from '../state/types';
import {AllTopics, PipelineRunStatus, PipelineRuntimeContext} from './types';
import {PipelineRun} from './pipeline';
import {buildPipelineRuntimeContext} from './utils';
import {RunsEventBusProvider, useRunsEventBus} from './runs-event-bus';
import {RunsEventTypes} from './runs-event-bus-types';
import {useEventBus} from '../../../../events/event-bus';
import {EventTypes} from '../../../../events/types';
import {AlertLabel} from '../../../../alert/widgets';

interface State {
	runs: Array<PipelineRuntimeContext>;
	currentIndex: number;
}

export const Pipelines = (props: {
	pipelineContexts: Array<PipelineRuntimeContext>;
	topics: AllTopics;
	allPipelines: Array<Pipeline>;
}) => {
	const {pipelineContexts, topics, allPipelines} = props;

	const {fire: fireGlobal} = useEventBus();
	const {fire} = useRunsEventBus();
	const onRunNext = () => {
		const nextPipeline = pipelineContexts.find(c => c.status === PipelineRunStatus.WAIT);
		if (nextPipeline) {
			fire(RunsEventTypes.RUN_PIPELINE, nextPipeline);
		} else {
			// all done
			fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>All pipelines are completed.</AlertLabel>);
		}
	};

	const [first, ...rest] = pipelineContexts;

	return <>
		<PipelineRun context={first} topics={topics} pipelines={allPipelines} runNext={onRunNext}/>
		{rest.map((context, index) => {
			return <PipelineRun context={context} topics={topics} pipelines={allPipelines}
			                    runNext={onRunNext}
			                    key={index}/>;
		})}
	</>;

};
export const Runs = (props: {
	// run pipelines, each pipeline means a trigger
	runPipelines: Array<Pipeline>;
	// available pipelines
	allPipelines: Array<Pipeline>;
	topics: AllTopics;
	data: TopicsData;
}) => {
	const {runPipelines, allPipelines, topics, data} = props;

	const [state] = useState<State>(() => {
		// all run pipelines are triggered by same topic
		const triggerDataRows = data[runPipelines[0].topicId];
		// if there are multiple rows of trigger data
		// pipeline will be triggered multiple times
		// here built the initial data for each trigger
		// in runtime, exists data for each trigger depends on previous pipeline run result

		// all pipelines will be run sequential, and they will share the same runtime data
		// but for trigger data, it will be inserted/updated one by one
		// therefore, runtime data for first bulk pipelines, only have first trigger data
		// and for 2nd bulk pipelines, the 2nd trigger data will be inserted/updated into runtime data
		// and so on.
		// let's construct the shared runtime data here, excludes all trigger data
		const runtimeData = Object.keys(data).reduce((runtimeData, topicId) => {
			// eslint-disable-next-line
			if (topicId == runPipelines[0].topicId) {
				// ignored
			} else {
				runtimeData[topicId] = data[topicId];
			}
			return runtimeData;
		}, {} as TopicsData);
		return {
			runs: triggerDataRows.map(triggerData => {
				// hold trigger data for context here
				return runPipelines.map(pipeline => {
					// first bulk always be insert
					return buildPipelineRuntimeContext({
						pipeline,
						topic: topics[pipeline.topicId]!,
						triggerData,
						runtimeData,
						allTopics: topics
					});
				});
			}).flat(),
			currentIndex: 0
		};
	});

	// future runs are led by first run,
	// change first context to ready and hold others as wait
	state.runs[0].status = PipelineRunStatus.READY;

	return <RunsEventBusProvider>
		<Pipelines pipelineContexts={state.runs}
		           topics={topics} allPipelines={allPipelines}/>
	</RunsEventBusProvider>;
};