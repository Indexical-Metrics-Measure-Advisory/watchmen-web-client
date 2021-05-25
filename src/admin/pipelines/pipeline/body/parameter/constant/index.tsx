import React, {ChangeEvent, useEffect, useState} from 'react';
import {useForceUpdate} from '../../../../../../basic-widgets/utils';
import {
	ConstantParameter,
	Parameter,
	ValidFactorType,
	Variable
} from '../../../../../../services/tuples/factor-calculator-types';
import {
	computeParameterTypes,
	isConstantParameter,
	isFactorTypeValid
} from '../../../../../../services/tuples/factor-calculator-utils';
import {useParameterEventBus} from '../parameter/parameter-event-bus';
import {ParameterEventTypes} from '../parameter/parameter-event-bus-types';
import {ConstantContainer, ConstantInput} from './widgets';
import {useVariablesEventBus} from '../../variables/variables-event-bus';
import {VariablesEventTypes} from '../../variables/variables-event-bus-types';
import {Topic} from '../../../../../../services/tuples/topic-types';
import {FactorType} from '../../../../../../services/tuples/factor-types';

const computeTypes = (options: {
	parameter: ConstantParameter;
	topics: Array<Topic>;
	variables: Array<Variable>;
	triggerTopic?: Topic;
	validTypes: Array<ValidFactorType>;
	onMismatch: () => void;
	onMatch: () => void;
}) => {
	const {parameter, topics, variables, triggerTopic, validTypes, onMismatch, onMatch} = options;
	const types = computeParameterTypes(parameter, topics, variables, triggerTopic);
	if (types.every(t => t.type === 'error')) {
		onMismatch();
		return;
	}
	if (validTypes.includes(ValidFactorType.ANY)) {
		onMatch();
		return;
	}

	const computedTypes = types.filter(t => t.type !== 'error');
	const match = validTypes.filter(type => type !== ValidFactorType.ANY)
		.some(validType => {
			return computedTypes.some(type => {
				return !type.collection && (type.type === 'any' || isFactorTypeValid(type.type as FactorType, validType));
			});
		});

	match ? onMatch() : onMismatch();
};

/**
 * valid types of constant might from:
 * 1. expression, according to expression operator.
 *      theoretically can be collection, but currently cannot since there is no operator to handle collection part.
 * 2. compute parameter, according to compute type. cannot be collection.
 * 3. source parameter of copy-to-memory action, should be any, obviously can be collection.
 * 4. factor mappings, of insert/merge/inert-or-merge row, should compatible factor type of target factor. cannot be collection.
 * 5. source parameter of write-factor action, should compatible factor type of target factor. cannot be collection.
 */
export const ConstantEditor = (props: {
	parameter: Parameter;
	validTypes: Array<ValidFactorType>;
}) => {
	const {parameter, validTypes} = props;

	const {once: onceVariables, on: onVariables, off: offVariables} = useVariablesEventBus();
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
			computeTypes({
				parameter, topics, variables, triggerTopic, validTypes,
				onMismatch: () => setValid(false),
				onMatch: () => setValid(true)
			});
		}).fire(VariablesEventTypes.ASK_VARIABLES);
	}, [onceVariables, parameter, validTypes]);
	useEffect(() => {
		if (!isConstantParameter(parameter)) {
			return;
		}
		const onVariableChanged = () => {
			// noinspection DuplicatedCode
			onceVariables(VariablesEventTypes.REPLY_VARIABLES, (variables, topics, triggerTopic) => {
				computeTypes({
					parameter, topics, variables, triggerTopic, validTypes,
					onMismatch: () => !valid ? forceUpdate() : setValid(false),
					onMatch: () => valid ? forceUpdate() : setValid(true)
				});
			}).fire(VariablesEventTypes.ASK_VARIABLES);
		};
		onVariables(VariablesEventTypes.VARIABLE_CHANGED, onVariableChanged);
		return () => {
			offVariables(VariablesEventTypes.VARIABLE_CHANGED, onVariableChanged);
		};
	}, [onVariables, offVariables, onceVariables, forceUpdate, parameter, valid, validTypes]);

	if (!isConstantParameter(parameter)) {
		return null;
	}

	const onValueChange = (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
		if (value === parameter.value) {
			return;
		}
		parameter.value = value;
		// noinspection DuplicatedCode
		onceVariables(VariablesEventTypes.REPLY_VARIABLES, (variables, topics, triggerTopic) => {
			computeTypes({
				parameter, topics, variables, triggerTopic, validTypes,
				onMismatch: () => !valid ? forceUpdate() : setValid(false),
				onMatch: () => valid ? forceUpdate() : setValid(true)
			});
		}).fire(VariablesEventTypes.ASK_VARIABLES);
		fire(ParameterEventTypes.CONSTANT_VALUE_CHANGED, parameter);
	};

	return <ConstantContainer>
		<ConstantInput placeholder='Use "{}" to include variables or factor values.'
		               value={parameter.value || ''} onChange={onValueChange}
		               valid={valid}/>
	</ConstantContainer>;
};
