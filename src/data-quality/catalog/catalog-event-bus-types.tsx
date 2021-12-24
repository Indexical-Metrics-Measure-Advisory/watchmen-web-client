import {CatalogCriteria} from '@/services/data/data-quality/catalog-types';

export enum CatalogEventTypes {
	DO_SEARCH = 'do-search',
}

export interface CatalogEventBus {
	fire(type: CatalogEventTypes.DO_SEARCH, criteria: CatalogCriteria): this;
	on(type: CatalogEventTypes.DO_SEARCH, listener: (criteria: CatalogCriteria) => void): this;
	off(type: CatalogEventTypes.DO_SEARCH, listener: (criteria: CatalogCriteria) => void): this;
}