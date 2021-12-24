import {Catalog} from '../../tuples/catalog-types';
import {CatalogCriteria} from '../../tuples/query-catalog-types';

export const fetchMockCatalogs = async (criteria: CatalogCriteria): Promise<Array<Catalog>> => {
	return new Promise<Array<Catalog>>((resolve) => {
		setTimeout(() => {
			resolve([]);
		}, 500);
	});
};