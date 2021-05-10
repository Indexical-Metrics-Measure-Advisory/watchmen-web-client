import React, {useEffect, useState} from 'react';
import {PageHeaderHolder} from '../../../basic-widgets/page-header';
import {HeaderFromPipelineButton} from './header-from-pipeline-button';
import {HeaderFromTopicButton} from './header-from-topic-button';
import {PageHeaderButtons} from '../../../basic-widgets/page-header-buttons';
import {Header} from '../../pipelines/catalog/widgets';
import {SimulatorHeaderTitle} from './title';
import {useSimulatorEventBus} from '../simulator-event-bus';
import {SimulatorEventTypes} from '../simulator-event-bus-types';

const SimulatorHeaderButtons = () => {
	const {on, off} = useSimulatorEventBus();
	const [visible, setVisible] = useState(true);
	useEffect(() => {
		const onStart = () => setVisible(false);
		on(SimulatorEventTypes.START_PIPELINE, onStart);
		on(SimulatorEventTypes.START_TOPIC, onStart);
		return () => {
			off(SimulatorEventTypes.START_PIPELINE, onStart);
			off(SimulatorEventTypes.START_TOPIC, onStart);
		};
	}, [on, off]);

	if (!visible) {
		return null;
	}

	return <PageHeaderButtons>
		<HeaderFromPipelineButton/>
		<HeaderFromTopicButton/>
	</PageHeaderButtons>;
};

export const SimulatorHeader = () => {
	return <Header>
		<PageHeaderHolder>
			<SimulatorHeaderTitle/>
			<SimulatorHeaderButtons/>
		</PageHeaderHolder>
	</Header>;
};
