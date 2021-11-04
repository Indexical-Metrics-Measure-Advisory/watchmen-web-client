import {getCurrentTime} from '../utils';
import {
	AnyFactorType,
	DeclaredVariables,
	Parameter,
	ParameterComputeType,
	ParameterExpressionOperator,
	ParameterInvalidReason,
	ParsedVariablePredefineFunctions,
	ValueTypeOfParameter,
	ValueTypes,
	ValueTypesOfParameter,
	VariablePredefineFunctions
} from './factor-calculator-types';
import {CompatibleTypes, Factor, FactorId, FactorType} from './factor-types';
import {isComputedParameter, isConstantParameter, isTopicFactorParameter} from './parameter-utils';
import {Topic, TopicId, TopicKind, TopicType} from './topic-types';

export const createUnknownTopic = (topicId: TopicId, name: string = 'Unknown Topic'): Topic => {
	return {
		topicId,
		name,
		kind: TopicKind.SYSTEM,
		type: TopicType.DISTINCT,
		factors: [] as Array<Factor>,
		createTime: getCurrentTime(),
		lastModified: getCurrentTime()
	};
};
export const createUnknownFactor = (factorId: FactorId, name: string = 'Unknown Factor'): Factor => {
	return {
		factorId,
		name,
		type: FactorType.TEXT,
		label: '',
		createTime: getCurrentTime(),
		lastModified: getCurrentTime()
	};
};

export const findSelectedTopic = (topics: Array<Topic>, topicId?: TopicId, extraTopicName?: string): { selected: Topic | null, extra: Topic | null } => {
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
export const findSelectedFactor = (topic?: Topic | null, factorId?: FactorId, extraFactorName?: string): { selected: Factor | null, extra: Factor | null } => {
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

/**
 * factor type can write to one of given expected types or not
 */
export const isFactorTypeCompatibleWith = (options: {
	factorType: FactorType;
	expectedTypes: ValueTypes;
	reasons: (reason: ParameterInvalidReason) => void;
}): boolean => {
	const {factorType, expectedTypes, reasons} = options;

	if (expectedTypes.includes(AnyFactorType.ANY)) {
		return true;
	} else if (expectedTypes.includes(AnyFactorType.ERROR)) {
		return true;
	}

	if (factorType === FactorType.TEXT) {
		// assume text can be cast to anything
		return true;
	}

	const passed = expectedTypes.some(expectedType => {
		const {includes = [], excludes = []} = CompatibleTypes[expectedType as FactorType] || {};
		return (includes.length === 0 || includes.includes(factorType)) && !excludes.includes(factorType);
	});

	if (!passed) {
		reasons(ParameterInvalidReason.FACTOR_TYPE_NOT_MATCHED);
	}

	return passed;
};

/**
 * @param options
 * @param options.computeType compute type of compute parameter
 * @param options.expectedTypes expected types after compute
 */
export const isComputeTypeValid = (options: {
	computeType: ParameterComputeType;
	expectedTypes: ValueTypes;
	reasons: (reason: ParameterInvalidReason) => void;
}): boolean => {
	const {computeType, expectedTypes, reasons} = options;

	// delegate reason to compute type not matched
	const delegate = () => reasons(ParameterInvalidReason.COMPUTE_RETURN_TYPE_NOT_MATCHED);

	switch (computeType) {
		case ParameterComputeType.CASE_THEN:
			// case then can returns any type
			return true;
		case ParameterComputeType.ADD:
		case ParameterComputeType.SUBTRACT:
		case ParameterComputeType.MULTIPLY:
		case ParameterComputeType.DIVIDE:
		case ParameterComputeType.MODULUS:
			return isFactorTypeCompatibleWith({factorType: FactorType.NUMBER, expectedTypes, reasons: delegate});
		case ParameterComputeType.YEAR_OF:
			return isFactorTypeCompatibleWith({factorType: FactorType.YEAR, expectedTypes, reasons: delegate});
		case ParameterComputeType.HALF_YEAR_OF:
			return isFactorTypeCompatibleWith({factorType: FactorType.HALF_YEAR, expectedTypes, reasons: delegate});
		case ParameterComputeType.QUARTER_OF:
			return isFactorTypeCompatibleWith({factorType: FactorType.QUARTER, expectedTypes, reasons: delegate});
		case ParameterComputeType.MONTH_OF:
			return isFactorTypeCompatibleWith({factorType: FactorType.MONTH, expectedTypes, reasons: delegate});
		case ParameterComputeType.WEEK_OF_YEAR:
			return isFactorTypeCompatibleWith({factorType: FactorType.WEEK_OF_YEAR, expectedTypes, reasons: delegate});
		case ParameterComputeType.WEEK_OF_MONTH:
			return isFactorTypeCompatibleWith({factorType: FactorType.WEEK_OF_MONTH, expectedTypes, reasons: delegate});
		case ParameterComputeType.DAY_OF_MONTH:
			return isFactorTypeCompatibleWith({factorType: FactorType.DAY_OF_MONTH, expectedTypes, reasons: delegate});
		case ParameterComputeType.DAY_OF_WEEK:
			return isFactorTypeCompatibleWith({factorType: FactorType.DAY_OF_WEEK, expectedTypes, reasons: delegate});
		case ParameterComputeType.NONE:
		default:
			return true;
	}
};

/**
 * @param computeType compute type
 * @param expectedTypes expected types after compute
 * @return factor types expected for sub parameters
 */
export const computeValidTypesForSubParameter = (computeType: ParameterComputeType, expectedTypes: ValueTypes): ValueTypes => {
	switch (computeType) {
		case ParameterComputeType.CASE_THEN:
			// case then can returns any type
			return expectedTypes;
		case ParameterComputeType.ADD:
		case ParameterComputeType.SUBTRACT:
		case ParameterComputeType.MULTIPLY:
		case ParameterComputeType.DIVIDE:
		case ParameterComputeType.MODULUS:
			return CompatibleTypes[FactorType.NUMBER].includes || [];
		case ParameterComputeType.YEAR_OF:
		case ParameterComputeType.HALF_YEAR_OF:
		case ParameterComputeType.QUARTER_OF:
		case ParameterComputeType.MONTH_OF:
		case ParameterComputeType.WEEK_OF_YEAR:
		case ParameterComputeType.WEEK_OF_MONTH:
		case ParameterComputeType.DAY_OF_MONTH:
		case ParameterComputeType.DAY_OF_WEEK:
			return CompatibleTypes[FactorType.DATE].includes || [];
		case ParameterComputeType.NONE:
		default:
			return expectedTypes;
	}
};

const COMPARABLE_VALUE_TYPES = [...new Set([
	...(CompatibleTypes[FactorType.NUMBER].includes || []),
	...(CompatibleTypes[FactorType.DATE].includes || [])
])];
const OTHER_VALUE_TYPES = [AnyFactorType.ANY];
export const computeValidTypesByExpressionOperator = (operator?: ParameterExpressionOperator): ValueTypes => {
	switch (operator) {
		case ParameterExpressionOperator.MORE:
		case ParameterExpressionOperator.MORE_EQUALS:
		case ParameterExpressionOperator.LESS:
		case ParameterExpressionOperator.LESS_EQUALS:
			// all number, date
			return COMPARABLE_VALUE_TYPES;
		default:
			return OTHER_VALUE_TYPES;
	}
};

const digByFactor = (factor: Factor | undefined, names: Array<string>, types: ValueTypeOfParameter) => {
	const factorType: ValueTypeOfParameter = {
		topic: types.topic,
		factor,
		array: factor ? factor.type === FactorType.ARRAY : false,
		type: factor ? (factor.type === FactorType.ARRAY ? FactorType.OBJECT : factor.type) : AnyFactorType.ERROR
	};
	if (factor) {
		// factor found
		// return factor type if stop here
		// or keep dig deeper
		return names.length === 0 ? [factorType] : digByParentType(names, factorType);
	} else {
		// factor not found, there is no necessary to dig more, return directly
		return [factorType];
	}
};
const digByParentType = (names: Array<string>, types: ValueTypeOfParameter): ValueTypesOfParameter => {
	const [first, ...rest] = names;
	if (types.type !== FactorType.OBJECT) {
		// no an object, cannot determine deeper
		return [{array: types.array, type: AnyFactorType.ERROR}];
	} else if (!types.topic) {
		// not from topic, cannot determine deeper
		return [{array: types.array, type: AnyFactorType.ERROR}];
	} else if (!types.factor) {
		// from topic directly
		const factor: Factor | undefined = (types.topic.factors || []).find(f => f.name === first);
		return digByFactor(factor, rest, types);
	} else {
		// from a factor
		// factor which can hold properties is from raw topic
		// and its properties are declared by "prefix.x", prefix is name of parent factor.
		const prefix = types.factor.name;
		const factor: Factor | undefined = (types.topic.factors || []).find(f => f.name === `${prefix}.${first}`);
		return digByFactor(factor, rest, types);
	}
};
const digByParentTypes = (names: Array<string>, types: ValueTypesOfParameter): ValueTypesOfParameter => {
	return types.map(type => digByParentType(names, type)).flat();
};
export const isDateDiffConstant = (statement: string): { is: boolean, parsed?: ParsedVariablePredefineFunctions } => {
	const parsed = [
		VariablePredefineFunctions.YEAR_DIFF,
		VariablePredefineFunctions.MONTH_DIFF,
		VariablePredefineFunctions.DAY_DIFF
	].map((func: VariablePredefineFunctions) => {
		const matched = (statement || '').trim().match(new RegExp(`^(${func})\\s*\\((.+),(.+)\\)$`));
		if (matched) {
			const [, f, p1, p2] = matched;
			return {f: f as VariablePredefineFunctions, params: [p1.trim(), p2.trim()]};
		} else {
			return false;
		}
	}).filter(x => x !== false);
	if (parsed.length === 0) {
		return {is: false};
	} else {
		return {is: true, parsed: parsed[0] as ParsedVariablePredefineFunctions};
	}
};
/**
 * compute the possible types of given parameter,
 * according to topics and variables which are used in parameter definition.
 */
export const computeParameterTypes = (
	parameter: Parameter,
	topics: Array<Topic>,
	variables: DeclaredVariables,
	triggerTopic?: Topic
): ValueTypesOfParameter => {
	if (isTopicFactorParameter(parameter)) {
		// eslint-disable-next-line
		const topic = topics.find(topic => topic.topicId == parameter.topicId);
		// eslint-disable-next-line
		const factor: Factor | undefined = (topic?.factors || []).find(factor => factor.factorId == parameter.factorId);
		return [{
			topic,
			factor,
			// treat unknown factor as not an array
			array: factor ? factor.type === FactorType.ARRAY : false,
			// treat unknown factor as object, since topic is an object anyway
			type: factor ? (factor.type === FactorType.ARRAY ? FactorType.OBJECT : factor.type) : FactorType.OBJECT
		}];
	} else if (isComputedParameter(parameter)) {
		switch (parameter.type) {
			case ParameterComputeType.ADD:
			case ParameterComputeType.SUBTRACT:
			case ParameterComputeType.MULTIPLY:
			case ParameterComputeType.DIVIDE:
			case ParameterComputeType.MODULUS:
				// return FACTOR_NUMBER_TYPES.map(type => ({collection: false, type}));
				return [{array: false, type: FactorType.NUMBER}];
			case ParameterComputeType.YEAR_OF:
				return [{array: false, type: FactorType.YEAR}];
			case ParameterComputeType.HALF_YEAR_OF:
				return [{array: false, type: FactorType.HALF_YEAR}];
			case ParameterComputeType.QUARTER_OF:
				return [{array: false, type: FactorType.QUARTER}];
			case ParameterComputeType.MONTH_OF:
				return [{array: false, type: FactorType.MONTH}];
			case ParameterComputeType.WEEK_OF_YEAR:
				return [{array: false, type: FactorType.WEEK_OF_YEAR}];
			case ParameterComputeType.WEEK_OF_MONTH:
				return [{array: false, type: FactorType.WEEK_OF_MONTH}];
			case ParameterComputeType.DAY_OF_MONTH:
				return [{array: false, type: FactorType.DAY_OF_MONTH}];
			case ParameterComputeType.DAY_OF_WEEK:
				return [{array: false, type: FactorType.DAY_OF_WEEK}];
			case ParameterComputeType.CASE_THEN:
				return parameter.parameters.filter(x => !!x).map(sub => {
					return computeParameterTypes(sub, topics, variables, triggerTopic);
				}).flat();
			default:
				// cannot determine compute type, treated as any type
				return [{array: false, type: AnyFactorType.ANY}];
		}
	} else if (isConstantParameter(parameter)) {
		const statement = parameter.value || '';
		let segments = statement.match(/([^{]*({[^}]+})?)/g);
		if (segments == null) {
			// cannot match, treated as any type
			// actually never happens
			return [{array: false, type: AnyFactorType.ANY}];
		}

		segments = segments.filter(x => !!x);
		if (segments.length > 1) {
			// multiple segments, always concatenate to string
			return [{array: false, type: FactorType.TEXT}];
		} else if (segments.length === 1 && segments[0].startsWith('{') && segments[0].endsWith('}')) {
			// variable
			const name = segments[0].substring(1, segments[0].length - 1).trim();
			if (name === VariablePredefineFunctions.NEXT_SEQ) {
				return [{array: false, type: FactorType.SEQUENCE}];
			} else if (name.endsWith(`.${VariablePredefineFunctions.COUNT}`) || name.endsWith(`.${VariablePredefineFunctions.LENGTH}`)) {
				return [{array: false, type: FactorType.UNSIGNED}];
			} else if (name.endsWith(`.${VariablePredefineFunctions.SUM}`)) {
				return [{array: false, type: FactorType.NUMBER}];
			} else if (isDateDiffConstant(name).is) {
				return [{array: false, type: FactorType.NUMBER}];
			}
			const [first, ...rest] = name.split('.');
			let firstTypes: ValueTypesOfParameter;
			if (first === VariablePredefineFunctions.FROM_PREVIOUS_TRIGGER_DATA) {
				// retrieve previous trigger data object
				firstTypes = [{topic: triggerTopic, array: false, type: FactorType.OBJECT}];
			} else {
				// find in variables first
				const variable = variables.find(v => v.name === first);
				if (variable) {
					// find in variables
					firstTypes = variable.types;
				} else {
					// find in trigger data when not existed in variables
					const factor: Factor | undefined = (triggerTopic?.factors || []).find(f => f.name === first);
					firstTypes = [{
						topic: triggerTopic,
						factor,
						array: factor ? factor.type === FactorType.ARRAY : false,
						type: factor ? (factor.type === FactorType.ARRAY ? FactorType.OBJECT : factor.type) : AnyFactorType.ERROR
					}];
				}
			}
			if (rest.length === 0) {
				return firstTypes;
			} else {
				return digByParentTypes(rest, firstTypes);
			}
		} else {
			// constant value, a string
			return [{array: false, type: FactorType.TEXT}];
		}
	} else {
		// cannot determine parameter type
		return [{array: false, type: AnyFactorType.ANY}];
	}
};

export const getFactorType = (factorOrType: Factor | FactorType): FactorType => {
	if (typeof factorOrType === 'string') {
		return factorOrType;
	} else {
		return (factorOrType as Factor).type;
	}
};
export const isNumericFactor = (factorOrType: Factor | FactorType): boolean => {
	return [
		FactorType.NUMBER, FactorType.UNSIGNED,
		FactorType.RESIDENTIAL_AREA,
		FactorType.AGE,
		FactorType.BIZ_SCALE
	].includes(getFactorType(factorOrType));
};
export const isDateFactor = (factorOrType: Factor | FactorType): boolean => {
	return [
		FactorType.FULL_DATETIME, FactorType.DATETIME,
		FactorType.DATE, FactorType.DATE_OF_BIRTH
	].includes(getFactorType(factorOrType));
};
export const isDateTimeFactor = (factorOrType: Factor | FactorType): boolean => {
	return [FactorType.FULL_DATETIME, FactorType.DATETIME].includes(getFactorType(factorOrType));
};
export const isEnumFactor = (factorOrType: Factor | FactorType): boolean => {
	return [
		FactorType.ENUM,
		FactorType.CONTINENT, FactorType.REGION, FactorType.COUNTRY, FactorType.PROVINCE, FactorType.CITY,
		FactorType.RESIDENCE_TYPE,
		FactorType.GENDER, FactorType.OCCUPATION, FactorType.RELIGION, FactorType.NATIONALITY,
		FactorType.BIZ_TRADE
	].includes(getFactorType(factorOrType));
};
export const isIndicatorFactor = (factorOrType: Factor | FactorType) => {
	return [FactorType.NUMBER, FactorType.UNSIGNED].includes(getFactorType(factorOrType));
};
