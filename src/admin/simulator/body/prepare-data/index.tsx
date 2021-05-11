import {Pipeline} from '../../../../services/tuples/pipeline-types';
import {Topic} from '../../../../services/tuples/topic-types';
import {
	SimulatorBodyPart,
	SimulatorBodyPartBody,
	SimulatorBodyPartHeader,
	SimulatorBodyPartHeaderTitle,
	SimulatorBodyPartLabel,
	SimulatorBodyPartRow
} from '../widgets';
import React, {useState} from 'react';
import {ActiveStep, RunType} from '../state/types';
import {useActiveStep} from '../use-active-step';
import {Dropdown} from '../../../../basic-widgets/dropdown';
import {DropdownOption} from '../../../../basic-widgets/types';

interface State {
	step: ActiveStep;
	runType: RunType
}

const RunTypeOptions: Array<DropdownOption> = [
	{value: RunType.ONE, label: 'Selected One'},
	{value: RunType.ALL, label: 'All'}
];

export const PrepareData = (props: {
	pipelines: Array<Pipeline>;
	topics: Array<Topic>;
}) => {
	const [state, setState] = useState<State>({
		step: ActiveStep.SELECT,
		runType: RunType.ONE
	});
	useActiveStep((step) => {
		setState(state => ({...state, step}));
	});

	const onRunTypeChanged = (option: DropdownOption) => {
		const type = option.value as RunType;
		setState(state => ({...state, runType: type}));
	};

	return <SimulatorBodyPart collapsed={state.step !== ActiveStep.PREPARE_DATA}>
		<SimulatorBodyPartHeader>
			<SimulatorBodyPartHeaderTitle># 2. Prepare Data</SimulatorBodyPartHeaderTitle>
		</SimulatorBodyPartHeader>
		{state.step === ActiveStep.PREPARE_DATA
			? <SimulatorBodyPartBody>
				<SimulatorBodyPartRow>
					<SimulatorBodyPartLabel>Run Type</SimulatorBodyPartLabel>
					<Dropdown options={RunTypeOptions} value={state.runType}
					          onChange={onRunTypeChanged}/>
				</SimulatorBodyPartRow>
				<SimulatorBodyPartRow>
				</SimulatorBodyPartRow>
			</SimulatorBodyPartBody>
			: null
		}
	</SimulatorBodyPart>;
};