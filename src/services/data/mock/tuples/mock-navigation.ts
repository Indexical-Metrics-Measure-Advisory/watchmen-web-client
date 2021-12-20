import {TuplePage} from '../../query/tuple-page';
import {Navigation, NavigationId, NavigationIndicator} from '../../tuples/navigation-types';
import {QueryNavigation} from '../../tuples/query-navigation-types';
import {isFakedUuid} from '../../tuples/utils';
import {getCurrentTime} from '../../utils';
import {DemoQueryNavigations} from './mock-data-navigations';

export const listMockNavigations = async (options: {
	search: string;
	pageNumber?: number;
	pageSize?: number;
}): Promise<TuplePage<QueryNavigation>> => {
	const {pageNumber = 1, pageSize = 9} = options;
	return new Promise<TuplePage<QueryNavigation>>((resolve) => {
		setTimeout(() => {
			resolve({
				data: DemoQueryNavigations,
				itemCount: DemoQueryNavigations.length,
				pageNumber,
				pageSize,
				pageCount: 1
			});
		}, 1000);
	});
};

export const fetchMockNavigation = async (navigationId: NavigationId): Promise<{ navigation: Navigation }> => {
	let navigation: Navigation;

	// eslint-disable-next-line
	const found = DemoQueryNavigations.find(({navigationId: id}) => id == navigationId);
	if (found) {
		navigation = JSON.parse(JSON.stringify(found));
	} else {
		navigation = {
			navigationId,
			name: 'Mock Navigation',
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		} as Navigation;
	}
	return {navigation};
};

let newNavigationId = 10000;
export const saveMockNavigation = async (navigation: Navigation): Promise<void> => {
	return new Promise<void>((resolve) => {
		if (isFakedUuid(navigation)) {
			navigation.navigationId = `${newNavigationId++}`;
		}
		setTimeout(() => resolve(), 500);
	});
};

export const fetchMockNavigationIndicatorData = async (current: NavigationIndicator, previous?: NavigationIndicator): Promise<{ current?: number, previous?: number }> => {
	return new Promise<{ current?: number, previous?: number }>(resolve => {
		setTimeout(() => {
			const current = 500 + Math.random() * 500;
			const previous = current * (5 + Math.random() * 5) * 0.1;
			resolve({current, previous});
		}, 500);
	});
};
