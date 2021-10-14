// noinspection DuplicatedCode

import dayjs from 'dayjs';
import {
	AnyFactorType,
	ComputedParameter,
	ConstantParameter,
	Parameter,
	ParameterComputeType,
	ParameterExpression,
	ParameterExpressionOperator,
	ParameterInvalidReason,
	ParameterJoint,
	TopicFactorParameter,
	ValueType,
	ValueTypes
} from './factor-calculator-types';
import {
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
import {Topic} from './topic-types';

export const isJointValid4DataSet = (options: {
	joint: ParameterJoint;
	topics: Array<Topic>;
	reasons: (reason: ParameterInvalidReason) => void;
}): boolean => {
	const {joint, topics, reasons} = options;

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
			return !isJointValid4DataSet({joint: filter, topics, reasons});
		} else if (isExpressionParameter(filter)) {
			return !isExpressionValid4DataSet({expression: filter, topics, reasons});
		}
		return true;
	});
};

export const isExpressionValid4DataSet = (options: {
	expression: ParameterExpression;
	topics: Array<Topic>;
	reasons: (reason: ParameterInvalidReason) => void;
}): boolean => {
	const {expression, topics, reasons} = options;

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
	if (!isParameterValid4DataSet({parameter: left, topics, expectedTypes, array: false, reasons})) {
		return false;
	}

	if (operator !== ParameterExpressionOperator.NOT_EMPTY && operator !== ParameterExpressionOperator.EMPTY) {
		const array = operator === ParameterExpressionOperator.IN || operator === ParameterExpressionOperator.NOT_IN;
		if (!right) {
			reasons(ParameterInvalidReason.EXPRESSION_RIGHT_NOT_DEFINED);
			return false;
		}
		if (!isParameterValid4DataSet({parameter: right, topics, expectedTypes, array, reasons})) {
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
	reasons: (reason: ParameterInvalidReason) => void;
}): boolean => {
	const {parameter, topics, expectedTypes, array = false, reasons} = options;
	if (!parameter) {
		reasons(ParameterInvalidReason.PARAMETER_NOT_DEFINED);
		return false;
	}
	if (isTopicFactorParameter(parameter)) {
		if (array) {
			reasons(ParameterInvalidReason.FACTOR_TYPE_NOT_MATCHED);
			return false;
		} else {
			return isTopicFactorParameterValid({parameter, topics, expectedTypes, reasons});
		}
	} else if (isConstantParameter(parameter)) {
		return isConstantParameterValid({parameter, expectedTypes, array, reasons});
	} else if (isComputedParameter(parameter)) {
		return isComputedParameterValid({parameter, topics, expectedTypes, array, reasons});
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
 * constant parameter in dataset-and-palette doesn't support {} syntax, just check value
 */
const isConstantParameterValid = (options: {
	parameter: ConstantParameter;
	expectedTypes: ValueTypes;
	array: boolean;
	reasons: (reason: ParameterInvalidReason) => void;
}): boolean => {
	const {parameter, expectedTypes, array, reasons} = options;

	const value = (parameter.value || '').trim();
	if (/^.*{.+}.*$/.test(value)) {
		return true;
	}
	let check = (type: ValueType) => isValueValid(value, type);
	if (array) {
		const values = value.split(',').map(x => x.trim());
		check = (type: ValueType) => values.every(value => isValueValid(value, type));
	}
	const passed = expectedTypes.some(expectedType => expectedType === AnyFactorType.ANY || check(expectedType));
	if (!passed) {
		reasons(ParameterInvalidReason.CONSTANT_TYPE_NOT_MATCHED);
	}
	return passed;
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
		// no factor, failure
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
	topics: Array<Topic>;
	expectedTypes: ValueTypes;
	array: boolean;
	reasons: (reason: ParameterInvalidReason) => void;
}): boolean => {
	const {parameter, topics, expectedTypes, array, reasons} = options;

	const {type: computeType, parameters} = parameter;
	if (!computeType) {
		// type must exists
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

	if (array && computeType !== ParameterComputeType.CASE_THEN) {
		// only case-then can produce array result
		reasons(ParameterInvalidReason.COMPUTE_RETURN_TYPE_NOT_MATCHED);
		return false;
	}

	if (!isComputeTypeValid({computeType, expectedTypes, reasons})) {
		return false;
	}

	const subTypes = computeValidTypesForSubParameter(computeType, expectedTypes);
	return parameters.every(parameter => {
		return isParameterValid4DataSet({parameter, topics, expectedTypes: subTypes, array, reasons});
	});
};
