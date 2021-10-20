import {
	AnyFactorType,
	ComputedParameter,
	ConstantParameter,
	DeclaredVariable,
	DeclaredVariables,
	Parameter,
	ParameterComputeType,
	ParameterExpression,
	ParameterExpressionOperator,
	ParameterInvalidReason,
	ParameterJoint,
	ParameterKind,
	TopicFactorParameter,
	ValueTypes
} from './factor-calculator-types';
import {
	computeParameterTypes,
	computeValidTypesByExpressionOperator,
	computeValidTypesForSubParameter,
	isComputeTypeValid,
	isFactorTypeCompatibleWith
} from './factor-calculator-utils';
import {FactorType} from './factor-types';
import {
	isComputedParameter,
	isConstantParameter,
	isExpressionParameter,
	isJointParameter,
	isTopicFactorParameter,
	ParameterCalculatorDefsMap
} from './parameter-utils';
import {PipelineStage} from './pipeline-stage-types';
import {PipelineStageUnitAction} from './pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {
	isCopyToMemoryAction,
	isExistsAction,
	isReadFactorAction,
	isReadFactorsAction,
	isReadRowAction,
	isReadRowsAction,
	isReadTopicAction
} from './pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {PipelineStageUnit} from './pipeline-stage-unit-types';
import {Pipeline} from './pipeline-types';
import {Topic} from './topic-types';

export const isJointValid4Pipeline = (options: {
	joint: ParameterJoint;
	allTopics: Array<Topic>;
	triggerTopic?: Topic;
	variables: DeclaredVariables;
	reasons: (reason: ParameterInvalidReason) => void;
}): boolean => {
	const {joint, allTopics, triggerTopic, variables, reasons} = options;

	const {jointType, filters} = joint;
	if (!jointType) {
		reasons(ParameterInvalidReason.JOINT_TYPE_NOT_DEFINED);
		return false;
	}
	if (!filters || filters.length === 0) {
		reasons(ParameterInvalidReason.JOINT_FILTERS_NOT_DEFINED);
		return false;
	}

	return !filters.some(filter => {
		if (isJointParameter(filter)) {
			return !isJointValid4Pipeline({joint: filter, allTopics, triggerTopic, variables, reasons});
		} else if (isExpressionParameter(filter)) {
			return !isExpressionValid4Pipeline({expression: filter, allTopics, triggerTopic, variables, reasons});
		}
		return true;
	});
};

const isExpressionValid4Pipeline = (options: {
	expression: ParameterExpression;
	allTopics: Array<Topic>;
	triggerTopic?: Topic;
	variables: DeclaredVariables;
	reasons: (reason: ParameterInvalidReason) => void;
}): boolean => {
	const {expression, allTopics, triggerTopic, variables, reasons} = options;
	const {left, operator, right} = expression;

	if (!operator) {
		reasons(ParameterInvalidReason.EXPRESSION_OPERATOR_NOT_DEFINED);
		return false;
	}

	const expectedTypes = computeValidTypesByExpressionOperator(operator);

	if (!left) {
		reasons(ParameterInvalidReason.EXPRESSION_LEFT_NOT_DEFINED);
		return false;
	}
	if (!isParameterValid4Pipeline({
		parameter: left, allTopics, triggerTopic, variables,
		expectedTypes, array: false,
		reasons
	})) {
		return false;
	}

	if (operator !== ParameterExpressionOperator.NOT_EMPTY && operator !== ParameterExpressionOperator.EMPTY) {
		const array = operator === ParameterExpressionOperator.IN || operator === ParameterExpressionOperator.NOT_IN;
		if (!right) {
			reasons(ParameterInvalidReason.EXPRESSION_RIGHT_NOT_DEFINED);
			return false;
		}
		if (!isParameterValid4Pipeline({
			parameter: right, allTopics, triggerTopic, variables,
			expectedTypes, array,
			reasons
		})) {
			return false;
		}
	}

	return true;
};

export const isParameterValid4Pipeline = (options: {
	parameter: Parameter;
	allTopics: Array<Topic>;
	triggerTopic?: Topic;
	variables: DeclaredVariables;
	expectedTypes: ValueTypes;
	array?: boolean;
	reasons: (reason: ParameterInvalidReason) => void;
}): boolean => {
	const {parameter, allTopics, triggerTopic, variables, expectedTypes, array = false, reasons} = options;
	if (!parameter) {
		return false;
	}
	if (isTopicFactorParameter(parameter)) {
		// a factor with type of primitive array is never existed
		// therefore any return value will be treated as an array which contains only one element
		return isTopicFactorParameterValid({parameter, topics: allTopics, expectedTypes, reasons});
	} else if (isConstantParameter(parameter)) {
		return isConstantParameterValid({parameter, allTopics, triggerTopic, variables, expectedTypes, array, reasons});
	} else if (isComputedParameter(parameter)) {
		return isComputedParameterValid({parameter, allTopics, triggerTopic, variables, expectedTypes, array, reasons});
	} else {
		return false;
	}
};

// noinspection JSUnusedLocalSymbols
export const isConstantParameterValid = (options: {
	parameter: ConstantParameter;
	allTopics: Array<Topic>;
	triggerTopic?: Topic;
	variables: DeclaredVariables;
	expectedTypes: ValueTypes;
	// true only when
	// 1. parameter is right part of an expression and expression operator is in/not in
	// 2. parameter is in case-then
	// in these cases, only constant values are supported, which means anything if fine, validation ignored.
	array: boolean;
	reasons: (reason: ParameterInvalidReason) => void;
}): boolean => {
	const {parameter, allTopics, triggerTopic, variables, expectedTypes, array, reasons} = options;

	if (array) {
		// constant
		return true;
	}

	const types = computeParameterTypes(parameter, allTopics, variables, triggerTopic)
		.filter(type => type.array === array);

	if (types.every(type => type.type === AnyFactorType.ERROR)) {
		// none of computed types is correct
		reasons(ParameterInvalidReason.CONSTANT_TYPE_NOT_MATCHED);
		return false;
	}

	if (expectedTypes.some(expectedType => expectedType === AnyFactorType.ANY)) {
		// one of expected types is any type
		return true;
	}

	if (types.some(type => type.type === AnyFactorType.ANY)) {
		// one of computed types is any type
		return true;
	}

	const actualExpectedTypes = expectedTypes.filter(expectedType => expectedType !== AnyFactorType.ERROR && expectedType !== AnyFactorType.ANY);

	return types.filter(type => type.type !== AnyFactorType.ERROR)
		.filter(type => type.array === array)
		.some(type => isFactorTypeCompatibleWith({
			factorType: type.type as FactorType,
			expectedTypes: actualExpectedTypes,
			reasons: () => reasons(ParameterInvalidReason.CONSTANT_TYPE_NOT_MATCHED)
		}));
};

const isTopicFactorParameterValid = (options: {
	parameter: TopicFactorParameter;
	topics: Array<Topic>;
	expectedTypes: ValueTypes;
	reasons: (reason: ParameterInvalidReason) => void;
}): boolean => {
	const {parameter, topics, expectedTypes, reasons} = options;

	if (!parameter.topicId) {
		// no topic, failure
		reasons(ParameterInvalidReason.TOPIC_NOT_DEFINED);
		return false;
	}
	if (!parameter.factorId) {
		reasons(ParameterInvalidReason.FACTOR_NOT_DEFINED);
		return false;
	}
	// eslint-disable-next-line
	const topic = topics.find(topic => topic.topicId == parameter.topicId);
	if (!topic) {
		// topic not found, failure
		reasons(ParameterInvalidReason.TOPIC_NOT_FOUND);
		return false;
	}
	// eslint-disable-next-line
	const factor = topic.factors.find(factor => factor.factorId == parameter.factorId);
	if (!factor) {
		// factor not found, failure
		reasons(ParameterInvalidReason.FACTOR_NOT_FOUND);
		return false;
	}

	return isFactorTypeCompatibleWith({factorType: factor.type, expectedTypes, reasons});
};

const isComputedParameterValid = (options: {
	parameter: ComputedParameter;
	allTopics: Array<Topic>;
	triggerTopic?: Topic;
	variables: DeclaredVariables;
	expectedTypes: ValueTypes;
	array: boolean;
	reasons: (reason: ParameterInvalidReason) => void;
}): boolean => {
	const {parameter, allTopics, triggerTopic, variables, expectedTypes, array, reasons} = options;

	const {type: computeType, parameters} = parameter;
	if (!computeType) {
		// type must exists
		reasons(ParameterInvalidReason.COMPUTE_TYPE_NOT_DEFINED);
		return false;
	}
	const calculatorDef = ParameterCalculatorDefsMap[computeType];
	// no calculator
	if (calculatorDef.parameterCount && parameters.length !== calculatorDef.parameterCount) {
		// parameters length mismatch
		reasons(ParameterInvalidReason.COMPUTE_PARAMETER_COUNT_NOT_MATCHED);
		return false;
	}
	if (calculatorDef.minParameterCount && parameters.length < calculatorDef.minParameterCount) {
		// parameters length mismatch
		reasons(ParameterInvalidReason.COMPUTE_PARAMETER_COUNT_NOT_MATCHED);
		return false;
	}
	if (calculatorDef.maxParameterCount && parameters.length > calculatorDef.maxParameterCount) {
		// parameters length mismatch
		reasons(ParameterInvalidReason.COMPUTE_PARAMETER_COUNT_NOT_MATCHED);
		return false;
	}
	const hasEmptyParameter = parameters.some(param => !param);
	if (hasEmptyParameter) {
		reasons(ParameterInvalidReason.COMPUTE_PARAMETER_HAS_NOT_DEFINED);
		return false;
	}

	if (computeType === ParameterComputeType.CASE_THEN) {
		if (parameters.filter(parameter => !parameter.conditional || !parameter.on).length > 1) {
			// only one anyway route in case-then
			reasons(ParameterInvalidReason.COMPUTE_CASES_TOO_MANY_UNCONDITIONAL);
			return false;
		}
	}

	if (!isComputeTypeValid({
		computeType,
		expectedTypes,
		reasons: () => reasons(ParameterInvalidReason.COMPUTE_RETURN_TYPE_NOT_MATCHED)
	})) {
		return false;
	}

	const subTypes = computeValidTypesForSubParameter(computeType, expectedTypes);
	return parameters.every(parameter => {
		if (parameter.conditional) {
			if (!parameter.on || parameter.on.filters.length === 0) {
				return false;
			}
			if (!isJointValid4Pipeline({joint: parameter.on, allTopics, triggerTopic, variables, reasons})) {
				return false;
			}
		}
		return isParameterValid4Pipeline({
			parameter,
			allTopics,
			triggerTopic,
			variables,
			expectedTypes: subTypes,
			// only case-then should return an array
			// therefore any return value will be treated as an array which contains only one element
			// then true is passed only when compute type is case-then
			array: array && computeType === ParameterComputeType.CASE_THEN,
			reasons
		});
	});
};

export const buildVariable = (options: {
	action: PipelineStageUnitAction;
	variables: DeclaredVariables;
	topics: Array<Topic>;
	triggerTopic?: Topic;
}): DeclaredVariable | undefined => {
	const {action, variables, topics, triggerTopic} = options;
	if (isReadFactorAction(action)) {
		return {
			name: action.variableName.trim(),
			types: computeParameterTypes({
				kind: ParameterKind.TOPIC,
				topicId: action.topicId,
				factorId: action.factorId
			} as TopicFactorParameter, topics, variables, triggerTopic)
		};
	} else if (isReadFactorsAction(action)) {
		return {
			name: action.variableName.trim(),
			types: computeParameterTypes({
				kind: ParameterKind.TOPIC,
				topicId: action.topicId,
				factorId: action.factorId
			} as TopicFactorParameter, topics, variables, triggerTopic).map(t => {
				t.array = true;
				return t;
			})
		};
	} else if (isReadRowAction(action)) {
		return {
			name: action.variableName.trim(),
			types: computeParameterTypes({
				kind: ParameterKind.TOPIC,
				topicId: action.topicId
			} as TopicFactorParameter, topics, variables, triggerTopic)
		};
	} else if (isReadRowsAction(action)) {
		return {
			name: action.variableName.trim(),
			types: computeParameterTypes({
				kind: ParameterKind.TOPIC,
				topicId: action.topicId
			} as TopicFactorParameter, topics, variables, triggerTopic).map(t => {
				t.array = true;
				return t;
			})
		};
	} else if (isExistsAction(action)) {
		return {
			name: action.variableName.trim(),
			types: [{type: FactorType.BOOLEAN, array: false}]
		};
	} else if (isCopyToMemoryAction(action)) {
		return {
			name: action.variableName.trim(),
			types: computeParameterTypes(action.source, topics, variables, triggerTopic)
		};
	}
};
export const buildVariables = (
	topics: Array<Topic>,
	pipeline: Pipeline,
	stage?: PipelineStage,
	unit?: PipelineStageUnit,
	action?: PipelineStageUnitAction
): DeclaredVariables => {
	let actions: Array<PipelineStageUnitAction>;
	// compute actions before me
	if (stage && unit && action) {
		actions = pipeline.stages.slice(0, pipeline.stages.indexOf(stage) + 1).map(currentStage => {
			let units = currentStage.units || [];
			if (currentStage === stage) {
				units = units.slice(0, stage.units.indexOf(unit) + 1);
			}
			return units.map(currentUnit => {
				let actions = currentUnit.do || [];
				if (currentUnit === unit) {
					actions = actions.slice(0, unit.do.indexOf(action));
				}
				return actions.filter(action => isReadTopicAction(action) || isCopyToMemoryAction(action));
			}).flat();
		}).flat();
	} else if (stage && unit) {
		actions = pipeline.stages.slice(0, pipeline.stages.indexOf(stage) + 1).map(currentStage => {
			let units = currentStage.units || [];
			if (currentStage === stage) {
				units = units.slice(0, stage.units.indexOf(unit));
			}
			return units.map(unit => {
				return (unit.do || []).filter(action => isReadTopicAction(action) || isCopyToMemoryAction(action));
			}).flat();
		}).flat();
	} else if (stage) {
		actions = pipeline.stages.slice(0, pipeline.stages.indexOf(stage)).map(stage => {
			return (stage.units || []).map(unit => {
				return (unit.do || []).filter(action => isReadTopicAction(action) || isCopyToMemoryAction(action));
			}).flat();
		}).flat();
	} else {
		// in pipeline, no variable yet
		actions = [];
	}

	const variables: DeclaredVariables = [];
	// eslint-disable-next-line
	const triggerTopic = topics.find(t => t.topicId == pipeline.topicId);
	actions.forEach(action => {
		const variable = buildVariable({action, variables, topics, triggerTopic});
		if (variable) {
			variables.push(variable);
		}
	});

	return variables.reduceRight((temp, v) => {
		if (!v.name || !v.name.trim()) {
			// ignore noname
			return temp;
		}
		v.name = v.name.trim();
		// variable might be replaced
		if (!temp.exists[v.name]) {
			temp.all.push(v);
			temp.exists[v.name] = true;
		}
		return temp;
	}, {exists: {}, all: []} as { exists: Record<string, any>, all: DeclaredVariables }).all.reverse();
};
