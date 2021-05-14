import {Pipeline} from '../../../../services/tuples/pipeline-types';
import {Topic} from '../../../../services/tuples/topic-types';
import {SimulatorBodyPart, SimulatorBodyPartHeader, SimulatorBodyPartHeaderTitle} from '../widgets';
import React, {useEffect, useState} from 'react';
import {ActiveStep, SimulateStart, StartFrom, TopicsData} from '../state/types';
import {useActiveStep} from '../use-active-step';
import {RunBody, RunTable, RunTableHeader, RunTableHeaderCell} from './widgets';
import {SimulatorEventTypes} from '../../simulator-event-bus-types';
import {useSimulatorEventBus} from '../../simulator-event-bus';
import {getPipelineName} from '../../utils';
import {Runs} from './runs';

interface State {
	step: ActiveStep;
	topic: Topic | null;
	topicsData: TopicsData;
	pipelines: Array<Pipeline>;
}

const computeRunPipelines = (
	pipelines: Array<Pipeline>,
	topic: Topic
): Array<Pipeline> => {
	// eslint-disable-next-line
	return pipelines.filter(p => p.topicId == topic.topicId).sort((p1, p2) => {
		return getPipelineName(p1).toLowerCase().localeCompare(getPipelineName(p2));
	});
};
export const Run = (props: {
	topic: Topic;
	topics: Array<Topic>;
	topicsData: TopicsData;
	runPipelines: Array<Pipeline>
}) => {
	const {topic, topics, topicsData, runPipelines: allPipelines} = props;

	const topicsMap = topics.reduce((map, topic) => {
		map[topic.topicId] = topic;
		return map;
	}, {} as { [key in string]: Topic });
	let runPipelines: Array<Pipeline> = computeRunPipelines(allPipelines, topic);

	return <>
		<RunTableHeader>
			<RunTableHeaderCell>Execution Element</RunTableHeaderCell>
			<RunTableHeaderCell>Status</RunTableHeaderCell>
			<RunTableHeaderCell>Pre Mem.</RunTableHeaderCell>
			<RunTableHeaderCell>Post Mem.</RunTableHeaderCell>
			<RunTableHeaderCell>Break Point</RunTableHeaderCell>
			<RunTableHeaderCell/>
		</RunTableHeader>
		<RunTable>
			<Runs runPipelines={runPipelines} allPipelines={allPipelines}
			      topics={topicsMap} data={topicsData}/>
		</RunTable>
	</>;
};

export const RunningPlan = (props: {
	pipelines: Array<Pipeline>;
	topics: Array<Topic>;
}) => {
	const {topics} = props;

	const {once, on, off} = useSimulatorEventBus();
	const [state, setState] = useState<State>({
		step: ActiveStep.SELECT,
		topic: null,
		topicsData: {},
		pipelines: []
	});
	useEffect(() => {
		const onChange = () => {
			setState(state => ({...state, topic: null, topicsData: {}, pipelines: []}));
		};
		on(SimulatorEventTypes.START_TOPIC_CHANGED, onChange);
		on(SimulatorEventTypes.START_PIPELINE_CHANGED, onChange);
		return () => {
			off(SimulatorEventTypes.START_TOPIC_CHANGED, onChange);
			off(SimulatorEventTypes.START_PIPELINE_CHANGED, onChange);
		};
	}, [on, off]);
	useActiveStep((step) => {
		if (step === ActiveStep.RUN) {
			once(SimulatorEventTypes.REPLY_START, (start: SimulateStart) => {
				let topic: Topic | null = null;
				if (start.startFrom === StartFrom.TOPIC) {
					topic = start.startTopic!;
				} else if (start.startFrom === StartFrom.PIPELINE) {
					// eslint-disable-next-line
					topic = topics.find(t => t.topicId == start.startPipeline!.topicId)!;
				}
				once(SimulatorEventTypes.REPLY_RUN_MATERIAL, (topicsData: TopicsData, pipelines: Array<Pipeline>) => {
					setState({step: ActiveStep.RUN, topic, topicsData, pipelines});
				}).fire(SimulatorEventTypes.ASK_RUN_MATERIAL);
			}).fire(SimulatorEventTypes.ASK_START);
		} else {
			setState(state => ({...state, step}));
		}
	});

	return <SimulatorBodyPart collapsed={state.step !== ActiveStep.RUN}>
		<SimulatorBodyPartHeader>
			<SimulatorBodyPartHeaderTitle># 3. Running</SimulatorBodyPartHeaderTitle>
		</SimulatorBodyPartHeader>
		{state.step === ActiveStep.RUN && state.topic != null
			? <RunBody>
				<Run topic={state.topic} topics={topics} topicsData={state.topicsData} runPipelines={state.pipelines}/>
			</RunBody>
			: null
		}
	</SimulatorBodyPart>;
};