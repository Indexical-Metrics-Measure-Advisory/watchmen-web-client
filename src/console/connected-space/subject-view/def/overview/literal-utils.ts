import { Factor } from '../../../../../services/tuples/factor-types';
import { Topic } from '../../../../../services/tuples/topic-types';

export const buildTopicsMap = (options: {
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
}) => {
	const { availableTopics, pickedTopics } = options;
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
	topicId: string;
	factorId: string;
	availableTopicsMap: Map<string, Topic>;
	pickedTopicsMap: Map<string, Topic>;
}): { topic?: Topic, topicPicked: boolean, factor?: Factor } => {
	const { topicId, factorId, availableTopicsMap, pickedTopicsMap } = options;

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
	return { topic, topicPicked, factor };
};
