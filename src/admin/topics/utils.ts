import { Factor, FactorType } from '../../services/tuples/factor-types';
import { Topic, TopicType } from '../../services/tuples/topic-types';
import { generateUuid, removeFakeIdPrefix } from '../../services/tuples/utils';
import { getCurrentTime } from '../../services/utils';

export const createTopic = (): Topic => {
	return {
		topicId: generateUuid(), name: '', type: TopicType.DISTINCT, factors: [],
		createTime: getCurrentTime(),
		lastModifyTime: getCurrentTime()
	};
};

export const createFactor = (topic: Topic): Factor => {
	// make sure factor id is unique, because it is not a tuple
	// will not be replaced by backend
	const factorIds = topic.factors.map(factor => factor.factorId);
	let newFactorId = generateUuid();
	while (factorIds.includes(newFactorId)) {
		newFactorId = generateUuid();
	}

	return {
		factorId: removeFakeIdPrefix(newFactorId), name: '', label: '', type: FactorType.TEXT,
		createTime: getCurrentTime(),
		lastModifyTime: getCurrentTime()
	};
};