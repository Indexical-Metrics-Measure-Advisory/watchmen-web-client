import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {AlertLabel} from '../../../../../../alert/widgets';
import {ICON_ADD} from '../../../../../../basic-widgets/constants';
import {useEventBus} from '../../../../../../events/event-bus';
import {EventTypes} from '../../../../../../events/types';
import {ComputedParameter, Parameter} from '../../../../../../services/tuples/factor-calculator-types';
import {canAddMoreParameter} from '../../../../../../services/tuples/factor-calculator-utils';
import {createTopicFactorParameter} from '../../../../data-utils';
import {ParameterAddButton, ParameterAddContainer} from './widgets';

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
				<AlertLabel>Cannot add more because of reach maximum parameter(s).</AlertLabel>);
		} else {
			const parameter = createTopicFactorParameter();
			parentParameter.parameters.push(parameter);
			onAdded(parameter);
		}
	};

	return <ParameterAddContainer>
		<ParameterAddButton onClick={onAddClicked}>
			<FontAwesomeIcon icon={ICON_ADD}/>
			<span>Add Parameter</span>
		</ParameterAddButton>
	</ParameterAddContainer>;
};