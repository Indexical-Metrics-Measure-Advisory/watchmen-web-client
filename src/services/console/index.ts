import { findToken } from '../account';
import { fetchMockAvailableSpaces, fetchMockAvailableTopics, fetchMockConnectedSpaces } from '../mock/mock-console';
import { Topic } from '../tuples/topic-types';
import { getServiceHost, isMockService } from '../utils';
import { ConnectedSpace } from './connected-space-types';
import { AvailableSpaceInConsole, ConsoleSettings } from './settings-types';

const fetchConnectedSpaces = async (): Promise<Array<ConnectedSpace>> => {
	if (isMockService()) {
		return fetchMockConnectedSpaces();
	} else {
		const token = findToken();
		const response = await fetch(`${getServiceHost()}console_space/connected/me`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token
			}
		});
		return await response.json();
	}
};

const fetchAvailableSpaces = async (): Promise<Array<AvailableSpaceInConsole>> => {
	if (isMockService()) {
		return fetchMockAvailableSpaces();
	} else {
		const token = findToken();
		const response = await fetch(`${getServiceHost()}space/available`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token
			}
		});
		return await response.json();
	}
};

const fetchAvailableTopics = async (topicIds: Array<string>): Promise<Array<Topic>> => {
	if (isMockService()) {
		return fetchMockAvailableTopics();
	} else {
		// TODO use real api
		return fetchMockAvailableTopics();
	}
};

export const fetchConsoleSettingsData = async (): Promise<ConsoleSettings> => {
	const [
		connectedSpaces, availableSpaces
	] = await Promise.all([
		fetchConnectedSpaces(), fetchAvailableSpaces()
	]);

	const topicIds = availableSpaces.reduce<Array<string>>((topicIds, space) => ([ ...topicIds, ...space.topicIds ]), []);
	const availableTopics = await fetchAvailableTopics(topicIds);

	return { connectedSpaces, availableSpaces, availableTopics };
};