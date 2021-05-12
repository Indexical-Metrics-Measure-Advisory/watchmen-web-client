import {Pipeline} from '../../../../services/tuples/pipeline-types';
import {Topic} from '../../../../services/tuples/topic-types';
import {SimulatorBodyPart, SimulatorBodyPartHeader, SimulatorBodyPartHeaderTitle} from '../widgets';
import React, {useState} from 'react';
import {ActiveStep, SimulateStart, StartFrom} from '../state/types';
import {useActiveStep} from '../use-active-step';
import {useSimulatorEventBus} from '../../simulator-event-bus';
import {SimulatorEventTypes} from '../../simulator-event-bus-types';
import {TopicBlock} from './topic-block';
import {PrepareDataBodyPartBody, PrepareDataBodyPartRow, TopicBlockType} from './widgets';
import {buildTopicNode} from './utils';

interface State {
	step: ActiveStep;
	topic: Topic | null;
	pipelines: Array<Pipeline>;
}

const PrepareDataBody = (props: {
	topic: Topic;
	pipelines: Array<Pipeline>;
	topics: Array<Topic>;
}) => {
	const {topic, topics, pipelines} = props;
	const root = buildTopicNode(topic, null, [], topics, pipelines, true);

	const topicsMap = topics.reduce((map, topic) => {
		map.set(topic.topicId, topic);
		return map;
	}, new Map<string, Topic>());

	return <PrepareDataBodyPartBody>
		<PrepareDataBodyPartRow>
			<TopicBlock node={root} type={TopicBlockType.ROOT}
			            pipelines={pipelines} topics={topicsMap}/>
		</PrepareDataBodyPartRow>
	</PrepareDataBodyPartBody>;
};

export const PrepareData = (props: {
	pipelines: Array<Pipeline>;
	topics: Array<Topic>;
}) => {
	const {pipelines, topics} = props;

	const {once} = useSimulatorEventBus();
	const [state, setState] = useState<State>({
		step: ActiveStep.SELECT,
		topic: null,
		pipelines: []
	});
	useActiveStep((step) => {
		if (step === ActiveStep.PREPARE_DATA) {
			once(SimulatorEventTypes.REPLY_START, (start: SimulateStart) => {
				let topic: Topic | null = null;
				let availablePipelines: Array<Pipeline> = [];
				if (start.startFrom === StartFrom.TOPIC) {
					topic = start.startTopic!;
					// eslint-disable-next-line
					availablePipelines = pipelines.filter(p => p.topicId == topic?.topicId);
				} else if (start.startFrom === StartFrom.PIPELINE) {
					availablePipelines = [start.startPipeline!];
					// eslint-disable-next-line
					topic = topics.find(t => t.topicId == pipelines[0].topicId)!;
				}
				setState({
					...state,
					step: ActiveStep.PREPARE_DATA,
					topic,
					pipelines: availablePipelines
				});
			}).fire(SimulatorEventTypes.ASK_START);
		} else {
			setState(state => ({...state, step}));
		}
	});

	return <SimulatorBodyPart collapsed={state.step !== ActiveStep.PREPARE_DATA}>
		<SimulatorBodyPartHeader>
			<SimulatorBodyPartHeaderTitle># 2. Prepare Data</SimulatorBodyPartHeaderTitle>
		</SimulatorBodyPartHeader>
		{state.step === ActiveStep.PREPARE_DATA
			? <PrepareDataBody topic={state.topic!} topics={topics} pipelines={pipelines}/>
			: null
		}
	</SimulatorBodyPart>;
};