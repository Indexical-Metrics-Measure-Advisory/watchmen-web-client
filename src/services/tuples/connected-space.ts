import { findToken } from '../account';
import { deleteMockConnectedSpace, fetchMockConnectedSpaces } from '../mock/tuples/mock-connected-space';
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

export const deleteConnectedSpace = async (connectedSpace: ConnectedSpace): Promise<void> => {
	if (isMockService()) {
		return deleteMockConnectedSpace(connectedSpace);
	} else {
		const token = findToken();
		await fetch(`${getServiceHost()}console_space/delete?connect_id=${connectedSpace.connectId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token
			}
		});
	}
};
