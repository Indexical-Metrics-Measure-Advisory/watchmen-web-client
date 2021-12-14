import {Apis, get, page} from '../../data/apis';
import {isMockService} from '../../data/utils';
import {fetchMockNavigation, listMockNavigations} from '../mock/tuples/mock-navigation';
import {TuplePage} from '../query/tuple-page';
import {Navigation, NavigationId} from './navigation-types';
import {QueryNavigation} from './query-navigation-types';

export const listNavigations = async (options: {
	search: string;
	pageNumber?: number;
	pageSize?: number;
}): Promise<TuplePage<QueryNavigation>> => {
	const {search = '', pageNumber = 1, pageSize = 9} = options;

	if (isMockService()) {
		return listMockNavigations(options);
	} else {
		return await page({api: Apis.NAVIGATION_LIST_BY_NAME, search: {search}, pageable: {pageNumber, pageSize}});
	}
};

export const fetchNavigation = async (navigationId: NavigationId): Promise<{ navigation: Navigation }> => {
	if (isMockService()) {
		return fetchMockNavigation(navigationId);
	} else {
		const navigation = await get({api: Apis.NAVIGATION_GET, search: {navigationId}});
		return {navigation};
	}
};
