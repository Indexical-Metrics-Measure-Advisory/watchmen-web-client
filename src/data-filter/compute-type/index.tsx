import {ICON_EDIT} from '@/basic-widgets/constants';
import {useComputeType} from '@/data-filter/compute-type/use-compute-type';
import {AvailableComputeTypes, ComputedParameter} from '@/services/tuples/factor-calculator-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {ParameterComputeTypeLabels} from '../constants';
import {
	ParameterComputeTypeContainer,
	ParameterComputeTypeDropdown,
	ParameterComputeTypeIcon,
	ParameterComputeTypeLabel,
	ParameterComputeTypeOption
} from './widgets';

export const ParameterComputeTypeEdit = (props: { parameter: ComputedParameter }) => {
	const {parameter} = props;

	const {
		containerRef, dropdownState,
		onTypeClicked, onComputeTypeClicked
	} = useComputeType(parameter);

	return <ParameterComputeTypeContainer onClick={onTypeClicked} ref={containerRef}>
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