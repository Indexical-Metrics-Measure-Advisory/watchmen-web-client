import {
	ConstantParameter,
	ParameterFrom,
	TopicFactorParameter
} from '../../../../../../../services/tuples/factor-calculator-types';

export const createTopicFactorParameter = (): TopicFactorParameter => {
	return { from: ParameterFrom.TOPIC, topicId: '', factorId: '' };
};
export const createConstantParameter = (): ConstantParameter => {
	return { from: ParameterFrom.CONSTANT, value: '' };
};
