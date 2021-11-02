import {findAccount} from '../account';
import {Apis, get, page, post} from '../apis';
import {fetchMockTopic, listMockTopics, listMockTopicsForHolder, saveMockTopic} from '../mock/tuples/mock-topic';
import {TuplePage} from '../query/tuple-page';
import {isMockService} from '../utils';
import {Factor, FactorType} from './factor-types';
import {QueryTopic, QueryTopicForHolder} from './query-topic-types';
import {Topic, TopicId, TopicKind, TopicType} from './topic-types';
import {isFakedUuid} from './utils';

export const isSystemTopic = (topic: Topic): boolean => topic.kind === TopicKind.SYSTEM;
export const isBusinessTopic = (topic: Topic): boolean => topic.kind === TopicKind.BUSINESS;
export const isRawTopic = (topic: Topic | QueryTopic): boolean => topic.type === TopicType.RAW;
export const isNotRawTopic = (topic: Topic | QueryTopic): boolean => !isRawTopic(topic);
export const isMetaTopic = (topic: Topic): boolean => topic.type === TopicType.META;
export const isDistinctTopic = (topic: Topic): boolean => topic.type === TopicType.DISTINCT;
export const isNotDistinctTopic = (topic: Topic): boolean => !isDistinctTopic(topic);
export const isAggregationTopic = (topic: Topic): boolean => {
	return TopicType.AGGREGATE === topic.type
		|| TopicType.TIME === topic.type
		|| TopicType.RATIO === topic.type;
};
export const isNotAggregationTopic = (topic: Topic): boolean => !isAggregationTopic(topic);

export const isNumericFactor = (factorOrType: Factor | FactorType): boolean => {
	let type;
	if (typeof factorOrType === 'string') {
		type = factorOrType;
	} else {
		type = (factorOrType as Factor).type;
	}
	return [
		FactorType.NUMBER, FactorType.UNSIGNED,
		FactorType.RESIDENTIAL_AREA,
		FactorType.AGE,
		FactorType.BIZ_SCALE
	].includes(type);
};
export const isDateFactor = (factorOrType: Factor | FactorType): boolean => {
	let type;
	if (typeof factorOrType === 'string') {
		type = factorOrType;
	} else {
		type = (factorOrType as Factor).type;
	}
	return [FactorType.FULL_DATETIME, FactorType.DATETIME, FactorType.DATE, FactorType.DATE_OF_BIRTH].includes(type);
};
export const isDateTimeFactor = (factorOrType: Factor | FactorType): boolean => {
	let type;
	if (typeof factorOrType === 'string') {
		type = factorOrType;
	} else {
		type = (factorOrType as Factor).type;
	}
	return [FactorType.FULL_DATETIME, FactorType.DATETIME].includes(type);
};
export const isEnumFactor = (factorOrType: Factor | FactorType): boolean => {
	let type;
	if (typeof factorOrType === 'string') {
		type = factorOrType;
	} else {
		type = (factorOrType as Factor).type;
	}
	return [
		FactorType.ENUM,
		FactorType.CONTINENT, FactorType.REGION, FactorType.COUNTRY, FactorType.PROVINCE, FactorType.CITY,
		FactorType.RESIDENCE_TYPE,
		FactorType.GENDER, FactorType.OCCUPATION, FactorType.RELIGION, FactorType.NATIONALITY,
		FactorType.BIZ_TRADE
	].includes(type);
};

export const listTopics = async (options: {
	search: string;
	pageNumber?: number;
	pageSize?: number;
}): Promise<TuplePage<QueryTopic>> => {
	const {search = '', pageNumber = 1, pageSize = 9} = options;

	if (isMockService()) {
		return listMockTopics(options);
	} else {
		return await page({api: Apis.TOPIC_LIST_BY_NAME, search: {search}, pageable: {pageNumber, pageSize}});
	}
};

export const fetchTopic = async (topicId: TopicId): Promise<{ topic: Topic }> => {
	if (isMockService()) {
		return fetchMockTopic(topicId);
	} else {
		const topic = await get({api: Apis.TOPIC_GET, search: {topicId}});
		return {topic};
	}
};

export const saveTopic = async (topic: Topic): Promise<void> => {
	topic.tenantId = findAccount()?.tenantId;
	if (isMockService()) {
		return saveMockTopic(topic);
	} else if (isFakedUuid(topic)) {
		const data = await post({api: Apis.TOPIC_CREATE, data: topic});
		topic.topicId = data.topicId;
		topic.tenantId = data.tenantId;
		topic.lastModified = data.lastModified;
	} else {
		const data = await post({api: Apis.TOPIC_SAVE, search: {topicId: topic.topicId}, data: topic});
		topic.tenantId = data.tenantId;
		topic.lastModified = data.lastModified;
	}
};

export const listTopicsForHolder = async (search: string): Promise<Array<QueryTopicForHolder>> => {
	if (isMockService()) {
		return listMockTopicsForHolder(search);
	} else {
		return await get({api: Apis.TOPIC_LIST_FOR_HOLDER_BY_NAME, search: {search}});
	}
};
