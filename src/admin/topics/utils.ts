import {Factor, FactorType} from '@/services/data/tuples/factor-types';
import {isNotRawTopic} from '@/services/data/tuples/topic';
import {Topic, TopicKind, TopicType} from '@/services/data/tuples/topic-types';
import {generateUuid, removeFakeIdPrefix} from '@/services/data/tuples/utils';
import {getCurrentTime} from '@/services/data/utils';

export const createTopic = (): Topic => {
	return {
		topicId: generateUuid(),
		name: '',
		kind: TopicKind.BUSINESS,
		type: TopicType.DISTINCT,
		factors: [],
		createTime: getCurrentTime(),
		lastModified: getCurrentTime()
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
		lastModified: getCurrentTime()
	};
};

const isSubFactorCanBeFlatten = (topic: Topic, parentFactorName: string): boolean => {
	const parentFactor = (topic.factors || []).find(factor => factor.name === parentFactorName);
	if (!parentFactor) {
		return true;
	} else if (parentFactor.type === FactorType.ARRAY) {
		return false;
	} else if (!parentFactorName.includes('.')) {
		return true;
	} else {
		const [, ...names] = parentFactorName.split('.').reverse();
		return isSubFactorCanBeFlatten(topic, names.reverse().join('.'));
	}
};

export const isFactorCanBeFlatten = (topic: Topic, factor: Factor): boolean => {
	if (isNotRawTopic(topic)) {
		return false;
	}

	if (!factor.name.includes('.')) {
		return true;
	}
	if (factor.type === FactorType.OBJECT || factor.type === FactorType.ARRAY) {
		return false;
	}

	const name = factor.name || '';
	if (!name) {
		return true;
	}

	const [, ...names] = name.split('.').reverse();
	return isSubFactorCanBeFlatten(topic, names.reverse().join('.'));
};
