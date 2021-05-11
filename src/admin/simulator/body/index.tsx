import React from 'react';
import {SimulatorBodyContainer} from './widgets';
import {Select} from './select';
import {SimulatorStates} from './state';
import {Pipeline} from '../../../services/tuples/pipeline-types';
import {Topic} from '../../../services/tuples/topic-types';
import {PrepareData} from './prepare-data';
import {RunningPlan} from './run';
import {Result} from './result';

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
		<Result pipelines={pipelines} topics={topics}/>
	</SimulatorBodyContainer>;
};