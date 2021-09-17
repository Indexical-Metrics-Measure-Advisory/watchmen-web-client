import {ComputedParameter, ParameterComputeType} from '@/services/data/tuples/factor-calculator-types';
import {defendComputedParameter} from '@/services/data/tuples/parameter-utils';
import {MouseEvent, useRef, useState} from 'react';
import {useCollapseFixedThing} from '../../basic/utils';
import {useParameterEventBus} from '../parameter-event-bus';
import {ParameterEventTypes} from '../parameter-event-bus-types';
import {PARAMETER_TYPE_DROPDOWN_HEIGHT} from './widgets';

export interface ComputeTypeDropdownState {
	visible: boolean;
	top?: number;
	bottom?: number;
	left: number;
}

export const useComputeType = (parameter: ComputedParameter) => {
	// noinspection TypeScriptValidateTypes
	const containerRef = useRef<HTMLDivElement>(null);
	const {fire} = useParameterEventBus();
	const [dropdownState, setDropdownState] = useState<ComputeTypeDropdownState>({visible: false, top: 0, left: 0});
	useCollapseFixedThing({
		containerRef,
		visible: dropdownState.visible,
		hide: () => setDropdownState({visible: false, top: 0, left: 0})
	});

	const onTypeClicked = () => {
		if (!containerRef.current) {
			return;
		}

		const {top, left, height} = containerRef.current.getBoundingClientRect();
		if (top + height + 4 + PARAMETER_TYPE_DROPDOWN_HEIGHT > window.innerHeight) {
			// at top
			setDropdownState({visible: true, bottom: window.innerHeight - top + 4, left});
		} else {
			setDropdownState({visible: true, top: top + height + 4, left});
		}
	};
	const onComputeTypeClicked = (computeType: ParameterComputeType) => (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();

		if (parameter.type === computeType) {
			return;
		} else {
			parameter.type = computeType;
			defendComputedParameter(parameter);
			fire(ParameterEventTypes.COMPUTE_TYPE_CHANGED, parameter);
			setDropdownState({visible: false, top: 0, left: 0});
		}
	};

	return {containerRef, dropdownState, onTypeClicked, onComputeTypeClicked};
};