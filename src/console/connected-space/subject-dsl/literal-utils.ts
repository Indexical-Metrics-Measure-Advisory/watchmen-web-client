import {
	ComputedParameter,
	ConstantParameter,
	Parameter,
	ParameterKind,
	TopicFactorParameter
} from '@/services/data/tuples/factor-calculator-types';
import {Factor, FactorId} from '@/services/data/tuples/factor-types';
import {isComputedParameter, isConstantParameter, isTopicFactorParameter} from '@/services/data/tuples/parameter-utils';
import {Topic, TopicId} from '@/services/data/tuples/topic-types';
import {PrettyComputed, PrettyConstant, PrettyFactor} from './literal-types';

export const buildTopicsMap = (options: {
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
}) => {
	const {availableTopics, pickedTopics} = options;
	return {
		availableTopicsMap: availableTopics.reduce((map, topic) => {
			map.set(topic.topicId, topic);
			return map;
		}, new Map<string, Topic>()),
		pickedTopicsMap: pickedTopics.reduce((map, topic) => {
			map.set(topic.topicId, topic);
			return map;
		}, new Map<string, Topic>())
	};
};

export const findTopicAndFactor = (options: {
	topicId: TopicId;
	factorId: FactorId;
	availableTopicsMap: Map<string, Topic>;
	pickedTopicsMap: Map<string, Topic>;
}): { topic?: Topic, topicPicked: boolean, factor?: Factor } => {
	const {topicId, factorId, availableTopicsMap, pickedTopicsMap} = options;

	let topic, topicPicked = false, factor;
	if (topicId) {
		topic = pickedTopicsMap.get(topicId);
	}
	if (topic) {
		topicPicked = true;
	} else {
		topic = availableTopicsMap.get(topicId);
	}
	if (factorId && topic) {
		// eslint-disable-next-line
		factor = topic.factors.find(factor => factor.factorId == factorId);
	}
	return {topic, topicPicked, factor};
};

export const fromTopicFactorParameter = (options: {
	parameter: TopicFactorParameter;
	availableTopicsMap: Map<string, Topic>;
	pickedTopicsMap: Map<string, Topic>;
}): PrettyFactor => {
	const {parameter: {topicId, factorId}, availableTopicsMap, pickedTopicsMap} = options;

	return {
		is: ParameterKind.TOPIC,
		topicId,
		factorId,
		data: findTopicAndFactor({
			topicId: topicId,
			factorId: factorId,
			pickedTopicsMap,
			availableTopicsMap
		})
	};
};
export const fromConstantParameter = (options: { parameter: ConstantParameter }): PrettyConstant => {
	const {parameter: {value}} = options;
	return {is: ParameterKind.CONSTANT, value, data: value};
};
export const fromComputedParameter = (options: {
	parameter: ComputedParameter;
	availableTopicsMap: Map<string, Topic>;
	pickedTopicsMap: Map<string, Topic>;
}): PrettyComputed => {
	const {parameter: {type, parameters}, availableTopicsMap, pickedTopicsMap} = options;
	return {
		is: ParameterKind.COMPUTED,
		type,
		data: parameters.map(parameter => fromParameter({
			parameter,
			availableTopicsMap,
			pickedTopicsMap
		}))
	};
};
export const fromParameter = (options: {
	parameter: Parameter;
	availableTopicsMap: Map<string, Topic>;
	pickedTopicsMap: Map<string, Topic>;
}) => {
	const {parameter, availableTopicsMap, pickedTopicsMap} = options;
	if (isTopicFactorParameter(parameter)) {
		return fromTopicFactorParameter({parameter, availableTopicsMap, pickedTopicsMap});
	} else if (isConstantParameter(parameter)) {
		return fromConstantParameter({parameter});
	} else if (isComputedParameter(parameter)) {
		return fromComputedParameter({parameter, availableTopicsMap, pickedTopicsMap});
	} else {
		return null;
	}
};
