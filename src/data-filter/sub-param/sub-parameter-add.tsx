import {ICON_ADD} from '@/basic-widgets/constants';
import {useSubParamAdd} from '@/data-filter/sub-param/use-sub-param-add';
import {Lang} from '@/langs';
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

	const onAddClicked = useSubParamAdd(parentParameter, onAdded, Lang.CONSOLE.CONNECTED_SPACE.CAN_NOT_ADD_CHILD_INTO_COMPUTED);

	const canAdd = canAddMoreParameter(parentParameter);
	if (!canAdd) {
		return null;
	}

	return <ParameterAddContainer>
		<ParameterAddButton onClick={onAddClicked}>
			<FontAwesomeIcon icon={ICON_ADD}/>
			<span>{Lang.CONSOLE.CONNECTED_SPACE.ADD_COMPUTE_PARAMETER}</span>
		</ParameterAddButton>
	</ParameterAddContainer>;
};