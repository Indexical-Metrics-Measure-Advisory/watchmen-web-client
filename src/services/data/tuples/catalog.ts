import {findAccount} from '../account';
import {Apis, get, post} from '../apis';
import {fetchMockCatalogs, saveMockCatalog} from '../mock/tuples/mock-catalog';
import {isFakedUuid} from '../tuples/utils';
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

export const saveCatalog = async (catalog: Catalog): Promise<void> => {
	catalog.tenantId = findAccount()?.tenantId;
	if (isMockService()) {
		return saveMockCatalog(catalog);
	} else if (isFakedUuid(catalog)) {
		const data = await post({api: Apis.CATALOG_CREATE, data: catalog});
		catalog.catalogId = data.catalogId;
		catalog.tenantId = data.tenantId;
		catalog.lastModified = data.lastModified;
	} else {
		const data = await post({api: Apis.CATALOG_SAVE, search: {catalogId: catalog.catalogId}, data: catalog});
		catalog.tenantId = data.tenantId;
		catalog.lastModified = data.lastModified;
	}
};

export const deleteCatalog = async (catalog: Catalog): Promise<void> => {
	if (!isMockService() && !isFakedUuid(catalog)) {
		await get({api: Apis.CATALOG_DELETE, search: {catalogId: catalog.catalogId}});
	}
};
