import {AvailableComputeTypes, ComputedParameter} from '@/services/data/tuples/factor-calculator-types';
import {ICON_EDIT} from '@/widgets/basic/constants';
import {useComputeType} from '@/widgets/parameter/compute-type/use-compute-type';
import {ParameterComputeTypeDropdown, ParameterComputeTypeOption} from '@/widgets/parameter/compute-type/widgets';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {ParameterComputeTypeLabels} from '../constants';
import {ParameterComputeTypeContainer, ParameterComputeTypeIcon, ParameterComputeTypeLabel} from './widgets';

// const TidyComputeTypes = AvailableComputeTypes.filter(type => type !== ParameterComputeType.CASE_THEN);

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