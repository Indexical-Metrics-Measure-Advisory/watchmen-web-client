import {Pipeline} from '../../../../services/tuples/pipeline-types';
import {Topic} from '../../../../services/tuples/topic-types';
import {
	SimulatorBodyPart,
	SimulatorBodyPartHeader,
	SimulatorBodyPartHeaderButtons,
	SimulatorBodyPartHeaderTitle
} from '../widgets';
import React, {useEffect, useState} from 'react';
import {ActiveStep, SimulateStart, StartFrom} from '../state/types';
import {useActiveStep} from '../use-active-step';
import {useSimulatorEventBus} from '../../simulator-event-bus';
import {SimulatorEventTypes} from '../../simulator-event-bus-types';
import {TopicBlock} from './topic-block';
import {PrepareDataBodyPartBody, PrepareDataBodyPartRow, TopicBlockType} from './widgets';
import {buildTopicNode} from './utils';
import {Button} from '../../../../basic-widgets/button';
import {ButtonInk} from '../../../../basic-widgets/types';

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

	const {once, on, off, fire} = useSimulatorEventBus();
	const [state, setState] = useState<State>({
		step: ActiveStep.SELECT,
		topic: null,
		pipelines: []
	});
	useEffect(() => {
		const onChange = () => {
			setState(state => ({...state, topic: null, pipelines: []}));
		};
		on(SimulatorEventTypes.START_TOPIC_CHANGED, onChange);
		on(SimulatorEventTypes.START_PIPELINE_CHANGED, onChange);
		return () => {
			off(SimulatorEventTypes.START_TOPIC_CHANGED, onChange);
			off(SimulatorEventTypes.START_PIPELINE_CHANGED, onChange);
		};
	}, [on, off]);
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

	const onActiveClicked = () => {
		fire(SimulatorEventTypes.ACTIVE_STEP_CHANGED, ActiveStep.PREPARE_DATA);
	};

	return <SimulatorBodyPart collapsed={state.step !== ActiveStep.PREPARE_DATA}>
		<SimulatorBodyPartHeader>
			<SimulatorBodyPartHeaderTitle># 2. Prepare Data</SimulatorBodyPartHeaderTitle>
			{state.step !== ActiveStep.PREPARE_DATA && state.step !== ActiveStep.SELECT && state.topic != null
				? <SimulatorBodyPartHeaderButtons>
					<Button ink={ButtonInk.PRIMARY} onClick={onActiveClicked}>Verify Prepared Data</Button>
				</SimulatorBodyPartHeaderButtons>
				: null
			}
		</SimulatorBodyPartHeader>
		{state.step === ActiveStep.PREPARE_DATA
			? <PrepareDataBody topic={state.topic!} topics={topics} pipelines={pipelines}/>
			: null
		}
	</SimulatorBodyPart>;
};