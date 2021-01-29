import { fetchMockLastSnapshot } from '../mock/console/mock-last-snapshot';
import { isMockService } from '../utils';
import { LastSnapshot } from './last-snapshot-types';

export const fetchLastSnapshot = async (): Promise<LastSnapshot> => {
	if (isMockService()) {
		return fetchMockLastSnapshot();
	} else {
		// TODO use real api
		return fetchMockLastSnapshot();
	}
};

export const saveLastSnapshot = async (snapshot: Partial<LastSnapshot>): Promise<void> => {
	// TODO use real api
};