import { createTopicFactorParameter } from '../../../../../console/connected-space/subject-view/def/data-utils';
import {
	ComputedParameter,
	ConstantParameter,
	ParameterCondition,
	ParameterExpression,
	ParameterExpressionOperator,
	ParameterFrom,
	ParameterJoint,
	ParameterJointType,
	TopicFactorParameter
} from '../../../../../services/tuples/factor-calculator-types';
import { ParameterCalculatorDefsMap } from '../../../../../services/tuples/factor-calculator-utils';

export const isJointParameter = (condition: ParameterCondition): condition is ParameterJoint => {
	return !!(condition as any).jointType;
};
export const isExpressionParameter = (condition: ParameterCondition): condition is ParameterExpression => {
	return !isJointParameter(condition);
};

export const createExpressionParameter = (): ParameterExpression => {
	return {
		left: { from: ParameterFrom.TOPIC, topicId: '', factorId: '' } as TopicFactorParameter,
		operator: ParameterExpressionOperator.EQUALS,
		right: { from: ParameterFrom.CONSTANT, value: '' } as ConstantParameter
	};
};
export const createJointParameter = (jointType: ParameterJointType): ParameterJoint => {
	return {
		jointType: jointType || ParameterJointType.AND,
		filters: [ createExpressionParameter() ]
	}
};

export const defendParameters = (parent: ComputedParameter) => {
	const { type: computeType } = parent;
	const calculatorDef = ParameterCalculatorDefsMap[computeType];
	const maxParamCount = calculatorDef.maxParameterCount || calculatorDef.parameterCount || Infinity;
	if (parent.parameters.length > maxParamCount) {
		parent.parameters.length = maxParamCount;
	}
	const minParamCount = calculatorDef.minParameterCount || calculatorDef.parameterCount || 1;
	if (parent.parameters.length < minParamCount) {
		new Array(minParamCount - parent.parameters.length).fill(1).forEach(() => {
			parent.parameters.push(createTopicFactorParameter());
		});
	}
};