import React, {useState} from 'react';
import {Pipeline} from '../../../../services/tuples/pipeline-types';
import {Topic} from '../../../../services/tuples/topic-types';
import {TopicsData} from '../state/types';
import {PipelineRunStatus, PipelineRuntimeContext} from './types';
import {PipelineRun} from './pipeline';
import {buildPipelineRuntimeContext} from './utils';
import {DataRow} from '../../simulator-event-bus-types';

export const Runs = (props: {
	runPipelines: Array<Pipeline>;
	allPipelines: Array<Pipeline>;
	topics: { [key in string]: Topic };
	data: TopicsData;
}) => {
	const {runPipelines, topics, data} = props;

	const [runs] = useState<Array<PipelineRuntimeContext>>(() => {
		// all run pipelines are triggered by same topic
		const triggerDataRows = data[runPipelines[0].topicId];
		const existsData: Array<DataRow> = [];
		// if there are multiple rows of trigger data
		// pipeline will be triggered multiple times
		// here built the initial data for each trigger
		// in runtime, exists data for each trigger depends on previous pipeline run result
		return triggerDataRows.map(triggerData => {
			return runPipelines.map(pipeline => {
				// exists data doesn't include the trigger data if trigger data is not inserted by previous pipelines
				const context = buildPipelineRuntimeContext(pipeline, topics[pipeline.topicId]!, triggerData, [...existsData], data);
				// trigger data will be inserted into this topic
				if (!existsData.includes(triggerData)) {
					existsData.push(triggerData);
				}
				return context;
			});
		}).flat();
	});

	// future is not led by first, always run
	const [first, ...rest] = runs;
	first.status = PipelineRunStatus.READY;

	return <>
		<PipelineRun context={first}/>
		{rest.map((context, index) => {
			return <PipelineRun context={context} key={index}/>;
		})}
	</>;
};