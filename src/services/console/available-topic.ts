import { fetchMockAvailableTopics } from '../mock/console/mock-available-topic';
import { Topic } from '../tuples/topic-types';
import { isMockService } from '../utils';

export const fetchAvailableTopics = async (topicIds: Array<string>): Promise<Array<Topic>> => {
	if (isMockService()) {
		return fetchMockAvailableTopics();
	} else {
		// TODO use real api
		return fetchMockAvailableTopics();
	}
};
