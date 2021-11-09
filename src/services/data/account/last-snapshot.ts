import {base64Decode, base64Encode} from '../../utils';
import {Apis, get, post} from '../apis';
import {fetchMockLastSnapshot} from '../mock/account/mock-last-snapshot';
import {LAST_SNAPSHOT_TOKEN} from '../session-constants';
import {isMockService} from '../utils';
import {findAccount} from './index';
import {LastSnapshot} from './last-snapshot-types';

const fetchLastSnapshotFromSession = (): LastSnapshot | undefined => {
	const account = findAccount();
	if (!account) {
		return;
	}

	const value = localStorage.getItem(LAST_SNAPSHOT_TOKEN);
	if (value) {
		try {
			return JSON.parse(base64Decode(value));
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
			return JSON.parse(base64Decode(value)).language;
		} catch {
		}
	}
	return null;
};
export const fetchThemeFromSession = (): string | null => {
	const value = localStorage.getItem(LAST_SNAPSHOT_TOKEN);
	if (value) {
		try {
			return JSON.parse(base64Decode(value)).theme;
		} catch {
		}
	}
	return null;
};
const saveLastSnapshotToSession = (snapshot: LastSnapshot) => {
	localStorage.setItem(LAST_SNAPSHOT_TOKEN, base64Encode(JSON.stringify(snapshot)));
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
		return await get({api: Apis.LAST_SNAPSHOT_MINE});
	}
};

export const saveLastSnapshot = async (snapshot: Partial<LastSnapshot>): Promise<void> => {
	const old = fetchLastSnapshotFromSession();
	let qualifiedSnapshot;
	if (old) {
		qualifiedSnapshot = {...old, ...snapshot};
	} else {
		qualifiedSnapshot = {...snapshot};
	}
	saveLastSnapshotToSession(qualifiedSnapshot);

	if (isMockService()) {
		console.log('mock saveLastSnapshot');
	} else {
		await post({api: Apis.LAST_SNAPSHOT_SAVE, data: qualifiedSnapshot});
	}
};
