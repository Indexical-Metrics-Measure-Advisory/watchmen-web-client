import { findToken } from '../account';
import { fetchMockConnectedSpaces } from '../mock/console/mock-connected-space';
import { getServiceHost, isMockService } from '../utils';
import { ConnectedSpace } from './connected-space-types';

export const fetchConnectedSpaces = async (): Promise<Array<ConnectedSpace>> => {
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
