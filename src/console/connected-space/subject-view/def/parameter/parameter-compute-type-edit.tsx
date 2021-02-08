import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ICON_EDIT } from '../../../../../basic-widgets/constants';
import { Lang } from '../../../../../langs';
import { ComputedParameter, ParameterComputeType } from '../../../../../services/tuples/factor-calculator-types';
import { ParameterComputeTypeContainer, ParameterComputeTypeIcon, ParameterComputeTypeLabel } from './widgets';

const Labels: { [key in ParameterComputeType]: string } = {
	[ParameterComputeType.NONE]: Lang.PARAMETER.NONE,
	[ParameterComputeType.ADD]: Lang.PARAMETER.ADD,
	[ParameterComputeType.SUBTRACT]: Lang.PARAMETER.SUBTRACT,
	[ParameterComputeType.MULTIPLY]: Lang.PARAMETER.MULTIPLY,
	[ParameterComputeType.DIVIDE]: Lang.PARAMETER.DIVIDE,
	[ParameterComputeType.MODULUS]: Lang.PARAMETER.MODULUS,
	[ParameterComputeType.YEAR_OF]: Lang.PARAMETER.YEAR_OF,
	[ParameterComputeType.HALF_YEAR_OF]: Lang.PARAMETER.HALF_YEAR_OF,
	[ParameterComputeType.QUARTER_OF]: Lang.PARAMETER.QUARTER_OF,
	[ParameterComputeType.MONTH_OF]: Lang.PARAMETER.MONTH_OF,
	[ParameterComputeType.WEEK_OF_YEAR]: Lang.PARAMETER.WEEK_OF_YEAR,
	[ParameterComputeType.WEEK_OF_MONTH]: Lang.PARAMETER.WEEK_OF_MONTH,
	[ParameterComputeType.DAY_OF_MONTH]: Lang.PARAMETER.DAY_OF_MONTH,
	[ParameterComputeType.DAY_OF_WEEK]: Lang.PARAMETER.DAY_OF_WEEK
};

export const ParameterComputeTypeEdit = (props: { parameter: ComputedParameter }) => {
	const { parameter } = props;

	return <ParameterComputeTypeContainer>
		<ParameterComputeTypeLabel>{Labels[parameter.type]}</ParameterComputeTypeLabel>
		<ParameterComputeTypeIcon>
			<FontAwesomeIcon icon={ICON_EDIT}/>
		</ParameterComputeTypeIcon>
	</ParameterComputeTypeContainer>;
};