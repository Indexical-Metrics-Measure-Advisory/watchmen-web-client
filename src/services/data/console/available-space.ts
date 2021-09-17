import {Apis, get} from '../apis';
import {fetchMockAvailableSpaces} from '../mock/console/mock-avaiable-space';
import {isMockService} from '../utils';
import {AvailableSpaceInConsole} from './settings-types';

export const fetchAvailableSpaces = async (): Promise<Array<AvailableSpaceInConsole>> => {
	if (isMockService()) {
		return fetchMockAvailableSpaces();
	} else {
		return await get({api: Apis.SPACES_AVAILABLE});
	}
};
