import React, {ChangeEvent, useEffect, useState} from 'react';
import {useForceUpdate} from '../../../../../../basic-widgets/utils';
import {Parameter, ValidFactorType} from '../../../../../../services/tuples/factor-calculator-types';
import {computeParameterTypes, isConstantParameter} from '../../../../../../services/tuples/factor-calculator-utils';
import {useParameterEventBus} from '../parameter/parameter-event-bus';
import {ParameterEventTypes} from '../parameter/parameter-event-bus-types';
import {ConstantContainer, ConstantInput} from './widgets';
import {useVariablesEventBus} from '../../variables/variables-event-bus';
import {VariablesEventTypes} from '../../variables/variables-event-bus-types';

export const ConstantEditor = (props: {
	parameter: Parameter;
	validTypes: Array<ValidFactorType>;
}) => {
	const {parameter, validTypes} = props;

	const {once: onceVariables} = useVariablesEventBus();
	const {on, off, fire} = useParameterEventBus();
	const [valid, setValid] = useState<boolean>(true);
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(ParameterEventTypes.FROM_CHANGED, forceUpdate);
		return () => {
			off(ParameterEventTypes.FROM_CHANGED, forceUpdate);
		};
	}, [on, off, forceUpdate]);
	useEffect(() => {
		if (!isConstantParameter(parameter)) {
			return;
		}
		onceVariables(VariablesEventTypes.REPLY_VARIABLES, (variables, topics, triggerTopic) => {
			const types = computeParameterTypes(parameter, topics, variables, triggerTopic);
			if (types.every(t => t.type === 'error')) {
				setValid(false);
			} else {
				setValid(true);
			}
		}).fire(VariablesEventTypes.ASK_VARIABLES);
	}, [onceVariables, parameter, validTypes]);

	if (!isConstantParameter(parameter)) {
		return null;
	}

	const onValueChange = (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
		if (value === parameter.value) {
			return;
		}
		parameter.value = value;
		onceVariables(VariablesEventTypes.REPLY_VARIABLES, (variables, topics, triggerTopic) => {
			const types = computeParameterTypes(parameter, topics, variables, triggerTopic);
			if (types.every(t => t.type === 'error')) {
				!valid ? forceUpdate() : setValid(false);
			} else {
				valid ? forceUpdate() : setValid(true);
			}
		}).fire(VariablesEventTypes.ASK_VARIABLES);
		fire(ParameterEventTypes.CONSTANT_VALUE_CHANGED, parameter);
	};

	return <ConstantContainer>
		<ConstantInput placeholder='Use "{}" to include variables or factor values.'
		               value={parameter.value || ''} onChange={onValueChange}
		               valid={valid}/>
	</ConstantContainer>;
};
