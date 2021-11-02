import {
	ComputedParameter,
	ConstantParameter,
	Parameter,
	ParameterComputeType,
	ParameterCondition,
	ParameterExpression,
	ParameterJoint,
	ParameterJointType,
	ParameterKind,
	TopicFactorParameter
} from './factor-calculator-types';
import {FactorId} from './factor-types';
import {TopicId} from './topic-types';

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
}

export const ParameterCalculatorDefsMap: Record<ParameterComputeType, ParameterCalculatorDef> = {
	[ParameterComputeType.NONE]: {name: ParameterComputeType.NONE, parameterCount: 1},
	[ParameterComputeType.ADD]: {name: ParameterComputeType.ADD, minParameterCount: 2},
	[ParameterComputeType.SUBTRACT]: {name: ParameterComputeType.SUBTRACT, minParameterCount: 2},
	[ParameterComputeType.MULTIPLY]: {name: ParameterComputeType.MULTIPLY, minParameterCount: 2},
	[ParameterComputeType.DIVIDE]: {name: ParameterComputeType.DIVIDE, minParameterCount: 2},
	[ParameterComputeType.MODULUS]: {name: ParameterComputeType.MODULUS, minParameterCount: 2},
	[ParameterComputeType.YEAR_OF]: {name: ParameterComputeType.YEAR_OF, parameterCount: 1},
	[ParameterComputeType.HALF_YEAR_OF]: {name: ParameterComputeType.HALF_YEAR_OF, parameterCount: 1},
	[ParameterComputeType.QUARTER_OF]: {name: ParameterComputeType.QUARTER_OF, parameterCount: 1},
	[ParameterComputeType.MONTH_OF]: {name: ParameterComputeType.MONTH_OF, parameterCount: 1},
	[ParameterComputeType.WEEK_OF_YEAR]: {name: ParameterComputeType.WEEK_OF_YEAR, parameterCount: 1},
	[ParameterComputeType.WEEK_OF_MONTH]: {name: ParameterComputeType.WEEK_OF_MONTH, parameterCount: 1},
	[ParameterComputeType.DAY_OF_MONTH]: {name: ParameterComputeType.DAY_OF_WEEK, parameterCount: 1},
	[ParameterComputeType.DAY_OF_WEEK]: {name: ParameterComputeType.DAY_OF_WEEK, parameterCount: 1},
	[ParameterComputeType.CASE_THEN]: {name: ParameterComputeType.CASE_THEN, minParameterCount: 1}
};

export const isTopicFactorParameter = (param: Parameter): param is TopicFactorParameter => param.kind === ParameterKind.TOPIC;
export const isConstantParameter = (param: Parameter): param is ConstantParameter => param.kind === ParameterKind.CONSTANT;
export const isComputedParameter = (param: Parameter): param is ComputedParameter => param.kind === ParameterKind.COMPUTED;

export const isJointParameter = (condition: ParameterCondition): condition is ParameterJoint => {
	return !!(condition as any).jointType;
};
export const isExpressionParameter = (condition: ParameterCondition): condition is ParameterExpression => {
	return !isJointParameter(condition);
};

export const createTopicFactorParameter = (topicId?: TopicId, factorId?: FactorId): TopicFactorParameter => {
	return {kind: ParameterKind.TOPIC, topicId: topicId || '', factorId: factorId || ''};
};
export const createConstantParameter = (): ConstantParameter => {
	return {kind: ParameterKind.CONSTANT, value: ''};
};

export const defendComputedParameter = (parameter: ComputedParameter) => {
	parameter.type = parameter.type || ParameterComputeType.ADD;
	const calculatorDef = ParameterCalculatorDefsMap[parameter.type];
	const maxParamCount = calculatorDef.maxParameterCount || calculatorDef.parameterCount || Infinity;
	if (parameter.parameters.length > maxParamCount) {
		parameter.parameters.length = maxParamCount;
	}
	const minParamCount = calculatorDef.minParameterCount || calculatorDef.parameterCount || 1;
	if (parameter.parameters.length < minParamCount) {
		new Array(minParamCount - parameter.parameters.length).fill(1).forEach(() => {
			parameter.parameters.push(createTopicFactorParameter());
		});
	}
};

export const defendParameter = (parameter: Parameter) => {
	parameter.kind = parameter.kind || ParameterKind.TOPIC;
	if (isTopicFactorParameter(parameter)) {
		parameter.topicId = parameter.topicId || '';
		parameter.factorId = parameter.factorId || '';
	} else if (isConstantParameter(parameter)) {
		parameter.value = parameter.value || '';
	} else if (isComputedParameter(parameter)) {
		defendComputedParameter(parameter);
	}
};

export const defendParameterAndRemoveUnnecessary = (parameter: Parameter) => {
	if (isTopicFactorParameter(parameter)) {
		const old = parameter as any;
		delete old.value;
		delete old.type;
		delete old.parameters;
		old.topicId = old.topicId || '';
		old.factorId = old.factorId || '';
	} else if (isConstantParameter(parameter)) {
		const old = parameter as any;
		delete old.topicId;
		delete old.factorId;
		delete old.type;
		delete old.parameters;
		old.value = old.value || '';
	} else if (isComputedParameter(parameter)) {
		const old = parameter as any;
		delete old.topicId;
		delete old.factorId;
		delete old.value;
		old.type = old.type || ParameterComputeType.ADD;
		old.parameters = old.parameters || [createTopicFactorParameter(), createTopicFactorParameter()];
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

/**
 * remove joint which has no filters
 */
export const strictParameterJoint = (joint: ParameterJoint): ParameterJoint => {
	if (!joint.filters || joint.filters.length === 0) {
		return {jointType: joint.jointType || ParameterJointType.AND, filters: joint.filters || []};
	}

	return {
		...joint,
		filters: joint.filters.map(filter => {
			if (isExpressionParameter(filter)) {
				return filter;
			} else if (isJointParameter(filter)) {
				return strictParameterJoint(filter);
			}
			// never occurs
			throw new Error('Unsupported filter type.');
		}).filter(filter => {
			if (isJointParameter(filter)) {
				return filter.filters.length !== 0;
			}
			return true;
		})
	};
};
