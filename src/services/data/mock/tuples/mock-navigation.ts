import {TuplePage} from '../../query/tuple-page';
import {QueryNavigation} from '../../tuples/query-navigation-types';
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
