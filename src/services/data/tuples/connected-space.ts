import {Apis, get, post} from '../apis';
import {
	deleteMockConnectedSpace,
	fetchMockConnectedSpaceGraphics,
	fetchMockConnectedSpaces,
	listMockConnectedSpacesForExport,
	renameMockConnectedSpace,
	saveMockConnectedSpace,
	saveMockConnectedSpaceGraphics
} from '../mock/tuples/mock-connected-space';
import {isMockService} from '../utils';
import {
	ConnectedSpace,
	ConnectedSpaceGraphics,
	ConnectedSpaceId,
	ConnectedSpaceTemplate
} from './connected-space-types';
import {SpaceId} from './space-types';
import {isFakedUuid} from './utils';

export const fetchConnectedSpaces = async (): Promise<Array<ConnectedSpace>> => {
	if (isMockService()) {
		return fetchMockConnectedSpaces();
	} else {
		return await get({api: Apis.CONNECTED_SPACES_MINE});
	}
};

export const listConnectedSpacesForExport = async (): Promise<Array<ConnectedSpace>> => {
	if (isMockService()) {
		return listMockConnectedSpacesForExport();
	} else {
		return await get({api: Apis.CONNECTED_SPACES_EXPORT});
	}
};

export const fetchConnectedSpaceGraphics = async (): Promise<Array<ConnectedSpaceGraphics>> => {
	if (isMockService()) {
		return fetchMockConnectedSpaceGraphics();
	} else {
		return await get({api: Apis.CONNECTED_SPACES_GRAPHICS_MINE});
	}
};

export const saveConnectedSpace = async (connectedSpace: ConnectedSpace, templateConnectedSpaceIds: Array<ConnectedSpaceId> = []): Promise<void> => {
	if (isMockService()) {
		return saveMockConnectedSpace(connectedSpace);
	} else if (isFakedUuid(connectedSpace)) {
		const data = await get({
			api: Apis.SPACE_CONNECT,
			search: {
				spaceId: connectedSpace.spaceId,
				name: connectedSpace.name,
				templateIds: templateConnectedSpaceIds.join(',')
			}
		});
		connectedSpace.subjects = data.subjects || [];
		connectedSpace.connectId = data.connectId;
		connectedSpace.lastModified = data.lastModified;
	} else {
		const data = await post({api: Apis.CONNECTED_SPACE_SAVE, data: connectedSpace});
		connectedSpace.lastModified = data.lastModified;
	}
};

export const renameConnectedSpace = async (connectedSpace: ConnectedSpace): Promise<void> => {
	if (isMockService()) {
		return renameMockConnectedSpace(connectedSpace);
	} else {
		await get({
			api: Apis.CONNECTED_SPACE_RENAME,
			search: {connectId: connectedSpace.connectId, name: connectedSpace.name}
		});
	}
};

export const deleteConnectedSpace = async (connectedSpace: ConnectedSpace): Promise<void> => {
	if (isMockService()) {
		return deleteMockConnectedSpace(connectedSpace);
	} else {
		await get({api: Apis.CONNECTED_SPACE_DELETE, search: {connectId: connectedSpace.connectId}});
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
		await post({api: Apis.CONNECTED_SPACE_GRAPHICS_SAVE, data: graphics});
	}
};

export const listTemplateConnectedSpaces = async (spaceId: SpaceId): Promise<Array<ConnectedSpaceTemplate>> => {
	if (isMockService()) {
		return [
			{connectId: '1', name: 'Template One', createBy: 'Damon Lindelof'},
			{connectId: '2', name: 'Template Two', createBy: 'Damon Lindelof'},
			{connectId: '3', name: 'Template Three', createBy: 'Damon Lindelof'}
			// ...new Array(10).fill(1).map((x, index) => {
			// 	return {connectId: `${index + 4}`, name: `Template ${index + 1}`, createBy: 'Auto'};
			// })
		];
	} else {
		const data = await get({api: Apis.CONNECTED_SPACES_TEMPLATE_LIST, search: {spaceId}});
		return data || [];
	}
};