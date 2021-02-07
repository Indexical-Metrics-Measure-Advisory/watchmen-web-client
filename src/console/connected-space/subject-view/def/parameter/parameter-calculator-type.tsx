import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ICON_EDIT } from '../../../../../basic-widgets/constants';
import { Lang } from '../../../../../langs';
import { ComputedParameter, ParameterCalculatorType } from '../../../../../services/tuples/factor-calculator-types';
import { ParameterCalculatorTypeContainer, ParameterCalculatorTypeIcon, ParameterCalculatorTypeLabel } from './widgets';

const Labels: { [key in ParameterCalculatorType]: string } = {
	[ParameterCalculatorType.NONE]: Lang.PARAMETER.NONE,
	[ParameterCalculatorType.ADD]: Lang.PARAMETER.ADD,
	[ParameterCalculatorType.SUBTRACT]: Lang.PARAMETER.SUBTRACT,
	[ParameterCalculatorType.MULTIPLY]: Lang.PARAMETER.MULTIPLY,
	[ParameterCalculatorType.DIVIDE]: Lang.PARAMETER.DIVIDE,
	[ParameterCalculatorType.MODULUS]: Lang.PARAMETER.MODULUS,
	[ParameterCalculatorType.YEAR_OF]: Lang.PARAMETER.YEAR_OF,
	[ParameterCalculatorType.HALF_YEAR_OF]: Lang.PARAMETER.HALF_YEAR_OF,
	[ParameterCalculatorType.QUARTER_OF]: Lang.PARAMETER.QUARTER_OF,
	[ParameterCalculatorType.MONTH_OF]: Lang.PARAMETER.MONTH_OF,
	[ParameterCalculatorType.WEEK_OF_YEAR]: Lang.PARAMETER.WEEK_OF_YEAR,
	[ParameterCalculatorType.WEEK_OF_MONTH]: Lang.PARAMETER.WEEK_OF_MONTH,
	[ParameterCalculatorType.DAY_OF_MONTH]: Lang.PARAMETER.DAY_OF_MONTH,
	[ParameterCalculatorType.DAY_OF_WEEK]: Lang.PARAMETER.DAY_OF_WEEK
};

export const ParameterCalculatorTypeEdit = (props: { parameter: ComputedParameter }) => {
	const { parameter } = props;

	return <ParameterCalculatorTypeContainer>
		<ParameterCalculatorTypeLabel>{Labels[parameter.type]}</ParameterCalculatorTypeLabel>
		<ParameterCalculatorTypeIcon>
			<FontAwesomeIcon icon={ICON_EDIT}/>
		</ParameterCalculatorTypeIcon>
	</ParameterCalculatorTypeContainer>;
};