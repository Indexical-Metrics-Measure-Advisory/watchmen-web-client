import {useEffect, useState} from 'react';
import {ActiveStep, SimulatorState, StartFrom} from './types';
import {useSimulatorEventBus} from '../../simulator-event-bus';
import {SimulatorEventTypes} from '../../simulator-event-bus-types';
import {Pipeline} from '../../../../services/tuples/pipeline-types';
import {Topic} from '../../../../services/tuples/topic-types';

export const SimulatorStates = () => {
	const {on, off, fire} = useSimulatorEventBus();
	const [state, setState] = useState<SimulatorState>({
		step: ActiveStep.SELECT,

		startFrom: StartFrom.PIPELINE,
		startTopic: null,
		startPipeline: null
	});

	useEffect(() => {
		const onStartFromChanged = (startFrom: StartFrom) => {
			setState(state => {
				return {...state, startFrom, startTopic: null, startPipeline: null};
			});
		};
		const onStartPipelineChanged = (pipeline: Pipeline | null) => {
			setState(state => {
				return {...state, startTopic: null, startPipeline: pipeline};
			});
		};
		const onStartTopicChanged = (topic: Topic | null) => {
			setState(state => {
				return {...state, startTopic: topic, startPipeline: null};
			});
		};
		const onActiveStepChanged = (step: ActiveStep) => {
			setState(state => ({...state, step}));
		};
		on(SimulatorEventTypes.START_FROM_CHANGED, onStartFromChanged);
		on(SimulatorEventTypes.START_PIPELINE_CHANGED, onStartPipelineChanged);
		on(SimulatorEventTypes.START_TOPIC_CHANGED, onStartTopicChanged);
		on(SimulatorEventTypes.ACTIVE_STEP_CHANGED, onActiveStepChanged);
		return () => {
			off(SimulatorEventTypes.START_FROM_CHANGED, onStartFromChanged);
			off(SimulatorEventTypes.START_PIPELINE_CHANGED, onStartPipelineChanged);
			off(SimulatorEventTypes.START_TOPIC_CHANGED, onStartTopicChanged);
			off(SimulatorEventTypes.ACTIVE_STEP_CHANGED, onActiveStepChanged);
		};
	}, [on, off]);

	useEffect(() => {
		const onAskStart = () => {
			fire(SimulatorEventTypes.REPLY_START, {
				startFrom: state.startFrom,
				startTopic: state.startTopic,
				startPipeline: state.startPipeline
			});
		};
		on(SimulatorEventTypes.ASK_START, onAskStart);
		return () => {
			off(SimulatorEventTypes.ASK_START, onAskStart);
		};
	}, [on, off, fire, state.startFrom, state.startTopic, state.startPipeline]);

	return <></>;
};