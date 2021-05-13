import React, {useState} from 'react';
import {Pipeline} from '../../../../services/tuples/pipeline-types';
import {Topic} from '../../../../services/tuples/topic-types';
import {TopicsData} from '../state/types';
import {PipelineRuntimeContext, RunStatus} from './types';
import {PipelineRun} from './pipeline-run';
import {buildPipelineRuntimeContext} from './utils';

export const Runs = (props: {
	runPipelines: Array<Pipeline>;
	allPipelines: Array<Pipeline>;
	topics: { [key in string]: Topic };
	data: TopicsData;
}) => {
	const {runPipelines, topics, data} = props;

	const [runs] = useState<Array<PipelineRuntimeContext>>(() => {
		return runPipelines.map(pipeline => {
			const triggerData = data[pipeline.topicId];
			return triggerData.map(d => {
				return buildPipelineRuntimeContext(pipeline, topics[pipeline.topicId]!, d);
			});
		}).flat();
	});

	// future is not led by first, always run
	const [first, ...rest] = runs;
	first.status = RunStatus.READY;

	// TODO write data into db

	return <>
		<PipelineRun context={first}/>
		{rest.map((context, index) => {
			return <PipelineRun context={context} key={index}/>;
		})}
	</>;
};