import {Dayjs} from 'dayjs';
import {Apis, get} from '../apis';
import {fetchMockAllTopics} from '../mock/pipeline/mock-all-topics';
import {Topic} from '../tuples/topic-types';
import {isMockService} from '../utils';

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
		// TODO fetch updated topics, not implemented yet. use fetch whole data instead now.
		return fetchAllTopics();
		// return await post({api: Apis.TOPIC_UPDATED, data: {lastModified: lastModifiedTime.format('YYYY/MM/DD HH:mm:ss')}});
	}
};