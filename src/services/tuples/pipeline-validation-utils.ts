// noinspection DuplicatedCode

import {
	ComputedParameter,
	ConstantParameter,
	Parameter,
	ParameterComputeType,
	ParameterExpression,
	ParameterExpressionOperator,
	ParameterJoint,
	TopicFactorParameter,
	ValueTypes
} from './factor-calculator-types';
import {Topic} from './topic-types';
import {
	isComputedParameter,
	isConstantParameter,
	isExpressionParameter,
	isJointParameter,
	isTopicFactorParameter,
	ParameterCalculatorDefsMap
} from './parameter-utils';
import {
	computeValidTypesByExpressionOperator,
	computeValidTypesForSubParameter,
	isComputeTypeValid,
	isFactorTypeCompatibleWith
} from './factor-calculator-utils';

export const isJointValid4Pipeline = (joint: ParameterJoint, topics: Array<Topic>): boolean => {
	const {jointType, filters} = joint;
	if (!jointType) {
		return false;
	}
	if (!filters || filters.length === 0) {
		return false;
	}

	return !filters.some(filter => {
		if (isJointParameter(filter)) {
			return !isJointValid4Pipeline(filter, topics);
		} else if (isExpressionParameter(filter)) {
			return !isExpressionValid4Pipeline(filter, topics);
		}
		return true;
	});
};

const isExpressionValid4Pipeline = (expression: ParameterExpression, topics: Array<Topic>): boolean => {
	const {left, operator, right} = expression;

	if (!operator) {
		return false;
	}

	const expectedTypes = computeValidTypesByExpressionOperator(operator);

	if (!left || !isParameterValid4Pipeline({parameter: left, topics, expectedTypes, array: false})) {
		return false;
	}

	if (operator !== ParameterExpressionOperator.NOT_EMPTY && operator !== ParameterExpressionOperator.EMPTY) {
		const array = operator === ParameterExpressionOperator.IN || operator === ParameterExpressionOperator.NOT_IN;
		if (!right || !isParameterValid4Pipeline({parameter: right, topics, expectedTypes, array})) {
			return false;
		}
	}

	return true;
};

export const isParameterValid4Pipeline = (options: {
	parameter: Parameter;
	topics: Array<Topic>;
	expectedTypes: ValueTypes;
	array?: boolean;
}): boolean => {
	const {parameter, topics, expectedTypes, array = false} = options;
	if (!parameter) {
		return false;
	}
	if (isTopicFactorParameter(parameter)) {
		if (array) {
			return false;
		} else {
			return isTopicFactorParameterValid(parameter, topics, expectedTypes);
		}
	} else if (isConstantParameter(parameter)) {
		return isConstantParameterValid(parameter, topics, expectedTypes, array);
	} else if (isComputedParameter(parameter)) {
		return isComputedParameterValid(parameter, topics, expectedTypes, array);
	} else {
		return false;
	}
};

// noinspection JSUnusedLocalSymbols
const isConstantParameterValid = (parameter: ConstantParameter, topics: Array<Topic>, expectedTypes: ValueTypes, array: boolean): boolean => {
	// TODO assume everything is ok
	return true;
};

const isTopicFactorParameterValid = (parameter: TopicFactorParameter, topics: Array<Topic>, expectedTypes: ValueTypes): boolean => {
	if (!parameter.topicId || !parameter.factorId) {
		// no topic or no factor, failure
		return false;
	}
	// eslint-disable-next-line
	const topic = topics.find(topic => topic.topicId == parameter.topicId);
	if (!topic) {
		// topic not found, failure
		return false;
	}
	// eslint-disable-next-line
	const factor = topic.factors.find(factor => factor.factorId == parameter.factorId);
	if (!factor) {
		// factor not found, failure
		return false;
	}

	return isFactorTypeCompatibleWith(factor.type, expectedTypes);
};

const isComputedParameterValid = (parameter: ComputedParameter, topics: Array<Topic>, expectedTypes: ValueTypes, array: boolean): boolean => {
	const {type: computeType, parameters} = parameter;
	if (!computeType) {
		// type must exists
		return false;
	}
	const calculatorDef = ParameterCalculatorDefsMap[computeType];
	// no calculator
	if (calculatorDef.parameterCount && parameters.length !== calculatorDef.parameterCount) {
		// parameters length mismatch
		return false;
	}
	if (calculatorDef.minParameterCount && parameters.length < calculatorDef.minParameterCount) {
		// parameters length mismatch
		return false;
	}
	if (calculatorDef.maxParameterCount && parameters.length > calculatorDef.maxParameterCount) {
		// parameters length mismatch
		return false;
	}
	const hasEmptyParameter = parameters.some(param => !param);
	if (hasEmptyParameter) {
		return false;
	}

	if (array && computeType !== ParameterComputeType.CASE_THEN) {
		// only case-then can produce array result
		return false;
	}

	if (!isComputeTypeValid(computeType, expectedTypes)) {
		return false;
	}

	const subTypes = computeValidTypesForSubParameter(computeType, expectedTypes);
	return parameters.every(parameter => {
		return isParameterValid4Pipeline({parameter, topics, expectedTypes: subTypes, array});
	});
};
