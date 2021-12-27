import {Catalog} from '@/services/data/tuples/catalog-types';
import {CatalogCriteria} from '@/services/data/tuples/query-catalog-types';
import {QueryUserForHolder} from '@/services/data/tuples/query-user-types';

export enum CatalogEventTypes {
	ASK_USERS = 'ask-users',

	DO_SEARCH = 'do-search',
	DO_CREATE_CATALOG = 'do-create-catalog',

	ASK_CATALOG_CHANGED = 'ask-catalog-changed',

	CATALOG_CHANGED = 'catalog-changed',
	CATALOG_SAVED = 'catalog-saved',
	CATALOG_DELETED = 'catalog-deleted',
	CLEAR_CATALOG_STATE = 'clear-catalog-state'
}

export interface CatalogEventBus {
	fire(type: CatalogEventTypes.ASK_USERS, onData: (users: Array<QueryUserForHolder>) => void): this;
	on(type: CatalogEventTypes.ASK_USERS, listener: (onData: (users: Array<QueryUserForHolder>) => void) => void): this;
	off(type: CatalogEventTypes.ASK_USERS, listener: (onData: (users: Array<QueryUserForHolder>) => void) => void): this;

	fire(type: CatalogEventTypes.DO_SEARCH, criteria: CatalogCriteria): this;
	on(type: CatalogEventTypes.DO_SEARCH, listener: (criteria: CatalogCriteria) => void): this;
	off(type: CatalogEventTypes.DO_SEARCH, listener: (criteria: CatalogCriteria) => void): this;

	fire(type: CatalogEventTypes.DO_CREATE_CATALOG, catalog: Catalog): this;
	on(type: CatalogEventTypes.DO_CREATE_CATALOG, listener: (catalog: Catalog) => void): this;
	off(type: CatalogEventTypes.DO_CREATE_CATALOG, listener: (catalog: Catalog) => void): this;

	fire(type: CatalogEventTypes.ASK_CATALOG_CHANGED, onData: (changed: boolean) => void): this;
	on(type: CatalogEventTypes.ASK_CATALOG_CHANGED, listener: (onData: (changed: boolean) => void) => void): this;
	off(type: CatalogEventTypes.ASK_CATALOG_CHANGED, listener: (onData: (changed: boolean) => void) => void): this;

	fire(type: CatalogEventTypes.CATALOG_CHANGED, catalog: Catalog): this;
	on(type: CatalogEventTypes.CATALOG_CHANGED, listener: (catalog: Catalog) => void): this;
	off(type: CatalogEventTypes.CATALOG_CHANGED, listener: (catalog: Catalog) => void): this;

	fire(type: CatalogEventTypes.CATALOG_SAVED, catalog: Catalog): this;
	on(type: CatalogEventTypes.CATALOG_SAVED, listener: (catalog: Catalog) => void): this;
	off(type: CatalogEventTypes.CATALOG_SAVED, listener: (catalog: Catalog) => void): this;

	fire(type: CatalogEventTypes.CATALOG_DELETED, catalog: Catalog): this;
	on(type: CatalogEventTypes.CATALOG_DELETED, listener: (catalog: Catalog) => void): this;
	off(type: CatalogEventTypes.CATALOG_DELETED, listener: (catalog: Catalog) => void): this;

	fire(type: CatalogEventTypes.CLEAR_CATALOG_STATE): this;
	on(type: CatalogEventTypes.CLEAR_CATALOG_STATE, listener: () => void): this;
	off(type: CatalogEventTypes.CLEAR_CATALOG_STATE, listener: () => void): this;
}