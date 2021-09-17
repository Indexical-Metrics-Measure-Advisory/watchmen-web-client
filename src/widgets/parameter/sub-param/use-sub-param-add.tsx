import {ComputedParameter, Parameter} from '@/services/data/tuples/factor-calculator-types';
import {canAddMoreParameter, createTopicFactorParameter} from '@/services/data/tuples/parameter-utils';
import React from 'react';
import {AlertLabel} from '../../alert/widgets';
import {useEventBus} from '../../events/event-bus';
import {EventTypes} from '../../events/types';

export const useSubParamAdd = (
	parentParameter: ComputedParameter,
	onAdded: (parameter: Parameter) => void,
	maxCountAlertLabel: string
) => {
	const {fire: fireGlobal} = useEventBus();

	return () => {
		const canAdd = canAddMoreParameter(parentParameter);
		if (!canAdd) {
			fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>{maxCountAlertLabel}</AlertLabel>);
		} else {
			const parameter = createTopicFactorParameter();
			parentParameter.parameters.push(parameter);
			onAdded(parameter);
		}
	};
};