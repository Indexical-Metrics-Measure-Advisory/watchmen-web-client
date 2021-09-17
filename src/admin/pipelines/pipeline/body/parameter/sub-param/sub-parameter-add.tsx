import {ICON_ADD} from '@/basic-widgets/constants';
import {useSubParamAdd} from '@/data-filter/sub-param/use-sub-param-add';
import {ComputedParameter, Parameter} from '@/services/tuples/factor-calculator-types';
import {canAddMoreParameter} from '@/services/tuples/parameter-utils';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {ParameterAddButton, ParameterAddContainer} from './widgets';

export const SubParameterAdd = (props: {
	parentParameter: ComputedParameter;
	onAdded: (parameter: Parameter) => void;
}) => {
	const {parentParameter, onAdded} = props;

	const onAddClicked = useSubParamAdd(parentParameter, onAdded, 'Cannot add more because of reach maximum parameter(s).');

	const canAdd = canAddMoreParameter(parentParameter);
	if (!canAdd) {
		return null;
	}

	return <ParameterAddContainer>
		<ParameterAddButton onClick={onAddClicked}>
			<FontAwesomeIcon icon={ICON_ADD}/>
			<span>Add Parameter</span>
		</ParameterAddButton>
	</ParameterAddContainer>;
};