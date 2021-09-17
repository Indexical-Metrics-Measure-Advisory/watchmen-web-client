import {ComputedParameter, Parameter} from '@/services/data/tuples/factor-calculator-types';
import {canDeleteAnyParameter} from '@/services/data/tuples/parameter-utils';
import React from 'react';
import {AlertLabel} from '../../alert/widgets';
import {useEventBus} from '../../events/event-bus';
import {EventTypes} from '../../events/types';

export const useSubParamDelete = (
	parentParameter: ComputedParameter,
	parameterToBeDelete: Parameter,
	onDeleted: () => void,
	canNotDeleteAlertLabel: string
) => {
	const {fire: fireGlobal} = useEventBus();

	return () => {
		const canDelete = canDeleteAnyParameter(parentParameter);
		if (!canDelete) {
			fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>{canNotDeleteAlertLabel}</AlertLabel>);
		} else {
			const index = parentParameter.parameters.findIndex(child => child === parameterToBeDelete);
			if (index !== -1) {
				parentParameter.parameters.splice(index, 1);
				onDeleted();
			}
		}
	};
};