import { findAccount } from '../account';
import { Apis, get, post } from '../apis';
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
// eslint-disable-next-line
export const fetchLanguageFromSession = (): string | null => {
	const value = localStorage.getItem(LAST_SNAPSHOT_TOKEN);
	if (value) {
		try {
			return JSON.parse(atob(value)).language;
		} catch {
		}
	}
	return null;
};
export const fetchThemeFromSession = (): string | null => {
	const value = localStorage.getItem(LAST_SNAPSHOT_TOKEN);
	if (value) {
		try {
			return JSON.parse(atob(value)).theme;
		} catch {
		}
	}
	return null;
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
		return await get({ api: Apis.LAST_SNAPSHOT_MINE });
	}
};

export const saveLastSnapshot = async (snapshot: Partial<LastSnapshot>): Promise<void> => {
	const old = fetchLastSnapshotFromSession();
	let qualifiedSnapshot;
	if (old) {
		qualifiedSnapshot = { ...old, ...snapshot };
	} else {
		qualifiedSnapshot = { ...snapshot };
	}
	saveLastSnapshotToSession(qualifiedSnapshot);

	if (isMockService()) {
		console.log('mock saveLastSnapshot');
	} else {
		await post({ api: Apis.LAST_SNAPSHOT_SAVE, data: qualifiedSnapshot });
	}
};
