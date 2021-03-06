import {Apis, get} from '../apis';
import {fetchMockAllTopics} from '../mock/pipeline/mock-all-topics';
import {Topic} from '../tuples/topic-types';
import {isMockService} from '../utils';
import {Dayjs} from 'dayjs';

export const fetchAllTopics = async (): Promise<Array<Topic>> => {
	if (isMockService()) {
		return fetchMockAllTopics();
	} else {
		return await get({api: Apis.TOPIC_ALL});
	}
};

export const fetchUpdatedTopics = async (lastModifiedTime: Dayjs): Promise<Array<Topic>> => {
	if (isMockService()) {
		return fetchMockAllTopics();
	} else {
		// TODO fetch updated topics
		return fetchAllTopics();
		// return await post({api: Apis.TOPIC_UPDATED, data: {lastModifyTime: lastModifiedTime.format('YYYY/MM/DD HH:mm:ss')}});
	}
};