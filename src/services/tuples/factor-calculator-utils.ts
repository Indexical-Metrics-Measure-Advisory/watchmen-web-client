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
	TopicFactorParameter,
	ValidFactorType,
	ValidFactorTypes
} from './factor-calculator-types';
import {Factor, FactorType} from './factor-types';
import {Topic, TopicKind, TopicType} from './topic-types';
import {getCurrentTime} from '../utils';

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
		case FactorType.MILLISECOND:
			return /^\d{1,3}$/.test(value);

		// datetime
		case ParameterType.DATE:
		case FactorType.DATE:
		case FactorType.DATE_OF_BIRTH:
			return !!value && !!dayjs(value, ['YYYY/MM/DD', 'YYYY-MM-DD'], true);
		case ParameterType.TIME:
		case FactorType.TIME:
			return !!value && !!dayjs(value, 'HH:mm:ss', true);
		case ParameterType.DATETIME:
		case FactorType.DATETIME:
			return !!value && !!dayjs(value, ['YYYY/MM/DD HH:mm:ss', 'YYYY-MM-DD HH:mm:ss'], true);
		case FactorType.FULL_DATETIME:
			return !!value && !!dayjs(value, ['YYYY/MM/DD HH:mm:ss.SSS', 'YYYY-MM-DD HH:mm:ss.SSS'], true);

		// boolean
		case ParameterType.BOOLEAN:
		case FactorType.BOOLEAN:
			return ['true', 'false'].includes(value.toLowerCase());
	}
};

// noinspection TypeScriptValidateTypes
export const ParameterAndFactorTypeMapping: { [key in ParameterType]: (factorType: FactorType) => boolean } = {
	[ParameterType.ANY]: () => true,
	[ParameterType.NUMBER]: (factorType: FactorType) => [
		FactorType.NUMBER, FactorType.UNSIGNED,
		FactorType.FLOOR, FactorType.RESIDENTIAL_AREA,
		FactorType.AGE,
		FactorType.BIZ_SCALE
	].includes(factorType),
	[ParameterType.TEXT]: (factorType: FactorType) => [FactorType.TEXT].includes(factorType),
	[ParameterType.DATE]: (factorType: FactorType) => [FactorType.DATE, FactorType.DATETIME, FactorType.FULL_DATETIME].includes(factorType),
	[ParameterType.TIME]: (factorType: FactorType) => [FactorType.TIME, FactorType.DATETIME, FactorType.FULL_DATETIME].includes(factorType),
	[ParameterType.DATETIME]: (factorType: FactorType) => [FactorType.DATETIME, FactorType.FULL_DATETIME].includes(factorType),
	[ParameterType.BOOLEAN]: (factorType: FactorType) => [FactorType.BOOLEAN].includes(factorType),
	[ParameterType.ENUM]: (factorType: FactorType) => [
		FactorType.CONTINENT, FactorType.REGION, FactorType.COUNTRY, FactorType.PROVINCE, FactorType.CITY, FactorType.RESIDENCE_TYPE,
		FactorType.HALF_YEAR, FactorType.QUARTER, FactorType.MONTH, FactorType.HALF_MONTH, FactorType.TEN_DAYS, FactorType.HALF_WEEK,
		FactorType.DAY_OF_WEEK, FactorType.DAY_KIND, FactorType.HOUR_KIND, FactorType.AM_PM,
		FactorType.GENDER, FactorType.OCCUPATION, FactorType.RELIGION, FactorType.NATIONALITY,
		FactorType.BIZ_TRADE,
		FactorType.ENUM
	].includes(factorType),
	[ParameterType.ARRAY]: (factorType: FactorType) => [FactorType.ARRAY].includes(factorType)
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
		supports: [{parameterTypes: [ParameterType.ANY]}]
	},
	[ParameterComputeType.ADD]: {
		name: ParameterComputeType.ADD, minParameterCount: 2,
		supports: [{
			parameterTypes: [ParameterType.NUMBER, ParameterType.NUMBER],
			resultType: FactorType.NUMBER
		}]
	},
	[ParameterComputeType.SUBTRACT]: {
		name: ParameterComputeType.SUBTRACT, minParameterCount: 2,
		supports: [{
			parameterTypes: [ParameterType.NUMBER, ParameterType.NUMBER],
			resultType: FactorType.NUMBER
		}]
	},
	[ParameterComputeType.MULTIPLY]: {
		name: ParameterComputeType.MULTIPLY, minParameterCount: 2,
		supports: [{
			parameterTypes: [ParameterType.NUMBER, ParameterType.NUMBER],
			resultType: FactorType.NUMBER
		}]
	},
	[ParameterComputeType.DIVIDE]: {
		name: ParameterComputeType.DIVIDE, minParameterCount: 2,
		supports: [{
			parameterTypes: [ParameterType.NUMBER, ParameterType.NUMBER],
			resultType: FactorType.NUMBER
		}]
	},
	[ParameterComputeType.MODULUS]: {
		name: ParameterComputeType.MODULUS, minParameterCount: 2,
		supports: [{
			parameterTypes: [ParameterType.NUMBER, ParameterType.NUMBER],
			resultType: FactorType.NUMBER
		}]
	},
	[ParameterComputeType.YEAR_OF]: {
		name: ParameterComputeType.YEAR_OF, parameterCount: 1,
		supports: [{
			parameterTypes: [ParameterType.DATE],
			resultType: FactorType.YEAR
		}, {
			parameterTypes: [ParameterType.DATETIME],
			resultType: FactorType.YEAR
		}]
	},
	[ParameterComputeType.HALF_YEAR_OF]: {
		name: ParameterComputeType.HALF_YEAR_OF, parameterCount: 1,
		supports: [{
			parameterTypes: [ParameterType.DATE],
			resultType: FactorType.HALF_YEAR
		}, {
			parameterTypes: [ParameterType.DATETIME],
			resultType: FactorType.HALF_YEAR
		}]
	},
	[ParameterComputeType.QUARTER_OF]: {
		name: ParameterComputeType.QUARTER_OF, parameterCount: 1,
		supports: [{
			parameterTypes: [ParameterType.DATE],
			resultType: FactorType.QUARTER
		}, {
			parameterTypes: [ParameterType.DATETIME],
			resultType: FactorType.QUARTER
		}, {
			parameterTypes: [FactorType.MONTH],
			resultType: FactorType.QUARTER
		}]
	},
	[ParameterComputeType.MONTH_OF]: {
		name: ParameterComputeType.MONTH_OF, parameterCount: 1,
		supports: [{
			parameterTypes: [ParameterType.DATE],
			resultType: FactorType.MONTH
		}, {
			parameterTypes: [ParameterType.DATETIME],
			resultType: FactorType.MONTH
		}]
	},
	[ParameterComputeType.WEEK_OF_YEAR]: {
		name: ParameterComputeType.WEEK_OF_YEAR, parameterCount: 1,
		supports: [{
			parameterTypes: [ParameterType.DATE],
			resultType: FactorType.WEEK_OF_YEAR
		}, {
			parameterTypes: [ParameterType.DATETIME],
			resultType: FactorType.WEEK_OF_YEAR
		}]
	},
	[ParameterComputeType.WEEK_OF_MONTH]: {
		name: ParameterComputeType.WEEK_OF_MONTH, parameterCount: 1,
		supports: [{
			parameterTypes: [ParameterType.DATE],
			resultType: FactorType.WEEK_OF_MONTH
		}, {
			parameterTypes: [ParameterType.DATETIME],
			resultType: FactorType.WEEK_OF_MONTH
		}]
	},
	[ParameterComputeType.DAY_OF_MONTH]: {
		name: ParameterComputeType.DAY_OF_WEEK, parameterCount: 1,
		supports: [{
			parameterTypes: [ParameterType.DATE],
			resultType: FactorType.DAY_OF_MONTH
		}, {
			parameterTypes: [ParameterType.DATETIME],
			resultType: FactorType.DAY_OF_MONTH
		}]
	},
	[ParameterComputeType.DAY_OF_WEEK]: {
		name: ParameterComputeType.DAY_OF_WEEK, parameterCount: 1,
		supports: [{
			parameterTypes: [ParameterType.DATE],
			resultType: FactorType.DAY_OF_WEEK
		}, {
			parameterTypes: [ParameterType.DATETIME],
			resultType: FactorType.DAY_OF_WEEK
		}]
	},
	[ParameterComputeType.CASE_THEN]: {
		name: ParameterComputeType.CASE_THEN, minParameterCount: 2,
		supports: [{parameterTypes: [ParameterType.ANY]}]
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

export const isComputedValid = ({type, parameters}: Computed, topics: Array<Topic>): Validation => {
	if (!type) {
		// type must exists
		return {pass: false};
	}
	const calculatorDef = ParameterCalculatorDefsMap[type];
	// no calculator
	if (calculatorDef.parameterCount && parameters.length !== calculatorDef.parameterCount) {
		// parameters length mismatch
		return {pass: false};
	}
	if (calculatorDef.minParameterCount && parameters.length < calculatorDef.minParameterCount) {
		// parameters length mismatch
		return {pass: false};
	}
	if (calculatorDef.maxParameterCount && parameters.length > calculatorDef.maxParameterCount) {
		// parameters length mismatch
		return {pass: false};
	}
	const hasEmptyParameter = parameters.some(param => !param);
	if (hasEmptyParameter) {
		return {pass: false};
	}
	let availableParameterTypes = calculatorDef.supports;
	const hasInvalidParameter = parameters.some((param, paramIndex) => {
		let matched: Array<ParameterCalculatorSupporting> = [];
		if (isConstantParameter(param)) {
			const value = param.value;
			// match value and type, get valid supporting
			matched = availableParameterTypes.filter(({parameterTypes}) => {
				let type = parameterTypes[paramIndex] || parameterTypes[parameterTypes.length - 1];
				return isConstantValueTypeMatched(value, type);
			});
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
			matched = availableParameterTypes.filter(({parameterTypes}) => {
				let type = parameterTypes[paramIndex] || parameterTypes[parameterTypes.length - 1];
				if (isParameterType(type)) {
					// check result type and parameter type, match use pre-definition
					return ParameterAndFactorTypeMapping[type as ParameterType](factor.type);
				} else if (isFactorType(type)) {
					// check result type and factor type, exactly match
					return type === factor.type;
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
			matched = availableParameterTypes.filter(({parameterTypes}) => {
				let type = parameterTypes[paramIndex] || parameterTypes[parameterTypes.length - 1];
				if (isParameterType(type)) {
					// check result type and parameter type, match use pre-definition
					return ParameterAndFactorTypeMapping[type as ParameterType](result.resultType!);
				} else if (isFactorType(type)) {
					// check result type and factor type, exactly match
					return type === result.resultType;
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
	return {pass: !hasInvalidParameter, resultType: availableParameterTypes[0].resultType};
};

export const isParameterValid = (parameter: Parameter, topics: Array<Topic>): Validation => {
	if (!parameter) {
		return {pass: false};
	}
	return isComputedValid({type: ParameterComputeType.NONE, parameters: [parameter]}, topics);
};

export const isExpressionValid = (expression: ParameterExpression, topics: Array<Topic>): boolean => {
	const {left, operator, right} = expression;

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
	const {jointType, filters} = joint;
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

export const createUnknownTopic = (topicId: string, name: string = 'Unknown Topic'): Topic => {
	return {
		topicId,
		name,
		kind: TopicKind.SYSTEM,
		type: TopicType.DISTINCT,
		factors: [] as Array<Factor>,
		createTime: getCurrentTime(),
		lastModifyTime: getCurrentTime()
	};
};
export const createUnknownFactor = (factorId: string, name: string = 'Unknown Factor'): Factor => {
	return {
		factorId,
		name,
		type: FactorType.TEXT,
		label: '',
		createTime: getCurrentTime(),
		lastModifyTime: getCurrentTime()
	};
};

export const findSelectedTopic = (topics: Array<Topic>, topicId?: string, extraTopicName?: string): { selected: Topic | null, extra: Topic | null } => {
	let selectedTopic: Topic | null = null, extraTopic: Topic | null = null;
	if (topicId) {
		// eslint-disable-next-line
		selectedTopic = topics.find(topic => topic.topicId == topicId) || null;
		if (!selectedTopic) {
			extraTopic = createUnknownTopic(topicId, extraTopicName);
			selectedTopic = extraTopic;
		}
	}
	return {selected: selectedTopic, extra: extraTopic};
};
/**
 * find selected factor by given topic & factorId.
 * create extra factor when selection not found, and let selected to be extra one.
 */
export const findSelectedFactor = (topic?: Topic | null, factorId?: string, extraFactorName?: string): { selected: Factor | null, extra: Factor | null } => {
	let selectedFactor: Factor | null = null;
	let extraFactor: Factor | null = null;
	if (factorId) {
		if (topic) {
			// find factor in selected topic
			// eslint-disable-next-line
			selectedFactor = topic.factors.find(factor => factor.factorId == factorId) || null;
		}
		if (!selectedFactor) {
			extraFactor = createUnknownFactor(factorId, extraFactorName);
			selectedFactor = extraFactor;
		}
	}
	return {selected: selectedFactor, extra: extraFactor};
};

export const isFactorTypeValid = (factorType: FactorType, validType: ValidFactorType): boolean => {
	switch (validType) {
		case ValidFactorType.ANY:
			return true;
		case ValidFactorType.NUMBER:
			return ParameterAndFactorTypeMapping[ParameterType.NUMBER](factorType);
		case ValidFactorType.DATE:
			return ParameterAndFactorTypeMapping[ParameterType.DATE](factorType);
		case ValidFactorType.DATETIME:
			return ParameterAndFactorTypeMapping[ParameterType.DATETIME](factorType);
		default:
			return false;
	}
};
export const isFactorValid = (factor: Factor, validTypes: Array<ValidFactorType>): boolean => {
	return validTypes.some(validType => isFactorTypeValid(factor.type, validType));
};

export const isComputeTypeValid = (computeType: ParameterComputeType, validTypes: Array<ValidFactorType>): boolean => {
	switch (computeType) {
		case ParameterComputeType.CASE_THEN:
			// case then can returns any type
			return true;
		case ParameterComputeType.ADD:
		case ParameterComputeType.SUBTRACT:
		case ParameterComputeType.MULTIPLY:
		case ParameterComputeType.DIVIDE:
		case ParameterComputeType.MODULUS:
			return validTypes.includes(ValidFactorType.NUMBER) || validTypes.includes(ValidFactorType.ANY);
		case ParameterComputeType.YEAR_OF:
		case ParameterComputeType.HALF_YEAR_OF:
		case ParameterComputeType.QUARTER_OF:
		case ParameterComputeType.MONTH_OF:
		case ParameterComputeType.WEEK_OF_YEAR:
		case ParameterComputeType.WEEK_OF_MONTH:
		case ParameterComputeType.DAY_OF_MONTH:
		case ParameterComputeType.DAY_OF_WEEK:
			return validTypes.includes(ValidFactorType.ANY);
		case ParameterComputeType.NONE:
		default:
			return true;
	}
};

/**
 * @param parameter compute parameter
 * @param expectedTypes expected types after compute parameter
 */
export const computeValidTypesForSubParameter = (parameter: ComputedParameter, expectedTypes: Array<ValidFactorType>): Array<ValidFactorType> => {
	switch (parameter.type) {
		case ParameterComputeType.CASE_THEN:
			// case then can returns any type
			return expectedTypes;
		case ParameterComputeType.ADD:
		case ParameterComputeType.SUBTRACT:
		case ParameterComputeType.MULTIPLY:
		case ParameterComputeType.DIVIDE:
		case ParameterComputeType.MODULUS:
			return ValidFactorTypes.NUMBER;
		case ParameterComputeType.YEAR_OF:
		case ParameterComputeType.HALF_YEAR_OF:
		case ParameterComputeType.QUARTER_OF:
		case ParameterComputeType.MONTH_OF:
		case ParameterComputeType.WEEK_OF_YEAR:
		case ParameterComputeType.WEEK_OF_MONTH:
		case ParameterComputeType.DAY_OF_MONTH:
		case ParameterComputeType.DAY_OF_WEEK:
			return ValidFactorTypes.DATE;
		case ParameterComputeType.NONE:
		default:
			return expectedTypes;
	}
}