import { fetchMockTopic, listMockTopics, listMockTopicsForHolder, saveMockTopic } from '../mock/tuples/mock-topic';
import { DataPage } from '../query/data-page';
import { getServiceHost, isMockService } from '../utils';
import { QueryTopic, QueryTopicForHolder } from './query-topic-types';
import { Topic } from './topic-types';
import { isFakedUuid } from './utils';

export const listTopics = async (options: {
	search: string;
	pageNumber?: number;
	pageSize?: number;
}): Promise<DataPage<QueryTopic>> => {
	const { search = '', pageNumber = 1, pageSize = 9 } = options;

	if (isMockService()) {
		return listMockTopics(options);
	} else {
		const response = await fetch(`${getServiceHost()}topic/name?query_name=${search}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ pageNumber, pageSize })
		});

		return await response.json();
	}
};

export const fetchTopic = async (topicId: string): Promise<{ topic: Topic }> => {
	if (isMockService()) {
		return fetchMockTopic(topicId);
	} else {
		const response = await fetch(`${getServiceHost()}topic?topic_id=${topicId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		let topic = await response.json();
		return { topic };
	}
};

export const saveTopic = async (topic: Topic): Promise<void> => {
	if (isMockService()) {
		return saveMockTopic(topic);
	} else if (isFakedUuid(topic)) {
		const response = await fetch(`${getServiceHost()}topic`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(topic)
		});

		const data = await response.json();
		topic.topicId = data.topicId;
	} else {
		await fetch(`${getServiceHost()}update/topic?topic_id=${topic.topicId}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(topic)
		});
	}
};

export const listTopicsForHolder = async (search: string): Promise<Array<QueryTopicForHolder>> => {
	if (isMockService()) {
		return listMockTopicsForHolder(search);
	} else {
		const response = await fetch(`${getServiceHost()}query/topic/space?query_name=${search}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		return await response.json();
	}
};