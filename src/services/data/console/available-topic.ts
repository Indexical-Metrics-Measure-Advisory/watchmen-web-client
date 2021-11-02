import {Apis, post} from '../apis';
import {fetchMockAvailableTopics} from '../mock/console/mock-available-topic';
import {Topic, TopicId} from '../tuples/topic-types';
import {isMockService} from '../utils';

export const fetchAvailableTopics = async (topicIds: Array<TopicId>): Promise<Array<Topic>> => {
	if (isMockService()) {
		return fetchMockAvailableTopics();
	} else {
		return await post({api: Apis.TOPICS_BY_IDS, data: topicIds});
	}
};
