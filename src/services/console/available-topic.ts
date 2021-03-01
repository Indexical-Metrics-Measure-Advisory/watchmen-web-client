import { findToken } from '../account';
import { fetchMockAvailableTopics } from '../mock/console/mock-available-topic';
import { Topic } from '../tuples/topic-types';
import { doFetch, getServiceHost, isMockService } from '../utils';

export const fetchAvailableTopics = async (topicIds: Array<string>): Promise<Array<Topic>> => {
	if (isMockService()) {
		return fetchMockAvailableTopics();
	} else {
		const token = findToken();
		const response = await doFetch(`${getServiceHost()}topic/ids`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token
			},
			body: JSON.stringify(topicIds)
		});

		return await response.json();
	}
};
