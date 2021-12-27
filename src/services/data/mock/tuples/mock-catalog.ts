import {Catalog} from '../../tuples/catalog-types';
import {CatalogCriteria} from '../../tuples/query-catalog-types';
import {isFakedUuid} from '../../tuples/utils';
import {CatalogRawTopics} from './mock-data-catalogs';

export const fetchMockCatalogs = async (criteria: CatalogCriteria): Promise<Array<Catalog>> => {
	return new Promise<Array<Catalog>>((resolve) => {
		setTimeout(() => {
			resolve([CatalogRawTopics]);
		}, 500);
	});
};

let newCatalogId = 10000;
export const saveMockCatalog = async (catalog: Catalog): Promise<void> => {
	return new Promise<void>((resolve) => {
		if (isFakedUuid(catalog)) {
			catalog.catalogId = `${newCatalogId++}`;
		}
		setTimeout(() => resolve(), 500);
	});
};