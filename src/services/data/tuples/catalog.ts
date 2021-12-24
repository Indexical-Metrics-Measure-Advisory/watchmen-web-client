import {Apis, post} from '../apis';
import {fetchMockCatalogs} from '../mock/tuples/mock-catalog';
import {isMockService} from '../utils';
import {Catalog} from './catalog-types';
import {CatalogCriteria} from './query-catalog-types';

export const fetchCatalogs = async (criteria: CatalogCriteria): Promise<Array<Catalog>> => {
	if (isMockService()) {
		return await fetchMockCatalogs(criteria);
	} else {
		return await post({api: Apis.QUERY_CATALOG, data: {...criteria}});
	}
};