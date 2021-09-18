import {ComputedParameter, Parameter} from '@/services/data/tuples/factor-calculator-types';
import {canAddMoreParameter} from '@/services/data/tuples/parameter-utils';
import {ICON_ADD} from '@/widgets/basic/constants';
import {Lang} from '@/widgets/langs';
import {useSubParamAdd} from '@/widgets/parameter/sub-param/use-sub-param-add';
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