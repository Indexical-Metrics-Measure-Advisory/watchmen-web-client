import { ConnectedSpace, ConnectedSpaceGraphics } from '../../tuples/connected-space-types';
import { isFakedUuid } from '../../tuples/utils';
import { DemoConnectedSpaces } from './mock-data-connected-spaces';

export const fetchMockConnectedSpaces = async (): Promise<Array<ConnectedSpace>> => {
	return new Promise(resolve => {
		setTimeout(() => resolve(DemoConnectedSpaces), 500);
	});
};

export const fetchMockConnectedSpaceGraphics = async (): Promise<Array<ConnectedSpaceGraphics>> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve([]), 500);
	});
};

let newConnectedSpaceId = 10000;
export const saveMockConnectedSpace = async (connectedSpace: ConnectedSpace): Promise<void> => {
	return new Promise((resolve) => {
		if (isFakedUuid(connectedSpace)) {
			connectedSpace.connectId = `${newConnectedSpaceId++}`;
		}
		setTimeout(() => resolve(), 500);
	});
};

export const renameMockConnectedSpace = async (connectedSpace: ConnectedSpace): Promise<void> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve(), 500);
	});
};

export const deleteMockConnectedSpace = async (connectedSpace: ConnectedSpace): Promise<void> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve(), 500);
	});
};

export const saveMockConnectedSpaceGraphics = async (connectedSpace: ConnectedSpace, graphics: ConnectedSpaceGraphics): Promise<void> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve(), 500);
	});
};