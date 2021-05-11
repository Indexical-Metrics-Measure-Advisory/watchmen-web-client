import {Pipeline} from '../../../../services/tuples/pipeline-types';
import {Topic} from '../../../../services/tuples/topic-types';
import {
	SimulatorBodyPart,
	SimulatorBodyPartBody,
	SimulatorBodyPartHeader,
	SimulatorBodyPartHeaderTitle
} from '../widgets';
import React, {useState} from 'react';
import {ActiveStep} from '../state/types';
import {useActiveStep} from '../use-active-step';

interface State {
	step: ActiveStep;
}

export const Result = (props: {
	pipelines: Array<Pipeline>;
	topics: Array<Topic>;
}) => {
	const [state, setState] = useState<State>({
		step: ActiveStep.SELECT
	});
	useActiveStep((step) => setState(state => ({...state, step})));

	return <SimulatorBodyPart collapsed={state.step !== ActiveStep.RESULT}>
		<SimulatorBodyPartHeader>
			<SimulatorBodyPartHeaderTitle># 4. Result</SimulatorBodyPartHeaderTitle>
		</SimulatorBodyPartHeader>
		{state.step === ActiveStep.RESULT
			? <SimulatorBodyPartBody>
			</SimulatorBodyPartBody>
			: null
		}
	</SimulatorBodyPart>;
};