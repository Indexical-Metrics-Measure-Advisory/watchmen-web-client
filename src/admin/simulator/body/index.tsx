import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {Topic} from '@/services/data/tuples/topic-types';
import React from 'react';
import {PrepareData} from './prepare-data';
import {RunningPlan} from './run';
import {Select} from './select';
import {SimulatorStates} from './state';
import {SimulatorBodyContainer} from './widgets';

export const SimulatorBody = (props: {
	pipelines: Array<Pipeline>;
	topics: Array<Topic>;
}) => {
	const {pipelines, topics} = props;

	return <SimulatorBodyContainer>
		<SimulatorStates/>
		<Select pipelines={pipelines} topics={topics}/>
		<PrepareData pipelines={pipelines} topics={topics}/>
		<RunningPlan pipelines={pipelines} topics={topics}/>
	</SimulatorBodyContainer>;
};