// noinspection DuplicatedCode

import {
	AnyFactorType,
	ComputedParameter,
	ConstantParameter,
	Parameter,
	ParameterComputeType,
	ParameterExpression,
	ParameterExpressionOperator,
	ParameterJoint,
	TopicFactorParameter,
	ValueType,
	ValueTypes
} from './factor-calculator-types';
import {Topic} from './topic-types';
import {FactorType} from './factor-types';
import dayjs from 'dayjs';
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

export const isJointValid4DataSet = (joint: ParameterJoint, topics: Array<Topic>): boolean => {
	const {jointType, filters} = joint;
	if (!jointType) {
		return false;
	}
	if (!filters || filters.length === 0) {
		return false;
	}

	return !filters.some(filter => {
		if (isJointParameter(filter)) {
			return !isJointValid4DataSet(filter, topics);
		} else if (isExpressionParameter(filter)) {
			return !isExpressionValid4DataSet(filter, topics);
		}
		return true;
	});
};

export const isExpressionValid4DataSet = (expression: ParameterExpression, topics: Array<Topic>): boolean => {
	const {left, operator, right} = expression;

	if (!operator) {
		return false;
	}

	const expectedTypes = computeValidTypesByExpressionOperator(operator);

	if (!left || !isParameterValid4DataSet({parameter: left, topics, expectedTypes, array: false})) {
		return false;
	}

	if (operator !== ParameterExpressionOperator.NOT_EMPTY && operator !== ParameterExpressionOperator.EMPTY) {
		const array = operator === ParameterExpressionOperator.IN || operator === ParameterExpressionOperator.NOT_IN;
		if (!right || !isParameterValid4DataSet({parameter: right, topics, expectedTypes, array})) {
			return false;
		}
	}

	return true;
};

export const isParameterValid4DataSet = (options: {
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
		return isConstantParameterValid(parameter, expectedTypes, array);
	} else if (isComputedParameter(parameter)) {
		return isComputedParameterValid(parameter, topics, expectedTypes, array);
	} else {
		return false;
	}
};

const isValueValid = (value: string, type: ValueType): boolean => {
	switch (type) {
		// always matched
		case FactorType.TEXT:
		case FactorType.ADDRESS:
		case FactorType.DISTRICT:
		case FactorType.ROAD:
		case FactorType.COMMUNITY:
		case FactorType.EMAIL:
		case FactorType.PHONE:
		case FactorType.MOBILE:
		case FactorType.FAX:
		case FactorType.ID_NO:
			return true;

		// always mismatched
		case FactorType.OBJECT:
		case FactorType.ARRAY:
		case FactorType.SEQUENCE:
			// sequence factor never occurs in any expression/filter
			return false;

		// enum
		case FactorType.ENUM:
		case FactorType.CONTINENT:
		case FactorType.REGION:
		case FactorType.COUNTRY:
		case FactorType.PROVINCE:
		case FactorType.CITY:
		case FactorType.RESIDENCE_TYPE:
			return true;

		case FactorType.HALF_YEAR:
		case FactorType.HALF_MONTH:
			// eslint-disable-next-line
			return value == '1' || value == '2';
		case FactorType.QUARTER:
			// eslint-disable-next-line
			return value == '1' || value == '2' || value == '3' || value == '4';
		case FactorType.TEN_DAYS:
			// eslint-disable-next-line
			return value == '1' || value == '2' || value == '3';
		case FactorType.WEEK_OF_YEAR:
			// eslint-disable-next-line
			return value == '1' || value == '2' || value == '3';
		case FactorType.WEEK_OF_MONTH:
			// eslint-disable-next-line
			return value == '0' || value == '1' || value == '2' || value == '3' || value == '4' || value == '5';
		case FactorType.HALF_WEEK:
			// eslint-disable-next-line
			return value == '1' || value == '2';
		case FactorType.DAY_OF_WEEK:
			// eslint-disable-next-line
			return value == '1' || value == '2' || value == '3' || value == '4' || value == '5' || value == '6' || value == '7';
		case FactorType.DAY_KIND:
			// eslint-disable-next-line
			return value == '1' || value == '2' || value == '3';
		case FactorType.HOUR_KIND:
			// eslint-disable-next-line
			return value == '1' || value == '2' || value == '3';
		case FactorType.AM_PM:
			// eslint-disable-next-line
			return value == '1' || value == '2';

		case FactorType.GENDER:
		case FactorType.OCCUPATION:
		case FactorType.RELIGION:
		case FactorType.NATIONALITY:
		case FactorType.BIZ_TRADE:
			return true;

		// numeric
		case FactorType.NUMBER:
		case FactorType.FLOOR:
			return /^-?\d+(\.\d+)?$/.test(value);
		case FactorType.UNSIGNED:
		case FactorType.AGE:
		case FactorType.RESIDENTIAL_AREA:
		case FactorType.BIZ_SCALE:
			return /^\d+(\.\d+)?$/.test(value);

		case FactorType.YEAR:
			return /^\d{4}$/.test(value);
		case FactorType.MONTH:
			return /^(10|11|12|0?[1-9])$/.test(value);
		case FactorType.DAY_OF_MONTH:
			return /^([0-2]?[1-9]|10|20|30|31)$/.test(value);
		case FactorType.HOUR:
			return /^([0-1]?[1-9]|10|20|21|22|23)$/.test(value);
		case FactorType.MINUTE:
		case FactorType.SECOND:
			return /^[0-5]?[0-9]$/.test(value);
		case FactorType.MILLISECOND:
			return /^\d{1,3}$/.test(value);

		// datetime
		case FactorType.DATE:
		case FactorType.DATE_OF_BIRTH:
			return !!value && !!dayjs(value, ['YYYY/MM/DD', 'YYYY-MM-DD'], true);
		case FactorType.TIME:
			return !!value && !!dayjs(value, 'HH:mm:ss', true);
		case FactorType.DATETIME:
			return !!value && !!dayjs(value, ['YYYY/MM/DD HH:mm:ss', 'YYYY-MM-DD HH:mm:ss'], true);
		case FactorType.FULL_DATETIME:
			return !!value && !!dayjs(value, ['YYYY/MM/DD HH:mm:ss.SSS', 'YYYY-MM-DD HH:mm:ss.SSS'], true);

		// boolean
		case FactorType.BOOLEAN:
			return ['true', 'false'].includes(value.toLowerCase());
		default:
			// never occurs
			return true;
	}
};
/**
 * constant parameter in dataset doesn't support {} syntax, just check value
 */
const isConstantParameterValid = (parameter: ConstantParameter, expectedTypes: ValueTypes, array: boolean): boolean => {
	const value = (parameter.value || '').trim();
	let check = (type: ValueType) => isValueValid(value, type);
	if (array) {
		const values = value.split(',').map(x => x.trim());
		check = (type: ValueType) => values.every(value => isValueValid(value, type));
	}
	return expectedTypes.some(expectedType => expectedType === AnyFactorType.ANY || check(expectedType));
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
		return isParameterValid4DataSet({parameter, topics, expectedTypes: subTypes, array});
	});
};
