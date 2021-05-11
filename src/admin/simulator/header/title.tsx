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
		const onPipelineStart = (pipeline: Pipeline | null) => {
			setName(pipeline ? getPipelineName(pipeline) : '');
		};
		const onTopicStart = (topic: Topic | null) => {
			setName(topic ? getTopicName(topic) : '');
		};
		on(SimulatorEventTypes.START_PIPELINE_CHANGED, onPipelineStart);
		on(SimulatorEventTypes.START_TOPIC_CHANGED, onTopicStart);
		return () => {
			off(SimulatorEventTypes.START_PIPELINE_CHANGED, onPipelineStart);
			off(SimulatorEventTypes.START_TOPIC_CHANGED, onTopicStart);
		};
	}, [on, off]);

	return <HeaderTitle>
		{name ? `Simulate from [${name}]` : 'Pipeline Simulator'}
	</HeaderTitle>;
};