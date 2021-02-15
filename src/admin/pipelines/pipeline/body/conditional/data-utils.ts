import {
	ConstantParameter,
	ParameterCondition,
	ParameterExpression,
	ParameterExpressionOperator,
	ParameterFrom,
	ParameterJoint,
	ParameterJointType,
	TopicFactorParameter
} from '../../../../../services/tuples/factor-calculator-types';

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
