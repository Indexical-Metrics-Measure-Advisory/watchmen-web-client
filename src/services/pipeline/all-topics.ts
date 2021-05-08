import {Apis, get} from '../apis';
import {fetchMockAllTopics} from '../mock/pipeline/mock-all-topics';
import {Topic} from '../tuples/topic-types';
import {isMockService} from '../utils';

export const fetchAllTopics = async (): Promise<Array<Topic>> => {
	if (isMockService()) {
		return fetchMockAllTopics();
	} else {
		return await get({api: Apis.TOPICS_ALL});
	}
};
