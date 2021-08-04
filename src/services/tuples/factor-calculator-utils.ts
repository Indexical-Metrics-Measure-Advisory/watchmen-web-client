import {
	AnyFactorType,
	DeclaredVariables,
	Parameter,
	ParameterComputeType,
	ParameterExpressionOperator,
	ValueTypeOfParameter,
	ValueTypes,
	ValueTypesOfParameter,
	VariablePredefineFunctions
} from './factor-calculator-types';
import {CompatibleTypes, Factor, FactorType} from './factor-types';
import {Topic, TopicKind, TopicType} from './topic-types';
import {getCurrentTime} from '../utils';
import {isComputedParameter, isConstantParameter, isTopicFactorParameter} from './parameter-utils';

export const createUnknownTopic = (topicId: string, name: string = 'Unknown Topic'): Topic => {
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
export const createUnknownFactor = (factorId: string, name: string = 'Unknown Factor'): Factor => {
	return {
		factorId,
		name,
		type: FactorType.TEXT,
		label: '',
		createTime: getCurrentTime(),
		lastModified: getCurrentTime()
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

/**
 * factor type can write to one of given expected types or not
 */
export const isFactorTypeCompatibleWith = (factorType: FactorType, expectedTypes: ValueTypes): boolean => {
	if (expectedTypes.includes(AnyFactorType.ANY)) {
		return true;
	} else if (expectedTypes.includes(AnyFactorType.ERROR)) {
		return true;
	}

	if (factorType === FactorType.TEXT) {
		// assume text can be cast to anything
		return true;
	}

	return expectedTypes.some(expectedType => {
		const {includes = [], excludes = []} = CompatibleTypes[expectedType as FactorType] || {};
		return (includes.length === 0 || includes.includes(factorType)) && !excludes.includes(factorType);
	});
};

/**
 * @param computeType compute type of compute parameter
 * @param expectedTypes expected types after compute
 */
export const isComputeTypeValid = (computeType: ParameterComputeType, expectedTypes: ValueTypes): boolean => {
	switch (computeType) {
		case ParameterComputeType.CASE_THEN:
			// case then can returns any type
			return true;
		case ParameterComputeType.ADD:
		case ParameterComputeType.SUBTRACT:
		case ParameterComputeType.MULTIPLY:
		case ParameterComputeType.DIVIDE:
		case ParameterComputeType.MODULUS:
			return isFactorTypeCompatibleWith(FactorType.NUMBER, expectedTypes);
		case ParameterComputeType.YEAR_OF:
			return isFactorTypeCompatibleWith(FactorType.YEAR, expectedTypes);
		case ParameterComputeType.HALF_YEAR_OF:
			return isFactorTypeCompatibleWith(FactorType.HALF_YEAR, expectedTypes);
		case ParameterComputeType.QUARTER_OF:
			return isFactorTypeCompatibleWith(FactorType.QUARTER, expectedTypes);
		case ParameterComputeType.MONTH_OF:
			return isFactorTypeCompatibleWith(FactorType.MONTH, expectedTypes);
		case ParameterComputeType.WEEK_OF_YEAR:
			return isFactorTypeCompatibleWith(FactorType.WEEK_OF_YEAR, expectedTypes);
		case ParameterComputeType.WEEK_OF_MONTH:
			return isFactorTypeCompatibleWith(FactorType.WEEK_OF_MONTH, expectedTypes);
		case ParameterComputeType.DAY_OF_MONTH:
			return isFactorTypeCompatibleWith(FactorType.DAY_OF_MONTH, expectedTypes);
		case ParameterComputeType.DAY_OF_WEEK:
			return isFactorTypeCompatibleWith(FactorType.DAY_OF_WEEK, expectedTypes);
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
				return [{array: false, type: FactorType.NUMBER}]
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

