import React, { ChangeEvent, useEffect } from 'react';
import { useForceUpdate } from '../../../../../basic-widgets/utils';
import { Lang } from '../../../../../langs';
import { Parameter } from '../../../../../services/tuples/factor-calculator-types';
import { isConstantParameter } from '../../../../../services/tuples/factor-calculator-utils';
import { useParameterEventBus } from './parameter-event-bus';
import { ParameterEventTypes } from './parameter-event-bus-types';
import { ConstantInput } from './widgets';

export const ConstantEdit = (props: { parameter: Parameter }) => {
	const { parameter, ...rest } = props;

	const { on, off } = useParameterEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(ParameterEventTypes.FROM_CHANGED, forceUpdate);
		return () => {
			off(ParameterEventTypes.FROM_CHANGED, forceUpdate);
		};
	}, [ on, off, forceUpdate ]);

	if (!isConstantParameter(parameter)) {
		return null;
	}

	const onValueChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		if (value === parameter.value) {
			return;
		}
		parameter.value = value;
		forceUpdate();
	};

	return <ConstantInput placeholder={Lang.PLAIN.CONSTANT_INPUT_PLACEHOLDER}
	                      value={parameter.value || ''} onChange={onValueChange}
	                      {...rest}/>;
};