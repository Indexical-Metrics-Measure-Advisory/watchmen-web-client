import React, {useState} from 'react';
import {Pipeline} from '../../../../services/tuples/pipeline-types';
import {TopicsData} from '../state/types';
import {AllTopics, PipelineRunStatus, PipelineRuntimeContext} from './types';
import {PipelineRun} from './pipeline';
import {buildPipelineRuntimeContext} from './utils';
import {DataRow} from '../../simulator-event-bus-types';

interface State {
	runs: Array<PipelineRuntimeContext>;
	currentIndex: number;
}

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
						allData: data,
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
	const [first, ...rest] = state.runs;
	first.status = PipelineRunStatus.READY;

	return <>
		<PipelineRun context={first} topics={topics} pipelines={allPipelines}/>
		{rest.map((context, index) => {
			return <PipelineRun context={context} topics={topics} pipelines={allPipelines} key={index}/>;
		})}
	</>;
};