import {ConnectedSpace, ConnectedSpaceGraphics} from '../../tuples/connected-space-types';
import {isFakedUuid} from '../../tuples/utils';
import {DemoConnectedSpaces} from './mock-data-connected-spaces';

export const fetchMockConnectedSpaces = async (): Promise<Array<ConnectedSpace>> => {
	return new Promise(resolve => {
		setTimeout(() => resolve(DemoConnectedSpaces), 500);
	});
};

export const listMockConnectedSpacesForExport = async (): Promise<Array<ConnectedSpace>> => {
	return new Promise(resolve => {
		setTimeout(() => resolve(DemoConnectedSpaces), 500);
	});
};

export const fetchMockConnectedSpaceGraphics = async (): Promise<Array<ConnectedSpaceGraphics>> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve([{
			connectId: '2',
			topics: [{
				topicId: '1',
				rect: {
					coordinate: {x: 32, y: 234.5},
					frame: {x: 0, y: 0, width: 150, height: 35.5},
					name: {x: 75, y: 23.95}
				}
			}, {
				topicId: '2',
				rect: {
					coordinate: {x: 32, y: 167},
					frame: {x: 0, y: 0, width: 150, height: 35.5},
					name: {x: 75, y: 23.95}
				}
			}, {
				topicId: '3',
				rect: {
					coordinate: {x: 32, y: 99.5},
					frame: {x: 0, y: 0, width: 150, height: 35.5},
					name: {x: 75, y: 23.95}
				}
			}, {
				topicId: '4',
				rect: {
					coordinate: {x: 32, y: 369.5},
					frame: {x: 0, y: 0, width: 150, height: 35.5},
					name: {x: 75, y: 23.95}
				}
			}, {
				topicId: '5',
				rect: {
					coordinate: {x: 32, y: 437},
					frame: {x: 0, y: 0, width: 154.03125, height: 35.5},
					name: {x: 77.015625, y: 23.95}
				}
			}, {
				topicId: '6',
				rect: {
					coordinate: {x: 32, y: 32},
					frame: {x: 0, y: 0, width: 158.1875, height: 35.5},
					name: {x: 79.09375, y: 23.95}
				}
			}, {
				topicId: '7',
				rect: {
					coordinate: {x: 32, y: 302},
					frame: {x: 0, y: 0, width: 150, height: 35.5},
					name: {x: 75, y: 23.95}
				}
			}, {
				topicId: '8',
				rect: {
					coordinate: {x: 32, y: 504.5},
					frame: {x: 0, y: 0, width: 210.4375, height: 35.5},
					name: {x: 105.21875, y: 23.95}
				}
			}],
			subjects: [{
				subjectId: '1',
				rect: {
					coordinate: {x: 574.4375, y: 164.5},
					frame: {x: 0, y: 0, width: 150, height: 35.5},
					name: {x: 75, y: 23.95}
				}
			}, {
				subjectId: '2',
				rect: {
					coordinate: {x: 466.4375, y: 32},
					frame: {x: 0, y: 0, width: 150, height: 35.5},
					name: {x: 75, y: 23.95}
				}
			}],
			reports: []
		}]), 500);
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