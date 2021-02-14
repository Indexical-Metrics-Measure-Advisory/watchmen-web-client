import { fetchMockAllTopics } from '../mock/pipeline/mock-all-topics';
import { Topic } from '../tuples/topic-types';
import { isMockService } from '../utils';

export const fetchAllTopics = async (): Promise<Array<Topic>> => {
	if (isMockService()) {
		return fetchMockAllTopics();
	} else {
		// REMOTE use real api
		return fetchMockAllTopics();
	}
};
