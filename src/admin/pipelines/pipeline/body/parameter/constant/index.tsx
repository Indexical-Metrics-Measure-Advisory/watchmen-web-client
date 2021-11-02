import {
	ConstantParameter,
	DeclaredVariables,
	Parameter,
	ValueTypes
} from '@/services/data/tuples/factor-calculator-types';
import {isConstantParameter} from '@/services/data/tuples/parameter-utils';
import {isConstantParameterValid} from '@/services/data/tuples/pipeline-validation-utils';
import {Topic} from '@/services/data/tuples/topic-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {useParameterEventBus} from '@/widgets/parameter/parameter-event-bus';
import {ParameterEventTypes} from '@/widgets/parameter/parameter-event-bus-types';
import React, {ChangeEvent, useEffect, useState} from 'react';
import {useVariablesEventBus} from '../../variables/variables-event-bus';
import {VariablesEventTypes} from '../../variables/variables-event-bus-types';
import {ConstantContainer, ConstantInput} from './widgets';

const computeTypes = (options: {
	parameter: ConstantParameter;
	topics: Array<Topic>;
	variables: DeclaredVariables;
	triggerTopic?: Topic;
	expectedTypes: ValueTypes;
	expectArray: boolean;
	onMismatch: () => void;
	onMatch: () => void;
}) => {
	const {parameter, topics, variables, triggerTopic, expectedTypes, expectArray, onMismatch, onMatch} = options;
	const matched = isConstantParameterValid({
		parameter,
		allTopics: topics,
		triggerTopic,
		variables,
		expectedTypes,
		array: expectArray,
		reasons: () => {
			// don't need reason here, ignore it
		}
	});
	matched ? onMatch() : onMismatch();
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
	expectedTypes: ValueTypes;
	expectArray: boolean;
}) => {
	const {parameter, expectedTypes, expectArray} = props;

	const {fire: fireVariables, on: onVariables, off: offVariables} = useVariablesEventBus();
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
		fireVariables(VariablesEventTypes.ASK_VARIABLES, (variables, topics, triggerTopic) => {
			computeTypes({
				parameter, topics, variables, triggerTopic, expectedTypes, expectArray,
				onMismatch: () => setValid(false),
				onMatch: () => setValid(true)
			});
		});
	}, [fireVariables, parameter, expectedTypes, expectArray]);
	useEffect(() => {
		if (!isConstantParameter(parameter)) {
			return;
		}
		const onVariableChanged = () => {
			// noinspection DuplicatedCode
			fireVariables(VariablesEventTypes.ASK_VARIABLES, (variables, topics, triggerTopic) => {
				computeTypes({
					parameter, topics, variables, triggerTopic, expectedTypes, expectArray,
					onMismatch: () => !valid ? forceUpdate() : setValid(false),
					onMatch: () => valid ? forceUpdate() : setValid(true)
				});
			});
		};
		onVariables(VariablesEventTypes.VARIABLE_CHANGED, onVariableChanged);
		return () => {
			offVariables(VariablesEventTypes.VARIABLE_CHANGED, onVariableChanged);
		};
	}, [onVariables, offVariables, fireVariables, forceUpdate, parameter, valid, expectedTypes, expectArray]);

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
		fireVariables(VariablesEventTypes.ASK_VARIABLES, (variables, topics, triggerTopic) => {
			computeTypes({
				parameter, topics, variables, triggerTopic, expectedTypes, expectArray,
				onMismatch: () => !valid ? forceUpdate() : setValid(false),
				onMatch: () => valid ? forceUpdate() : setValid(true)
			});
		});
		fire(ParameterEventTypes.CONSTANT_VALUE_CHANGED, parameter);
	};

	return <ConstantContainer>
		<ConstantInput placeholder='Use "{}" to include variables or factor values.'
		               value={parameter.value || ''} onChange={onValueChange}
		               valid={valid}/>
	</ConstantContainer>;
};
