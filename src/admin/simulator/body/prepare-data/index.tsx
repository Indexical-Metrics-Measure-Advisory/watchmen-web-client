import {Pipeline} from '../../../../services/tuples/pipeline-types';
import {Topic} from '../../../../services/tuples/topic-types';
import {
	SimulatorBodyPart,
	SimulatorBodyPartBody,
	SimulatorBodyPartHeader,
	SimulatorBodyPartHeaderTitle
} from '../widgets';
import React, {useState} from 'react';
import {ActiveStep, SimulatorState, StartFrom} from '../state/types';
import {useActiveStep} from '../use-active-step';

type State = Pick<SimulatorState, 'step' | 'startFrom' | 'startPipeline' | 'startTopic'>

export const PrepareData = (props: {
	pipelines: Array<Pipeline>;
	topics: Array<Topic>;
}) => {
	const [state, setState] = useState<State>({
		step: ActiveStep.SELECT,
		startFrom: StartFrom.PIPELINE,
		startPipeline: null,
		startTopic: null
	});
	useActiveStep((step) => setState(state => ({...state, step})));

	return <SimulatorBodyPart collapsed={state.step !== ActiveStep.PREPARE_DATA}>
		<SimulatorBodyPartHeader collapsed={state.step !== ActiveStep.PREPARE_DATA}>
			<SimulatorBodyPartHeaderTitle># 2. Prepare Data</SimulatorBodyPartHeaderTitle>
		</SimulatorBodyPartHeader>
		<SimulatorBodyPartBody visible={state.step === ActiveStep.PREPARE_DATA}>
		</SimulatorBodyPartBody>
	</SimulatorBodyPart>;
};