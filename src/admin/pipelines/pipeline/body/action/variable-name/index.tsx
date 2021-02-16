import React, { ChangeEvent } from 'react';
import { useForceUpdate } from '../../../../../../basic-widgets/utils';
import { MemoryWriter } from '../../../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import { useActionEventBus } from '../action-event-bus';
import { ActionEventTypes } from '../action-event-bus-types';
import { VariableNameInput, VariableNameInputContainer, VariableNameInputLabel } from './widgets';

export const VariableName = (props: { action: MemoryWriter }) => {
	const { action } = props;

	const { fire } = useActionEventBus();
	const forceUpdate = useForceUpdate();
	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		if (value === action.variableName) {
			return;
		}

		action.variableName = value;
		forceUpdate();
		fire(ActionEventTypes.ACTION_CONTENT_CHANGED, action);
	};
	return <VariableNameInputContainer>
		<VariableNameInputLabel>{action.variableName}</VariableNameInputLabel>
		<VariableNameInput value={action.variableName || ''} onChange={onChange}
		                   placeholder='Use "${}" to include variables or factor values.'/>
	</VariableNameInputContainer>;
};