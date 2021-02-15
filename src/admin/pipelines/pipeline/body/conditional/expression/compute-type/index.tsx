import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { MouseEvent, useRef, useState } from 'react';
import { ICON_EDIT } from '../../../../../../../basic-widgets/constants';
import { useCollapseFixedThing } from '../../../../../../../basic-widgets/utils';
import { ComputedParameter, ParameterComputeType } from '../../../../../../../services/tuples/factor-calculator-types';
import { defendParameters } from '../../data-utils';
import { useParameterEventBus } from '../parameter/parameter-event-bus';
import { ParameterEventTypes } from '../parameter/parameter-event-bus-types';
import {
	PARAMETER_TYPE_DROPDOWN_HEIGHT,
	ParameterComputeTypeContainer,
	ParameterComputeTypeDropdown,
	ParameterComputeTypeIcon,
	ParameterComputeTypeLabel,
	ParameterComputeTypeOption
} from './widgets';

const AvailableComputeTypes = [
	ParameterComputeType.ADD,
	ParameterComputeType.SUBTRACT,
	ParameterComputeType.MULTIPLY,
	ParameterComputeType.DIVIDE,
	ParameterComputeType.MODULUS,
	ParameterComputeType.YEAR_OF,
	ParameterComputeType.HALF_YEAR_OF,
	ParameterComputeType.QUARTER_OF,
	ParameterComputeType.MONTH_OF,
	ParameterComputeType.WEEK_OF_YEAR,
	ParameterComputeType.WEEK_OF_MONTH,
	ParameterComputeType.DAY_OF_MONTH,
	ParameterComputeType.DAY_OF_WEEK
];

const ParameterComputeTypeLabels: { [key in ParameterComputeType]: string } = {
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
	[ParameterComputeType.DAY_OF_WEEK]: 'Day of Week'
};


interface DropdownState {
	visible: boolean;
	top?: number;
	bottom?: number;
	left: number;
}

export const ParameterComputeTypeEditor = (props: { parameter: ComputedParameter }) => {
	const { parameter } = props;

	const containerRef = useRef<HTMLDivElement>(null);
	const { fire } = useParameterEventBus();
	const [ state, setState ] = useState<DropdownState>({ visible: false, top: 0, left: 0 });
	useCollapseFixedThing({ containerRef, hide: () => setState({ visible: false, top: 0, left: 0 }) });

	const onTypeClicked = () => {
		if (!containerRef.current) {
			return;
		}

		const { top, left, height } = containerRef.current.getBoundingClientRect();
		if (top + height + 4 + PARAMETER_TYPE_DROPDOWN_HEIGHT > window.innerHeight) {
			// at top
			setState({ visible: true, bottom: window.innerHeight - top + 4, left });
		} else {
			setState({ visible: true, top: top + height + 4, left });
		}
	};
	const onComputeTypeClick = (computeType: ParameterComputeType) => (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();

		if (parameter.type === computeType) {
			return;
		} else {
			parameter.type = computeType;
			defendParameters(parameter);
			fire(ParameterEventTypes.COMPUTE_TYPE_CHANGED, parameter);
			setState({ visible: false, top: 0, left: 0 });
		}
	};

	return <ParameterComputeTypeContainer onClick={onTypeClicked} ref={containerRef}>
		<ParameterComputeTypeLabel>{ParameterComputeTypeLabels[parameter.type]}</ParameterComputeTypeLabel>
		<ParameterComputeTypeIcon>
			<FontAwesomeIcon icon={ICON_EDIT}/>
		</ParameterComputeTypeIcon>
		<ParameterComputeTypeDropdown {...state}>
			{AvailableComputeTypes.map(computeType => {
				return <ParameterComputeTypeOption selected={computeType === parameter.type}
				                                   onClick={onComputeTypeClick(computeType)}
				                                   key={computeType}>
					{ParameterComputeTypeLabels[computeType]}
				</ParameterComputeTypeOption>;
			})}
		</ParameterComputeTypeDropdown>
	</ParameterComputeTypeContainer>;
};