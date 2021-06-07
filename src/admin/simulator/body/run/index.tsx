import {Pipeline} from '../../../../services/tuples/pipeline-types';
import {Topic} from '../../../../services/tuples/topic-types';
import {
	SimulatorBodyPart,
	SimulatorBodyPartHeader,
	SimulatorBodyPartHeaderButtons,
	SimulatorBodyPartHeaderTitle
} from '../widgets';
import React, {useEffect, useState} from 'react';
import {ActiveStep, SimulateStart, StartFrom, TopicsData} from '../state/types';
import {useActiveStep} from '../use-active-step';
import {RunBody, RunTable, RunTableHeader, RunTableHeaderCell} from './widgets';
import {SimulatorEventTypes} from '../../simulator-event-bus-types';
import {useSimulatorEventBus} from '../../simulator-event-bus';
import {getPipelineName} from '../../utils';
import {Runs} from './runs';
import {AllTopics} from './types';
import {Button} from '../../../../basic-widgets/button';
import {ButtonInk} from '../../../../basic-widgets/types';
import {RunsEventBusProvider, useRunsEventBus} from './runs-event-bus';
import {RunsEventTypes} from './runs-event-bus-types';
import {useEventBus} from '../../../../events/event-bus';
import {EventTypes} from '../../../../events/types';
import {AlertLabel} from '../../../../alert/widgets';
import dayjs from 'dayjs';

interface State {
	step: ActiveStep;
	topic: Topic | null;
	topicsData: TopicsData;
	pipelines: Array<Pipeline>;
}

/**
 * only compute the pipelines which are triggered by given topic directly
 */
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
	}, {} as AllTopics);
	let runPipelines: Array<Pipeline> = computeRunPipelines(allPipelines, topic);

	return <>
		<RunTableHeader>
			<RunTableHeaderCell>Execution Element</RunTableHeaderCell>
			<RunTableHeaderCell>Status</RunTableHeaderCell>
			<RunTableHeaderCell>Memory Data</RunTableHeaderCell>
			{/*<RunTableHeaderCell>Post Mem.</RunTableHeaderCell>*/}
			{/*<RunTableHeaderCell>Break Point</RunTableHeaderCell>*/}
			<RunTableHeaderCell/>
		</RunTableHeader>
		<RunTable>
			<Runs runPipelines={runPipelines} allPipelines={allPipelines}
			      topics={topicsMap} data={topicsData}/>
		</RunTable>
	</>;
};

export const RunningPlanHeader = (props: {
	topic: Topic | null;
	topics: Array<Topic>;
	showExport: boolean;
}) => {
	const {topic, topics, showExport} = props;

	const {fire: fireGlobal} = useEventBus();
	const {once: onceSimulator} = useSimulatorEventBus();
	const {once} = useRunsEventBus();

	const topicsMap = topics.reduce((map, topic) => {
		map[topic.topicId] = topic;
		return map;
	}, {} as { [key in string]: Topic });

	const onExportClicked = () => {
		console.log('2');
		once(RunsEventTypes.REPLY_RUNTIME_DATA, (started: boolean, done: boolean, runtimeData: TopicsData) => {
			if (!started) {
				fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>
					Pipeline(s) doesn't start yet.
				</AlertLabel>);
			} else if (!done) {
				fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>
					Pipeline(s) still in running.
				</AlertLabel>);
			} else {
				onceSimulator(SimulatorEventTypes.REPLY_RUN_MATERIAL, (topicsData: TopicsData) => {
					const content = {
						triggerData: {
							topicId: topic!.topicId,
							topic: topic!.name,
							data: topicsData[topic!.topicId]
						},
						dataBeforeRun: Object.keys(topicsData)
							// eslint-disable-next-line
							.filter(topicId => topicId != topic!.topicId)
							.map(topicId => {
								return {
									topicId,
									topic: topicsMap[topicId]!.name,
									data: topicsData[topicId]
								};
							}),
						dataAfterRun: Object.keys(runtimeData).map(topicId => {
							return {
								topicId,
								topic: topicsMap[topicId]!.name,
								data: runtimeData[topicId]
							};
						})
					};

					const link = document.createElement('a');
					link.href = 'data:application/json;charset=utf-8,' + encodeURI(JSON.stringify(content));
					link.target = '_blank';
					link.download = `data-of-pipeline -${dayjs().format('YYYYMMDDHHmmss')}.json`;
					link.click();
				}).fire(SimulatorEventTypes.ASK_RUN_MATERIAL);
			}
		}).fire(RunsEventTypes.ASK_RUNTIME_DATA);
	};

	return <SimulatorBodyPartHeader>
		<SimulatorBodyPartHeaderTitle># 3. Running</SimulatorBodyPartHeaderTitle>
		{showExport
			? <SimulatorBodyPartHeaderButtons>
				<Button ink={ButtonInk.PRIMARY} onClick={onExportClicked}>Export Whole Case Data</Button>
			</SimulatorBodyPartHeaderButtons>
			: null}
	</SimulatorBodyPartHeader>;
};

export const RunningPlan = (props: {
	pipelines: Array<Pipeline>;
	topics: Array<Topic>;
}) => {
	const {topics} = props;

	const {once, on, off} = useSimulatorEventBus();
	const [state, setState] = useState<State>({
		step: ActiveStep.SELECT,
		// trigger topic
		topic: null,
		// all topics data, initialized. including all trigger data
		topicsData: {},
		// available pipelines
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
		<RunsEventBusProvider>
			<RunningPlanHeader topic={state.topic} topics={topics} showExport={state.step === ActiveStep.RUN}/>
			{state.step === ActiveStep.RUN && state.topic != null
				? <RunBody>
					<Run topic={state.topic} topics={topics} topicsData={state.topicsData}
					     runPipelines={state.pipelines}/>
				</RunBody>
				: null
			}
		</RunsEventBusProvider>
	</SimulatorBodyPart>;
};