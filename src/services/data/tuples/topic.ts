import {findAccount} from '../account';
import {Apis, get, page, post} from '../apis';
import {fetchMockTopic, listMockTopics, listMockTopicsForHolder, saveMockTopic} from '../mock/tuples/mock-topic';
import {TuplePage} from '../query/tuple-page';
import {isMockService} from '../utils';
import {QueryTopic, QueryTopicForHolder} from './query-topic-types';
import {Topic, TopicId} from './topic-types';
import {isFakedUuid} from './utils';

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
		return await get({api: Apis.TOPIC_LIST_FOR_HOLDER_BY_NAME_NON_RAW, search: {search}});
	}
};
