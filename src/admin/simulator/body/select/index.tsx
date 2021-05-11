import React, {useState} from 'react';
import {
	SimulatorBodyPart,
	SimulatorBodyPartBody,
	SimulatorBodyPartHeader,
	SimulatorBodyPartHeaderTitle,
	SimulatorBodyPartLabel,
	SimulatorBodyPartRow
} from '../widgets';
import {Dropdown} from '../../../../basic-widgets/dropdown';
import {ButtonInk, DropdownOption} from '../../../../basic-widgets/types';
import {ActiveStep, SimulatorState, StartFrom} from '../state/types';
import {useSimulatorEventBus} from '../../simulator-event-bus';
import {SimulatorEventTypes} from '../../simulator-event-bus-types';
import {Pipeline} from '../../../../services/tuples/pipeline-types';
import {Topic} from '../../../../services/tuples/topic-types';
import {getPipelineName, getTopicName} from '../../utils';
import {Button} from '../../../../basic-widgets/button';
import {useEventBus} from '../../../../events/event-bus';
import {EventTypes} from '../../../../events/types';
import {AlertLabel} from '../../../../alert/widgets';
import {useActiveStep} from '../use-active-step';

type State = Pick<SimulatorState, 'step' | 'startFrom' | 'startPipeline' | 'startTopic'>

const StartFromOptions: Array<DropdownOption> = [
	{value: StartFrom.PIPELINE, label: 'Pipeline'},
	{value: StartFrom.TOPIC, label: 'Topic'}
];

export const Select = (props: {
	pipelines: Array<Pipeline>;
	topics: Array<Topic>;
}) => {
	const {pipelines, topics} = props;

	const {fire: fireGlobal} = useEventBus();
	const {fire} = useSimulatorEventBus();
	const [state, setState] = useState<State>({
		step: ActiveStep.SELECT,
		startFrom: StartFrom.PIPELINE,
		startPipeline: null,
		startTopic: null
	});
	useActiveStep((step) => setState(state => ({...state, step})));

	const onStartFromChanged = (option: DropdownOption) => {
		const from = option.value as StartFrom;
		setState({step: ActiveStep.SELECT, startFrom: from, startPipeline: null, startTopic: null});
		fire(SimulatorEventTypes.START_FROM_CHANGED, from);
	};
	const onPipelineChanged = (option: DropdownOption) => {
		const pipeline = option.value === '' ? null : option.value as Pipeline;
		setState(state => ({...state, startPipeline: pipeline, startTopic: null}));
		fire(SimulatorEventTypes.START_PIPELINE_CHANGED, pipeline);
	};
	const onTopicChanged = (option: DropdownOption) => {
		const topic = option.value === '' ? null : option.value as Topic;
		setState(state => ({...state, startPipeline: null, startTopic: topic}));
		fire(SimulatorEventTypes.START_TOPIC_CHANGED, topic);
	};
	const onGoClicked = () => {
		if (state.startTopic == null && state.startPipeline == null) {
			fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>
				Please select a {state.startFrom === StartFrom.TOPIC ? 'topic' : 'pipeline'}.
			</AlertLabel>);
			return;
		}
		setState(state => ({...state, step: ActiveStep.PREPARE_DATA}));
		fire(SimulatorEventTypes.ACTIVE_STEP_CHANGED, ActiveStep.PREPARE_DATA);
	};

	const pipelineOptions = [
		{value: '', label: 'Please select...', key: ''},
		...pipelines.map(p => {
			return {value: p, label: getPipelineName(p), key: p.pipelineId};
		})
	];
	const topicOptions = [
		{value: '', label: 'Please select...', key: ''},
		...topics.map(t => {
			return {value: t, label: getTopicName(t), key: t.topicId};
		})
	];

	let title = '# 1. Select Start Point';
	if (state.step !== ActiveStep.SELECT) {
		if (state.startFrom === StartFrom.PIPELINE && state.startPipeline) {
			title = `# 1. Start from [${getPipelineName(state.startPipeline)}]`;
		} else if (state.startFrom === StartFrom.TOPIC && state.startTopic) {
			title = `# 1. Start from [${getTopicName(state.startTopic)}]`;
		}
	}

	return <SimulatorBodyPart collapsed={state.step !== ActiveStep.SELECT}>
		<SimulatorBodyPartHeader>
			<SimulatorBodyPartHeaderTitle>{title}</SimulatorBodyPartHeaderTitle>
		</SimulatorBodyPartHeader>
		{state.step === ActiveStep.SELECT
			? <SimulatorBodyPartBody>
				<SimulatorBodyPartRow>
					<SimulatorBodyPartLabel>Start</SimulatorBodyPartLabel>
					<Dropdown options={StartFromOptions} value={state.startFrom}
					          onChange={onStartFromChanged}/>
					<SimulatorBodyPartLabel>From</SimulatorBodyPartLabel>
					{state.startFrom === StartFrom.PIPELINE
						? <Dropdown options={pipelineOptions} value={state.startPipeline || ''}
						            onChange={onPipelineChanged}/>
						: <Dropdown options={topicOptions} value={state.startTopic || ''}
						            onChange={onTopicChanged}/>
					}
					<Button ink={ButtonInk.PRIMARY} onClick={onGoClicked}>Next</Button>
				</SimulatorBodyPartRow>
			</SimulatorBodyPartBody>
			: null
		}
	</SimulatorBodyPart>;
};