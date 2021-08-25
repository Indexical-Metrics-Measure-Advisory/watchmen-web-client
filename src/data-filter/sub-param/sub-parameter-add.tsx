import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {AlertLabel} from '../../alert/widgets';
import {ICON_ADD} from '../../basic-widgets/constants';
import {useEventBus} from '../../events/event-bus';
import {EventTypes} from '../../events/types';
import {Lang} from '../../langs';
import {ComputedParameter, Parameter} from '../../services/tuples/factor-calculator-types';
import {ParameterAddButton, ParameterAddContainer} from './widgets';
import {canAddMoreParameter, createTopicFactorParameter} from '../../services/tuples/parameter-utils';

export const SubParameterAdd = (props: {
	parentParameter: ComputedParameter;
	onAdded: (parameter: Parameter) => void;
}) => {
	const {parentParameter, onAdded} = props;

	const {fire: fireGlobal} = useEventBus();

	const canAdd = canAddMoreParameter(parentParameter);
	if (!canAdd) {
		return null;
	}

	const onAddClicked = () => {
		const canAdd = canAddMoreParameter(parentParameter);
		if (!canAdd) {
			fireGlobal(EventTypes.SHOW_ALERT,
				<AlertLabel>{Lang.CONSOLE.CONNECTED_SPACE.CAN_NOT_ADD_CHILD_INTO_COMPUTED}</AlertLabel>);
		} else {
			const parameter = createTopicFactorParameter();
			parentParameter.parameters.push(parameter);
			onAdded(parameter);
		}
	};

	return <ParameterAddContainer>
		<ParameterAddButton onClick={onAddClicked}>
			<FontAwesomeIcon icon={ICON_ADD}/>
			<span>{Lang.CONSOLE.CONNECTED_SPACE.ADD_COMPUTE_PARAMETER}</span>
		</ParameterAddButton>
	</ParameterAddContainer>;
};