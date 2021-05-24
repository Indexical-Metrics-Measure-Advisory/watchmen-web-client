import React, {ChangeEvent, useEffect} from 'react';
import {useForceUpdate} from '../../../../../../basic-widgets/utils';
import {Parameter, ValidFactorType} from '../../../../../../services/tuples/factor-calculator-types';
import {isConstantParameter} from '../../../../../../services/tuples/factor-calculator-utils';
import {useParameterEventBus} from '../parameter/parameter-event-bus';
import {ParameterEventTypes} from '../parameter/parameter-event-bus-types';
import {ConstantContainer, ConstantInput} from './widgets';

export const ConstantEditor = (props: {
	parameter: Parameter;
	validTypes: Array<ValidFactorType>;
}) => {
	const {parameter} = props;

	const {on, off, fire} = useParameterEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(ParameterEventTypes.FROM_CHANGED, forceUpdate);
		return () => {
			off(ParameterEventTypes.FROM_CHANGED, forceUpdate);
		};
	}, [on, off, forceUpdate]);

	if (!isConstantParameter(parameter)) {
		return null;
	}

	const onValueChange = (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
		if (value === parameter.value) {
			return;
		}
		parameter.value = value;
		forceUpdate();
		fire(ParameterEventTypes.CONSTANT_VALUE_CHANGED, parameter);
	};

	return <ConstantContainer>
		<ConstantInput placeholder='Use "{}" to include variables or factor values.'
		               value={parameter.value || ''} onChange={onValueChange}/>
	</ConstantContainer>;
};
