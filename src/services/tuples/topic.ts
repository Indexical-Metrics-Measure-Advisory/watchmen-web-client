import { findToken } from "../account";
import { fetchMockTopic, listMockTopics, listMockTopicsForHolder, saveMockTopic } from "../mock/tuples/mock-topic";
import { DataPage } from "../query/data-page";
import { doFetch, getServiceHost, isMockService } from "../utils";
import { QueryTopic, QueryTopicForHolder } from "./query-topic-types";
import { Topic } from "./topic-types";
import { isFakedUuid } from "./utils";

export const listTopics = async (options: {
	search: string;
	pageNumber?: number;
	pageSize?: number;
}): Promise<DataPage<QueryTopic>> => {
	const { search = "", pageNumber = 1, pageSize = 9 } = options;

	if (isMockService()) {
		return listMockTopics(options);
	} else {
		const token = findToken();
		const response = await doFetch(`${getServiceHost()}topic/name?query_name=${search}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
			body: JSON.stringify({ pageNumber, pageSize }),
		});

		return await response.json();
	}
};

export const fetchTopic = async (topicId: string): Promise<{ topic: Topic }> => {
	if (isMockService()) {
		return fetchMockTopic(topicId);
	} else {
		const token = findToken();
		const response = await doFetch(`${getServiceHost()}topic?topic_id=${topicId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
		});

		let topic = await response.json();
		return { topic };
	}
};

export const saveTopic = async (topic: Topic): Promise<void> => {
	if (isMockService()) {
		return saveMockTopic(topic);
	} else if (isFakedUuid(topic)) {
		const token = findToken();
		const response = await doFetch(`${getServiceHost()}topic`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
			body: JSON.stringify(topic),
		});

		const data = await response.json();
		topic.topicId = data.topicId;
		topic.lastModifyTime = data.lastModifyTime;
	} else {
		const token = findToken();
		const response = await doFetch(`${getServiceHost()}update/topic?topic_id=${topic.topicId}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
			body: JSON.stringify(topic),
		});
		const data = await response.json();
		topic.lastModifyTime = data.lastModifyTime;
	}
};

export const listTopicsForHolder = async (search: string): Promise<Array<QueryTopicForHolder>> => {
	if (isMockService()) {
		return listMockTopicsForHolder(search);
	} else {
		const token = findToken();
		const response = await doFetch(`${getServiceHost()}query/topic/space?query_name=${search}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
		});

		return await response.json();
	}
};
