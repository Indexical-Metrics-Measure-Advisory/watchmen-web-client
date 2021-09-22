import {ComputedParameter, Parameter} from '@/services/data/tuples/factor-calculator-types';
import {canAddMoreParameter} from '@/services/data/tuples/parameter-utils';
import {ICON_ADD} from '@/widgets/basic/constants';
import {useSubParamAdd} from '@/widgets/parameter/sub-param/use-sub-param-add';
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