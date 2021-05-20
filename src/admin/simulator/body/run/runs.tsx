import React, {useState} from 'react';
import {Pipeline} from '../../../../services/tuples/pipeline-types';
import {TopicsData} from '../state/types';
import {AllTopics, PipelineRunStatus, PipelineRuntimeContext} from './types';
import {PipelineRun} from './pipeline';
import {buildPipelineRuntimeContext} from './utils';
import {DataRow} from '../../simulator-event-bus-types';
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
		const existsData: Array<DataRow> = [];
		// if there are multiple rows of trigger data
		// pipeline will be triggered multiple times
		// here built the initial data for each trigger
		// in runtime, exists data for each trigger depends on previous pipeline run result
		return {
			runs: triggerDataRows.map(triggerData => {
				return runPipelines.map(pipeline => {
					// exists data doesn't include the trigger data if trigger data is not inserted by previous pipelines
					const context = buildPipelineRuntimeContext({
						pipeline,
						topic: topics[pipeline.topicId]!,
						triggerData,
						existsData: [...existsData],
						allData: JSON.parse(JSON.stringify(data)),
						allTopics: topics
					});
					// trigger data will be inserted into this topic
					if (!existsData.includes(triggerData)) {
						existsData.push(triggerData);
					}
					return context;
				});
			}).flat(),
			currentIndex: 0
		};
	});

	// future is not led by first, always run
	state.runs[0].status = PipelineRunStatus.READY;

	return <RunsEventBusProvider>
		<Pipelines pipelineContexts={state.runs}
		           topics={topics} allPipelines={allPipelines}/>
	</RunsEventBusProvider>;
};