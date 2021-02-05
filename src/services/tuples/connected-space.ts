import { findToken } from '../account';
import {
	deleteMockConnectedSpace,
	fetchMockConnectedSpaces,
	renameMockConnectedSpace,
	saveMockConnectedSpace
} from '../mock/tuples/mock-connected-space';
import { getServiceHost, isMockService } from '../utils';
import { ConnectedSpace } from './connected-space-types';
import { isFakedUuid } from './utils';

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

export const saveConnectedSpace = async (connectedSpace: ConnectedSpace): Promise<void> => {
	if (isMockService()) {
		return saveMockConnectedSpace(connectedSpace);
	} else if (isFakedUuid(connectedSpace)) {
		const token = findToken();
		const response = await fetch(`${getServiceHost()}space/connect?space_id=${connectedSpace.spaceId}&name=${connectedSpace.name}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token
			}
		});

		const data = await response.json();
		connectedSpace.connectId = data.connectId;
		connectedSpace.lastModifyTime = data.lastModifyTime;
	} else {
		// TODO use real api
		// const token = findToken();
		// const response = await fetch(`${getServiceHost()}space/save`, {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 		Authorization: 'Bearer ' + token
		// 	},
		// 	body: JSON.stringify(connectedSpace)
		// });

		// const data = await response.json();
		// connectedSpace.lastModifyTime = data.lastModifyTime;
	}
};

export const renameConnectedSpace = async (connectedSpace: ConnectedSpace): Promise<void> => {
	if (isMockService()) {
		return renameMockConnectedSpace(connectedSpace);
	} else {
		const token = findToken();
		await fetch(`${getServiceHost()}console_space/rename?connect_id=${connectedSpace.connectId}&name=${connectedSpace.name}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token
			}
		});
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
