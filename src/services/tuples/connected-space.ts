import { Apis, get, post } from '../apis';
import {
	deleteMockConnectedSpace,
	fetchMockConnectedSpaceGraphics,
	fetchMockConnectedSpaces,
	renameMockConnectedSpace,
	saveMockConnectedSpace,
	saveMockConnectedSpaceGraphics
} from '../mock/tuples/mock-connected-space';
import { isMockService } from '../utils';
import { ConnectedSpace, ConnectedSpaceGraphics } from './connected-space-types';
import { isFakedUuid } from './utils';

export const fetchConnectedSpaces = async (): Promise<Array<ConnectedSpace>> => {
	if (isMockService()) {
		return fetchMockConnectedSpaces();
	} else {
		return await get({ api: Apis.CONNECTED_SPACES_MINE });
	}
};

export const fetchConnectedSpaceGraphics = async (): Promise<Array<ConnectedSpaceGraphics>> => {
	if (isMockService()) {
		return fetchMockConnectedSpaceGraphics();
	} else {
		return await get({ api: Apis.CONNECTED_SPACES_GRAPHICS_MINE });
	}
};

export const saveConnectedSpace = async (connectedSpace: ConnectedSpace): Promise<void> => {
	if (isMockService()) {
		return saveMockConnectedSpace(connectedSpace);
	} else if (isFakedUuid(connectedSpace)) {
		const data = await get({
			api: Apis.SPACE_CONNECT,
			search: { spaceId: connectedSpace.spaceId, name: connectedSpace.name }
		});
		connectedSpace.connectId = data.connectId;
		connectedSpace.lastModifyTime = data.lastModifyTime;
	} else {
		const data = await post({ api: Apis.CONNECTED_SPACE_SAVE, data: connectedSpace });
		connectedSpace.lastModifyTime = data.lastModifyTime;
	}
};

export const renameConnectedSpace = async (connectedSpace: ConnectedSpace): Promise<void> => {
	if (isMockService()) {
		return renameMockConnectedSpace(connectedSpace);
	} else {
		await get({
			api: Apis.CONNECTED_SPACE_RENAME,
			search: { connectId: connectedSpace.connectId, name: connectedSpace.name }
		});
	}
};

export const deleteConnectedSpace = async (connectedSpace: ConnectedSpace): Promise<void> => {
	if (isMockService()) {
		return deleteMockConnectedSpace(connectedSpace);
	} else {
		await get({ api: Apis.CONNECTED_SPACE_DELETE, search: { connectId: connectedSpace.connectId } });
	}
};

export const saveConnectedSpaceGraphics = async (
	connectedSpace: ConnectedSpace,
	graphics: ConnectedSpaceGraphics
): Promise<void> => {
	if (isMockService()) {
		return saveMockConnectedSpaceGraphics(connectedSpace, graphics);
	} else {
		graphics.connectId = connectedSpace.connectId;
		await post({ api: Apis.CONNECTED_SPACE_GRAPHICS_SAVE, data: graphics });
	}
};
