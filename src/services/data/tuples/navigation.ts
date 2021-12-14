import {Apis, page} from '@/services/data/apis';
import {TuplePage} from '@/services/data/query/tuple-page';
import {QueryNavigation} from '@/services/data/tuples/query-navigation-types';
import {isMockService} from '@/services/data/utils';
import {listMockNavigations} from '../mock/tuples/mock-navigation';

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
