import {
	AvailableComputeTypes,
	ComputedParameter,
	ParameterComputeType,
	ValueTypes
} from '@/services/data/tuples/factor-calculator-types';
import {isComputeTypeValid} from '@/services/data/tuples/factor-calculator-utils';
import {ICON_EDIT} from '@/widgets/basic/constants';
import {useComputeType} from '@/widgets/parameter/compute-type/use-compute-type';
import {ParameterComputeTypeDropdown, ParameterComputeTypeOption} from '@/widgets/parameter/compute-type/widgets';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {ParameterComputeTypeContainer, ParameterComputeTypeIcon, ParameterComputeTypeLabel} from './widgets';

const ParameterComputeTypeLabels: Record<ParameterComputeType, string> = {
	[ParameterComputeType.NONE]: 'None',
	[ParameterComputeType.ADD]: 'Add',
	[ParameterComputeType.SUBTRACT]: 'Subtract',
	[ParameterComputeType.MULTIPLY]: 'Multiply',
	[ParameterComputeType.DIVIDE]: 'Divide',
	[ParameterComputeType.MODULUS]: 'Modulus',
	[ParameterComputeType.YEAR_OF]: 'Year of',
	[ParameterComputeType.HALF_YEAR_OF]: 'Half Year of',
	[ParameterComputeType.QUARTER_OF]: 'Quarter of',
	[ParameterComputeType.MONTH_OF]: 'Month of',
	[ParameterComputeType.WEEK_OF_YEAR]: 'Week of Year',
	[ParameterComputeType.WEEK_OF_MONTH]: 'Week of Month',
	[ParameterComputeType.DAY_OF_MONTH]: 'Day of Month',
	[ParameterComputeType.DAY_OF_WEEK]: 'Day of Week',
	[ParameterComputeType.CASE_THEN]: 'Case Then'
};

export const ParameterComputeTypeEditor = (props: {
	parameter: ComputedParameter;
	expectedTypes: ValueTypes;
}) => {
	const {parameter, expectedTypes} = props;

	const {
		containerRef, dropdownState,
		onTypeClicked, onComputeTypeClicked
	} = useComputeType(parameter);

	const computeTypeValid = isComputeTypeValid({
		computeType: parameter.type, expectedTypes, reasons: () => {
			// don't need reason here, ignored
		}
	});

	return <ParameterComputeTypeContainer onClick={onTypeClicked} valid={computeTypeValid}
	                                      ref={containerRef}>
		<ParameterComputeTypeLabel>{ParameterComputeTypeLabels[parameter.type]}</ParameterComputeTypeLabel>
		<ParameterComputeTypeIcon>
			<FontAwesomeIcon icon={ICON_EDIT}/>
		</ParameterComputeTypeIcon>
		<ParameterComputeTypeDropdown {...dropdownState}>
			{AvailableComputeTypes.map(computeType => {
				return <ParameterComputeTypeOption selected={computeType === parameter.type}
				                                   onClick={onComputeTypeClicked(computeType)}
				                                   key={computeType}>
					{ParameterComputeTypeLabels[computeType]}
				</ParameterComputeTypeOption>;
			})}
		</ParameterComputeTypeDropdown>
	</ParameterComputeTypeContainer>;
};