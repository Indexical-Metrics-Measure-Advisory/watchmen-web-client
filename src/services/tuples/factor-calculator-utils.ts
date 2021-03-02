import dayjs from 'dayjs';
import {
	Computed,
	ComputedParameter,
	ConstantParameter,
	Parameter,
	ParameterComputeType,
	ParameterCondition,
	ParameterExpression,
	ParameterExpressionOperator,
	ParameterJoint,
	ParameterKind,
	ParameterType,
	TopicFactorParameter
} from './factor-calculator-types';
import { FactorType } from './factor-types';
import { Topic } from './topic-types';

export const isTopicFactorParameter = (param: Parameter): param is TopicFactorParameter => param.kind === ParameterKind.TOPIC;
export const isConstantParameter = (param: Parameter): param is ConstantParameter => param.kind === ParameterKind.CONSTANT;
export const isComputedParameter = (param: Parameter): param is ComputedParameter => param.kind === ParameterKind.COMPUTED;

export const isJointParameter = (condition: ParameterCondition): condition is ParameterJoint => {
	return !!(condition as any).jointType;
};
export const isExpressionParameter = (condition: ParameterCondition): condition is ParameterExpression => {
	return !isJointParameter(condition);
};

export const isParameterType = (parameterType: ParameterType | FactorType): parameterType is ParameterType => {
	return parameterType.startsWith('pt-');
};
export const isFactorType = (parameterType: ParameterType | FactorType): parameterType is FactorType => {
	return !parameterType.startsWith('pt-');
};

export const isConstantValueTypeMatched = (value: string, type: ParameterType | FactorType): boolean => {
	switch (type) {
		// always matched
		case ParameterType.ANY:
		case ParameterType.TEXT:
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
		case ParameterType.ARRAY:
		case FactorType.OBJECT:
		case FactorType.ARRAY:
		case FactorType.SEQUENCE:
			// sequence factor never occurs in any expression/filter
			return false;

		// enum
		case ParameterType.ENUM:
		case FactorType.ENUM:
		case FactorType.CONTINENT:
		case FactorType.REGION:
		case FactorType.COUNTRY:
		case FactorType.PROVINCE:
		case FactorType.CITY:
		case FactorType.RESIDENCE_TYPE:
		case FactorType.HALF_YEAR:
		case FactorType.QUARTER:
		case FactorType.SEASON:
		case FactorType.HALF_MONTH:
		case FactorType.TEN_DAYS:
		case FactorType.WEEK_OF_YEAR:
		case FactorType.WEEK_OF_MONTH:
		case FactorType.HALF_WEEK:
		case FactorType.DAY_OF_WEEK:
		case FactorType.DAY_KIND:
		case FactorType.HOUR_KIND:
		case FactorType.AM_PM:
		case FactorType.GENDER:
		case FactorType.OCCUPATION:
		case FactorType.RELIGION:
		case FactorType.NATIONALITY:
		case FactorType.BIZ_TRADE:
			return false;

		// numeric
		case ParameterType.NUMBER:
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

		// datetime
		case ParameterType.DATE:
		case FactorType.DATE:
		case FactorType.DATE_OF_BIRTH:
			return !!value && !!dayjs(value, [ 'YYYY/MM/DD', 'YYYY-MM-DD' ], true);
		case ParameterType.TIME:
		case FactorType.TIME:
			return !!value && !!dayjs(value, 'HH:mm:ss', true);
		case ParameterType.DATETIME:
		case FactorType.DATETIME:
			return !!value && !!dayjs(value, [ 'YYYY/MM/DD HH:mm:ss', 'YYYY-MM-DD HH:mm:ss' ], true);

		// boolean
		case ParameterType.BOOLEAN:
		case FactorType.BOOLEAN:
			return [ 'true', 'false' ].includes(value.toLowerCase());
	}
};

export const ParameterAndFactorTypeMapping: { [key in ParameterType]: (factorType: FactorType) => boolean } = {
	[ParameterType.ANY]: () => true,
	[ParameterType.NUMBER]: (factorType: FactorType) => {
		return [
			FactorType.NUMBER, FactorType.UNSIGNED,
			FactorType.FLOOR, FactorType.RESIDENTIAL_AREA,
			FactorType.AGE,
			FactorType.BIZ_SCALE,
			FactorType.YEAR, FactorType.MONTH
		].includes(factorType);
	},
	[ParameterType.TEXT]: (factorType: FactorType) => {
		return [ FactorType.TEXT ].includes(factorType);
	},
	[ParameterType.DATE]: (factorType: FactorType) => {
		return [ FactorType.DATE, FactorType.DATETIME ].includes(factorType);
	},
	[ParameterType.TIME]: (factorType: FactorType) => {
		return [ FactorType.TIME, FactorType.DATETIME ].includes(factorType);
	},
	[ParameterType.DATETIME]: (factorType: FactorType) => {
		return [ FactorType.DATETIME ].includes(factorType);
	},
	[ParameterType.BOOLEAN]: (factorType: FactorType) => {
		return [ FactorType.BOOLEAN ].includes(factorType);
	},
	[ParameterType.ENUM]: (factorType: FactorType) => {
		return [
			FactorType.CONTINENT, FactorType.REGION, FactorType.COUNTRY, FactorType.PROVINCE, FactorType.CITY, FactorType.RESIDENCE_TYPE,
			FactorType.HALF_YEAR, FactorType.QUARTER, FactorType.SEASON, FactorType.HALF_MONTH, FactorType.TEN_DAYS, FactorType.HALF_WEEK,
			FactorType.DAY_OF_WEEK, FactorType.DAY_KIND, FactorType.HOUR_KIND, FactorType.AM_PM,
			FactorType.GENDER, FactorType.OCCUPATION, FactorType.RELIGION, FactorType.NATIONALITY,
			FactorType.BIZ_TRADE,
			FactorType.ENUM
		].includes(factorType);
	},
	[ParameterType.ARRAY]: (factorType: FactorType) => {
		return [ FactorType.ARRAY ].includes(factorType);
	}
};

export interface ParameterCalculatorSupporting {
	parameterTypes: Array<ParameterType | FactorType>;
	/**
	 * if result type is not given, use first parameter type instead
	 */
	resultType?: FactorType;
}

export interface ParameterCalculatorDef {
	/**
	 * calculator name
	 */
	name: ParameterComputeType;
	/**
	 * how many parameters this calculator accepted
	 */
	parameterCount?: number;
	minParameterCount?: number;
	maxParameterCount?: number;
	/**
	 * supported types
	 */
	supports: Array<ParameterCalculatorSupporting>;
}

export const ParameterCalculatorDefsMap: { [key in ParameterComputeType]: ParameterCalculatorDef } = {
	[ParameterComputeType.NONE]: {
		name: ParameterComputeType.NONE, parameterCount: 1,
		supports: [ { parameterTypes: [ ParameterType.ANY ] } ]
	},
	[ParameterComputeType.ADD]: {
		name: ParameterComputeType.ADD, minParameterCount: 2,
		supports: [ {
			parameterTypes: [ ParameterType.NUMBER, ParameterType.NUMBER ],
			resultType: FactorType.NUMBER
		} ]
	},
	[ParameterComputeType.SUBTRACT]: {
		name: ParameterComputeType.SUBTRACT, minParameterCount: 2,
		supports: [ {
			parameterTypes: [ ParameterType.NUMBER, ParameterType.NUMBER ],
			resultType: FactorType.NUMBER
		} ]
	},
	[ParameterComputeType.MULTIPLY]: {
		name: ParameterComputeType.MULTIPLY, minParameterCount: 2,
		supports: [ {
			parameterTypes: [ ParameterType.NUMBER, ParameterType.NUMBER ],
			resultType: FactorType.NUMBER
		} ]
	},
	[ParameterComputeType.DIVIDE]: {
		name: ParameterComputeType.DIVIDE, minParameterCount: 2,
		supports: [ {
			parameterTypes: [ ParameterType.NUMBER, ParameterType.NUMBER ],
			resultType: FactorType.NUMBER
		} ]
	},
	[ParameterComputeType.MODULUS]: {
		name: ParameterComputeType.MODULUS, minParameterCount: 2,
		supports: [ {
			parameterTypes: [ ParameterType.NUMBER, ParameterType.NUMBER ],
			resultType: FactorType.NUMBER
		} ]
	},
	[ParameterComputeType.YEAR_OF]: {
		name: ParameterComputeType.YEAR_OF, parameterCount: 1,
		supports: [ {
			parameterTypes: [ ParameterType.DATE ],
			resultType: FactorType.YEAR
		}, {
			parameterTypes: [ ParameterType.DATETIME ],
			resultType: FactorType.YEAR
		} ]
	},
	[ParameterComputeType.HALF_YEAR_OF]: {
		name: ParameterComputeType.HALF_YEAR_OF, parameterCount: 1,
		supports: [ {
			parameterTypes: [ ParameterType.DATE ],
			resultType: FactorType.HALF_YEAR
		}, {
			parameterTypes: [ ParameterType.DATETIME ],
			resultType: FactorType.HALF_YEAR
		} ]
	},
	[ParameterComputeType.QUARTER_OF]: {
		name: ParameterComputeType.QUARTER_OF, parameterCount: 1,
		supports: [ {
			parameterTypes: [ ParameterType.DATE ],
			resultType: FactorType.QUARTER
		}, {
			parameterTypes: [ ParameterType.DATETIME ],
			resultType: FactorType.QUARTER
		}, {
			parameterTypes: [ FactorType.MONTH ],
			resultType: FactorType.QUARTER
		} ]
	},
	[ParameterComputeType.MONTH_OF]: {
		name: ParameterComputeType.MONTH_OF, parameterCount: 1,
		supports: [ {
			parameterTypes: [ ParameterType.DATE ],
			resultType: FactorType.MONTH
		}, {
			parameterTypes: [ ParameterType.DATETIME ],
			resultType: FactorType.MONTH
		} ]
	},
	[ParameterComputeType.WEEK_OF_YEAR]: {
		name: ParameterComputeType.WEEK_OF_YEAR, parameterCount: 1,
		supports: [ {
			parameterTypes: [ ParameterType.DATE ],
			resultType: FactorType.WEEK_OF_YEAR
		}, {
			parameterTypes: [ ParameterType.DATETIME ],
			resultType: FactorType.WEEK_OF_YEAR
		} ]
	},
	[ParameterComputeType.WEEK_OF_MONTH]: {
		name: ParameterComputeType.WEEK_OF_MONTH, parameterCount: 1,
		supports: [ {
			parameterTypes: [ ParameterType.DATE ],
			resultType: FactorType.WEEK_OF_MONTH
		}, {
			parameterTypes: [ ParameterType.DATETIME ],
			resultType: FactorType.WEEK_OF_MONTH
		} ]
	},
	[ParameterComputeType.DAY_OF_MONTH]: {
		name: ParameterComputeType.DAY_OF_WEEK, parameterCount: 1,
		supports: [ {
			parameterTypes: [ ParameterType.DATE ],
			resultType: FactorType.DAY_OF_MONTH
		}, {
			parameterTypes: [ ParameterType.DATETIME ],
			resultType: FactorType.DAY_OF_MONTH
		} ]
	},
	[ParameterComputeType.DAY_OF_WEEK]: {
		name: ParameterComputeType.DAY_OF_WEEK, parameterCount: 1,
		supports: [ {
			parameterTypes: [ ParameterType.DATE ],
			resultType: FactorType.DAY_OF_WEEK
		}, {
			parameterTypes: [ ParameterType.DATETIME ],
			resultType: FactorType.DAY_OF_WEEK
		} ]
	}
};

export const canAddMoreParameter = (parent: ComputedParameter) => {
	const computeType = parent.type;
	const calculatorDef = ParameterCalculatorDefsMap[computeType];
	const maxParamCount = calculatorDef.maxParameterCount || calculatorDef.parameterCount || Infinity;
	const currentCount = parent.parameters.length;
	return currentCount < maxParamCount;
};

export const canDeleteAnyParameter = (parent: ComputedParameter) => {
	const computeType = parent.type;
	const calculatorDef = ParameterCalculatorDefsMap[computeType];
	const minParamCount = calculatorDef.minParameterCount || calculatorDef.parameterCount || 1;
	const currentCount = parent.parameters.length;
	return currentCount > minParamCount;
};

export interface Validation {
	pass: boolean;
	resultType?: FactorType;
}

export const isComputedValid = ({ type, parameters }: Computed, topics: Array<Topic>): Validation => {
	if (!type) {
		// type must exists
		return { pass: false };
	}
	const calculatorDef = ParameterCalculatorDefsMap[type];
	// no calculator
	if (calculatorDef.parameterCount && parameters.length !== calculatorDef.parameterCount) {
		// parameters length mismatch
		return { pass: false };
	}
	if (calculatorDef.minParameterCount && parameters.length < calculatorDef.minParameterCount) {
		// parameters length mismatch
		return { pass: false };
	}
	if (calculatorDef.maxParameterCount && parameters.length > calculatorDef.maxParameterCount) {
		// parameters length mismatch
		return { pass: false };
	}
	const hasEmptyParameter = parameters.some(param => !param);
	if (hasEmptyParameter) {
		return { pass: false };
	}
	let availableParameterTypes = calculatorDef.supports;
	const hasInvalidParameter = parameters.some((param, paramIndex) => {
		let matched: Array<ParameterCalculatorSupporting> = [];
		if (isConstantParameter(param)) {
			const value = param.value;
			// match value and type, get valid supporting
			matched = availableParameterTypes.filter(({ parameterTypes }) => isConstantValueTypeMatched(value, parameterTypes[paramIndex]));
		} else if (isTopicFactorParameter(param)) {
			if (!param.topicId || !param.factorId) {
				// no topic or no factor, failure
				return true;
			}
			// test factor type and parameter type
			// eslint-disable-next-line
			const topic = topics.find(topic => topic.topicId == param.topicId);
			if (!topic) {
				// topic not found, failure
				return true;
			}
			// eslint-disable-next-line
			const factor = topic.factors.find(factor => factor.factorId == param.factorId);
			if (!factor) {
				// factor not found, failure
				return true;
			}
			matched = availableParameterTypes.filter(({ parameterTypes }) => {
				if (isParameterType(parameterTypes[paramIndex])) {
					// check result type and parameter type, match use pre-definition
					return ParameterAndFactorTypeMapping[parameterTypes[paramIndex] as ParameterType](factor.type);
				} else if (isFactorType(parameterTypes[paramIndex])) {
					// check result type and factor type, exactly match
					return parameterTypes[paramIndex] === factor.type;
				} else {
					// never occurred
					return false;
				}
			});
		} else if (isComputedParameter(param)) {
			// test computed parameter
			const result = isComputedValid(param, topics);
			if (!result.pass) {
				// failed on computed valid check
				return true;
			}
			if (!result.resultType) {
				// return can be any, cannot check here, ignore.
				return false;
			}
			matched = availableParameterTypes.filter(({ parameterTypes }) => {
				if (isParameterType(parameterTypes[paramIndex])) {
					// check result type and parameter type, match use pre-definition
					return ParameterAndFactorTypeMapping[parameterTypes[paramIndex] as ParameterType](result.resultType!);
				} else if (isFactorType(parameterTypes[paramIndex])) {
					// check result type and factor type, exactly match
					return parameterTypes[paramIndex] === result.resultType;
				} else {
					// never occurred
					return false;
				}
			});
		}
		if (matched.length === 0) {
			// no matched, parameter is invalid, failure
			return true;
		} else {
			availableParameterTypes = matched;
			return false;
		}
	});
	return { pass: !hasInvalidParameter, resultType: availableParameterTypes[0].resultType };
};

export const isParameterValid = (parameter: Parameter, topics: Array<Topic>): Validation => {
	if (!parameter) {
		return { pass: false };
	}
	return isComputedValid({ type: ParameterComputeType.NONE, parameters: [ parameter ] }, topics);
};

export const isExpressionValid = (expression: ParameterExpression, topics: Array<Topic>): boolean => {
	const { left, operator, right } = expression;

	if (!left || !isParameterValid(left, topics)) {
		return false;
	}
	if (!operator) {
		return false;
	}
	return !(operator !== ParameterExpressionOperator.NOT_EMPTY
		&& operator !== ParameterExpressionOperator.EMPTY
		&& (!right || !isParameterValid(right, topics)));

};

export const isJointValid = (joint: ParameterJoint, topics: Array<Topic>): boolean => {
	const { jointType, filters } = joint;
	if (!jointType) {
		return false;
	}
	if (!filters || filters.length === 0) {
		return false;
	}

	return !filters.some(filter => {
		if (isJointParameter(filter)) {
			return !isJointValid(filter, topics);
		} else if (isExpressionParameter(filter)) {
			return !isExpressionValid(filter, topics);
		}
		return true;
	});
};