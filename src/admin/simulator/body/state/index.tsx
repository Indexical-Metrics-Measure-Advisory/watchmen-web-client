import {useEffect, useState} from 'react';
import {SimulatorState, StartFrom} from './types';
import {useSimulatorEventBus} from '../../simulator-event-bus';
import {SimulatorEventTypes} from '../../simulator-event-bus-types';
import {Pipeline} from '../../../../services/tuples/pipeline-types';
import {Topic} from '../../../../services/tuples/topic-types';

export const SimulatorStates = () => {
	const {on, off} = useSimulatorEventBus();
	const [, setState] = useState<SimulatorState>({
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
		on(SimulatorEventTypes.START_FROM_CHANGED, onStartFromChanged);
		on(SimulatorEventTypes.START_PIPELINE_CHANGED, onStartPipelineChanged);
		on(SimulatorEventTypes.START_TOPIC_CHANGED, onStartTopicChanged);
		return () => {
			off(SimulatorEventTypes.START_FROM_CHANGED, onStartFromChanged);
			off(SimulatorEventTypes.START_PIPELINE_CHANGED, onStartPipelineChanged);
			off(SimulatorEventTypes.START_TOPIC_CHANGED, onStartTopicChanged);
		};
	}, [on, off]);

	return <></>;
};