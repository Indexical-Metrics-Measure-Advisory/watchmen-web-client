import {
	ComputedParameter, ConstantParameter,
	ParameterFrom,
	TopicFactorParameter
} from '../../../../../../services/tuples/factor-calculator-types';
import { ParameterCalculatorDefsMap } from '../../../../../../services/tuples/factor-calculator-utils';

export const createTopicFactorParameter = (): TopicFactorParameter => {
	return { from: ParameterFrom.TOPIC, topicId: '', factorId: '' };
};
export const createConstantParameter = (): ConstantParameter => {
	return { from: ParameterFrom.CONSTANT, value: '' };
};

export const canDeleteAnyParameter = (parent: ComputedParameter) => {
	const computeType = parent.type;
	const calculatorDef = ParameterCalculatorDefsMap[computeType];
	const minParamCount = calculatorDef.minParameterCount || calculatorDef.parameterCount || 1;
	const currentCount = parent.parameters.length;
	return currentCount > minParamCount;
};
export const canAddMoreParameter = (parent: ComputedParameter) => {
	const computeType = parent.type;
	const calculatorDef = ParameterCalculatorDefsMap[computeType];
	const maxParamCount = calculatorDef.maxParameterCount || calculatorDef.parameterCount || Infinity;
	const currentCount = parent.parameters.length;
	return currentCount < maxParamCount;
};
