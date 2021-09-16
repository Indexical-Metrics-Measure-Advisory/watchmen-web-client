import {useForceUpdate} from '@/basic-widgets/utils';
import React, {ChangeEvent} from 'react';
import {VariableInput, VariableInputContainer, VariableInputLabel} from './widgets';
import {PipelineStageUnit} from '@/services/tuples/pipeline-stage-unit-types';
import {useUnitEventBus} from '../unit-event-bus';
import {UnitEventTypes} from '../unit-event-bus-types';

export const Variable = (props: { unit: PipelineStageUnit }) => {
	const {unit} = props;

	const {fire} = useUnitEventBus();
	const forceUpdate = useForceUpdate();
	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
		if (value === unit.loopVariableName) {
			return;
		}

		unit.loopVariableName = value;
		forceUpdate();
		fire(UnitEventTypes.LOOP_VARIABLE_CHANGED, unit);
	};
	return <VariableInputContainer>
		<VariableInputLabel>{unit.loopVariableName}</VariableInputLabel>
		<VariableInput value={unit.loopVariableName || ''} onChange={onChange}
		               placeholder="Loop actions with given variable..."/>
	</VariableInputContainer>;
};