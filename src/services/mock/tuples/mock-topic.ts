import {DataPage} from '../../query/data-page';
import {QueryTopic, QueryTopicForHolder} from '../../tuples/query-topic-types';
import {Topic, TopicKind, TopicType} from '../../tuples/topic-types';
import {isFakedUuid} from '../../tuples/utils';
import {getCurrentTime} from '../../utils';
import {DemoQueryTopics, DemoTopics} from './mock-data-topics';

export const listMockTopics = async (options: {
	search: string;
	pageNumber?: number;
	pageSize?: number;
}): Promise<DataPage<QueryTopic>> => {
	const {pageNumber = 1, pageSize = 9} = options;
	return new Promise<DataPage<QueryTopic>>((resolve) => {
		setTimeout(() => {
			resolve({
				data: DemoQueryTopics,
				itemCount: DemoQueryTopics.length,
				pageNumber,
				pageSize,
				pageCount: 3
			});
		}, 1000);
	});
};

export const fetchMockTopic = async (topicId: string): Promise<{ topic: Topic }> => {
	let topic: Topic;

	// eslint-disable-next-line
	const found = DemoTopics.find(({topicId: id}) => id == topicId);
	if (found) {
		const {topicId, name, kind, type, description, factors, createTime, lastModifyTime} = found;
		topic = {topicId, name, kind, type, description, factors, createTime, lastModifyTime};
	} else {
		topic = {
			topicId,
			name: 'Mock Topic',
			kind: TopicKind.BUSINESS,
			type: TopicType.DISTINCT,
			factors: [],
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		};
	}
	return {topic};
};

let newTopicId = 10000;
export const saveMockTopic = async (topic: Topic): Promise<void> => {
	return new Promise<void>((resolve) => {
		if (isFakedUuid(topic)) {
			topic.topicId = `${newTopicId++}`;
		}
		setTimeout(() => resolve(), 500);
	});
};

export const listMockTopicsForHolder = async (search: string): Promise<Array<QueryTopicForHolder>> => {
	return new Promise<Array<QueryTopicForHolder>>((resolve) => {
		setTimeout(() => {
			resolve(
				[
					{topicId: '3', name: 'Participant'},
					{topicId: '2', name: 'Policy'},
					{topicId: '1', name: 'Quotation'}
				].filter((x) => x.name.toUpperCase().includes(search.toUpperCase()))
			);
		}, 500);
	});
};