import React, {useState} from 'react';
import {
	SimulatorBodyPart,
	SimulatorBodyPartBody,
	SimulatorBodyPartHeader,
	SimulatorBodyPartHeaderTitle
} from '../widgets';
import {Dropdown} from '../../../../basic-widgets/dropdown';
import {DropdownOption} from '../../../../basic-widgets/types';
import {StartFromRow, StartFromRowLabel} from './widgets';
import {SimulatorState, StartFrom} from '../state/types';
import {useSimulatorEventBus} from '../../simulator-event-bus';
import {SimulatorEventTypes} from '../../simulator-event-bus-types';
import {Pipeline} from '../../../../services/tuples/pipeline-types';
import {Topic} from '../../../../services/tuples/topic-types';
import {getPipelineName, getTopicName} from '../../utils';

type State = Pick<SimulatorState, 'startFrom' | 'startPipeline' | 'startTopic'>

const StartFromOptions: Array<DropdownOption> = [
	{value: StartFrom.PIPELINE, label: 'Pipeline'},
	{value: StartFrom.TOPIC, label: 'Topic'}
];

export const Select = (props: {
	pipelines: Array<Pipeline>;
	topics: Array<Topic>;
}) => {
	const {pipelines, topics} = props;

	const {fire} = useSimulatorEventBus();
	const [state, setState] = useState<State>({
		startFrom: StartFrom.PIPELINE,
		startPipeline: null,
		startTopic: null
	});

	const onStartFromChanged = (option: DropdownOption) => {
		const from = option.value as StartFrom;
		setState({startFrom: from, startPipeline: null, startTopic: null});
		fire(SimulatorEventTypes.START_FROM_CHANGED, from);
	};
	const onPipelineChanged = (option: DropdownOption) => {
		const pipeline = option.value as Pipeline;
		setState(state => {
			return {...state, startPipeline: pipeline, startTopic: null};
		});
		fire(SimulatorEventTypes.START_PIPELINE_CHANGED, pipeline);
	};
	const onTopicChanged = (option: DropdownOption) => {
		const topic = option.value as Topic;
		setState(state => {
			return {...state, startPipeline: null, startTopic: topic};
		});
		fire(SimulatorEventTypes.START_TOPIC_CHANGED, topic);
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

	return <SimulatorBodyPart>
		<SimulatorBodyPartHeader>
			<SimulatorBodyPartHeaderTitle>#1. Select Start Point</SimulatorBodyPartHeaderTitle>
		</SimulatorBodyPartHeader>
		<SimulatorBodyPartBody>
			<StartFromRow>
				<StartFromRowLabel>Start</StartFromRowLabel>
				<Dropdown options={StartFromOptions} value={state.startFrom}
				          onChange={onStartFromChanged}/>
				<StartFromRowLabel>From</StartFromRowLabel>
				{state.startFrom === StartFrom.PIPELINE
					? <Dropdown options={pipelineOptions} value={state.startPipeline || ''}
					            onChange={onPipelineChanged}/>
					: <Dropdown options={topicOptions} value={state.startTopic || ''}
					            onChange={onTopicChanged}/>
				}
			</StartFromRow>
		</SimulatorBodyPartBody>
	</SimulatorBodyPart>;
};