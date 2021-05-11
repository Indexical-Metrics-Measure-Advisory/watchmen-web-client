import {Pipeline} from '../../../../services/tuples/pipeline-types';
import {Topic} from '../../../../services/tuples/topic-types';
import {
	SimulatorBodyPart,
	SimulatorBodyPartHeader,
	SimulatorBodyPartHeaderTitle,
	SimulatorBodyPartLabel,
	SimulatorBodyPartRow
} from '../widgets';
import React, {useState} from 'react';
import {ActiveStep, RunType, SimulateStart, StartFrom} from '../state/types';
import {useActiveStep} from '../use-active-step';
import {Dropdown} from '../../../../basic-widgets/dropdown';
import {DropdownOption} from '../../../../basic-widgets/types';
import {useSimulatorEventBus} from '../../simulator-event-bus';
import {SimulatorEventTypes} from '../../simulator-event-bus-types';
import {TopicBlock} from './topic-block';
import {PrepareDataBodyPartBody, PrepareDataBodyPartRow, TopicBlockType} from './widgets';

interface State {
	step: ActiveStep;
	runType: RunType;
	topic: Topic | null;
	pipelines: Array<Pipeline>;
}

const RunTypeOptions: Array<DropdownOption> = [
	{value: RunType.ONE, label: 'Selected One'},
	{value: RunType.ALL, label: 'All'}
];

export const PrepareData = (props: {
	pipelines: Array<Pipeline>;
	topics: Array<Topic>;
}) => {
	const {pipelines, topics} = props;

	const {once} = useSimulatorEventBus();
	const [state, setState] = useState<State>({
		step: ActiveStep.SELECT,
		runType: RunType.ONE,
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

	const onRunTypeChanged = (option: DropdownOption) => {
		const type = option.value as RunType;
		setState(state => ({...state, runType: type}));
	};

	const topicsMap = topics.reduce((map, topic) => {
		map.set(topic.topicId, topic);
		return map;
	}, new Map<string, Topic>());

	return <SimulatorBodyPart collapsed={state.step !== ActiveStep.PREPARE_DATA}>
		<SimulatorBodyPartHeader>
			<SimulatorBodyPartHeaderTitle># 2. Prepare Data</SimulatorBodyPartHeaderTitle>
		</SimulatorBodyPartHeader>
		{state.step === ActiveStep.PREPARE_DATA
			? <PrepareDataBodyPartBody>
				<SimulatorBodyPartRow>
					<SimulatorBodyPartLabel>Run Type</SimulatorBodyPartLabel>
					<Dropdown options={RunTypeOptions} value={state.runType}
					          onChange={onRunTypeChanged}/>
				</SimulatorBodyPartRow>
				<PrepareDataBodyPartRow>
					<TopicBlock topic={state.topic!} type={TopicBlockType.ROOT}
					            pipelines={pipelines} topics={topicsMap}/>
				</PrepareDataBodyPartRow>
			</PrepareDataBodyPartBody>
			: null
		}
	</SimulatorBodyPart>;
};