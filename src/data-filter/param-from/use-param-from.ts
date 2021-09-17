import {useParameterEventBus} from '@/data-filter/parameter-event-bus';
import {ParameterEventTypes} from '@/data-filter/parameter-event-bus-types';
import {Parameter, ParameterKind} from '@/services/tuples/factor-calculator-types';
import {defendParameterAndRemoveUnnecessary} from '@/services/tuples/parameter-utils';
import {MouseEvent, useState} from 'react';

export const useParamFrom = (parameter: Parameter) => {
	const {fire} = useParameterEventBus();
	const [editing, setEditing] = useState(false);

	const onStartEditing = () => setEditing(true);
	const onBlur = () => setEditing(false);
	const onFromChanged = (from: ParameterKind) => (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		if (from === parameter.kind) {
			// do nothing, discard or start editing
			setEditing(!editing);
		} else {
			parameter.kind = from;
			defendParameterAndRemoveUnnecessary(parameter);
			setEditing(false);
			fire(ParameterEventTypes.FROM_CHANGED, parameter);
		}
	};
	const onIconClicked = (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		setEditing(!editing);
	};

	return {onFromChanged, onIconClicked, onStartEditing, onBlur, editing};
};