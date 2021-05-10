import {HeaderTitle} from '../../pipelines/catalog/widgets';
import React, {useEffect, useState} from 'react';
import {useSimulatorEventBus} from '../simulator-event-bus';
import {Pipeline} from '../../../services/tuples/pipeline-types';
import {getPipelineName, getTopicName} from '../utils';
import {SimulatorEventTypes} from '../simulator-event-bus-types';
import {Topic} from '../../../services/tuples/topic-types';

export const SimulatorHeaderTitle = () => {
	const {on, off} = useSimulatorEventBus();
	const [name, setName] = useState('');
	useEffect(() => {
		const onPipelineStart = (pipeline: Pipeline) => {
			setName(getPipelineName(pipeline));
		};
		const onTopicStart = (topic: Topic) => {
			setName(getTopicName(topic));
		};
		on(SimulatorEventTypes.START_PIPELINE, onPipelineStart);
		on(SimulatorEventTypes.START_TOPIC, onTopicStart);
		return () => {
			off(SimulatorEventTypes.START_PIPELINE, onPipelineStart);
			off(SimulatorEventTypes.START_TOPIC, onTopicStart);
		};
	}, [on, off]);

	return <HeaderTitle>
		{name ? `Simulate from ${name}` : 'Pipeline Simulator'}
	</HeaderTitle>;
};