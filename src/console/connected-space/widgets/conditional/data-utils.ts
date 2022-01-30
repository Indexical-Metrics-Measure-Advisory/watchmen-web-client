import {
	ParameterExpression,
	ParameterExpressionOperator, ParameterJoint,
	ParameterJointType
} from '@/services/data/tuples/factor-calculator-types';
import {createConstantParameter, createTopicFactorParameter} from '@/services/data/tuples/parameter-utils';

export const createTopicEqualsConstantParameter = (): ParameterExpression => {
	return {
		left: createTopicFactorParameter(),
		operator: ParameterExpressionOperator.EQUALS,
		right: createConstantParameter()
	};
};
export const createJointParameter = (jointType?: ParameterJointType): ParameterJoint => {
	return {
		jointType: jointType || ParameterJointType.AND,
		filters: [createTopicEqualsConstantParameter()]
	};
};