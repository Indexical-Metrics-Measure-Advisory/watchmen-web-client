import {findAccount} from '../../data/account';
import {Apis, get, page, post} from '../../data/apis';
import {isMockService} from '../../data/utils';
import {
	fetchMockNavigation,
	fetchMockNavigationIndicatorData,
	listMockNavigations,
	saveMockNavigation
} from '../mock/tuples/mock-navigation';
import {TuplePage} from '../query/tuple-page';
import {Navigation, NavigationId, NavigationIndicator} from './navigation-types';
import {QueryNavigation} from './query-navigation-types';
import {isFakedUuid} from './utils';

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
		(navigation.indicators || []).forEach((indicator: NavigationIndicator, index: number, array: Array<NavigationIndicator>) => {
			if (indicator.variableName == null || indicator.variableName.trim().length === 0) {
				let startIndex = index + 1;
				while (true) {
					const variableName = `v${startIndex}`;
					if (array.every(({variableName: vn}) => vn !== variableName)) {
						indicator.variableName = variableName;
						break;
					} else {
						startIndex += 1;
					}
				}
			}
		});
		return {navigation};
	}
};

export const saveNavigation = async (navigation: Navigation): Promise<void> => {
	navigation.tenantId = findAccount()?.tenantId;
	if (isMockService()) {
		return saveMockNavigation(navigation);
	} else if (isFakedUuid(navigation)) {
		const data = await post({api: Apis.NAVIGATION_CREATE, data: navigation});
		navigation.navigationId = data.navigationId;
		navigation.tenantId = data.tenantId;
		navigation.lastModified = data.lastModified;
	} else {
		const data = await post({
			api: Apis.NAVIGATION_SAVE,
			search: {navigationId: navigation.navigationId},
			data: navigation
		});
		navigation.tenantId = data.tenantId;
		navigation.lastModified = data.lastModified;
	}
};

export const fetchNavigationIndicatorData = async (current: NavigationIndicator, previous?: NavigationIndicator): Promise<{ current?: number, previous?: number }> => {
	if (isMockService()) {
		return fetchMockNavigationIndicatorData(current, previous);
	} else {
		const {current: currentData, previous: previousData} = await post({
			api: Apis.NAVIGATION_INDICATOR_DATA,
			data: {current, previous}
		});
		return {current: currentData, previous: previousData};
	}
};
