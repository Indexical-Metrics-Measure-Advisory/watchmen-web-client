import { findAccount } from '../account';
import { fetchMockLastSnapshot } from '../mock/console/mock-last-snapshot';
import { LAST_SNAPSHOT_TOKEN } from '../session-constants';
import { isMockService } from '../utils';
import { LastSnapshot } from './last-snapshot-types';

const fetchLastSnapshotFromSession = (): LastSnapshot | undefined => {
	const account = findAccount();
	if (!account) {
		return;
	}

	const value = localStorage.getItem(LAST_SNAPSHOT_TOKEN);
	if (value) {
		try {
			return JSON.parse(atob(value));
		} catch {
			return;
		}
	}
};
const saveLastSnapshotToSession = (snapshot: LastSnapshot) => {
	localStorage.setItem(LAST_SNAPSHOT_TOKEN, btoa(JSON.stringify(snapshot)));
};

export const fetchLastSnapshot = async (): Promise<LastSnapshot> => {
	if (isMockService()) {
		const fromSession = fetchLastSnapshotFromSession();
		if (fromSession) {
			return fromSession;
		} else {
			const fromMock = await fetchMockLastSnapshot();
			saveLastSnapshotToSession(fromMock);
			return fromMock;
		}
	} else {
		// TODO use real api
		return fetchMockLastSnapshot();
	}
};

export const saveLastSnapshot = async (snapshot: Partial<LastSnapshot>): Promise<void> => {
	const old = fetchLastSnapshotFromSession();
	if (old) {
		saveLastSnapshotToSession({ ...old, ...snapshot });
	} else {
		saveLastSnapshotToSession({ ...snapshot });
	}
	// TODO use real api
};