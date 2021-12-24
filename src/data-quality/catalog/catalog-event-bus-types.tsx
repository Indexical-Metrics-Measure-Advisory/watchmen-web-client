import {CatalogCriteria} from '@/services/data/data-quality/catalog-types';
import {QueryUserForHolder} from '@/services/data/tuples/query-user-types';

export enum CatalogEventTypes {
	ASK_USERS = 'ask-users',

	DO_SEARCH = 'do-search',
}

export interface CatalogEventBus {
	fire(type: CatalogEventTypes.ASK_USERS, onData: (users: Array<QueryUserForHolder>) => void): this;
	on(type: CatalogEventTypes.ASK_USERS, listener: (onData: (users: Array<QueryUserForHolder>) => void) => void): this;
	off(type: CatalogEventTypes.ASK_USERS, listener: (onData: (users: Array<QueryUserForHolder>) => void) => void): this;

	fire(type: CatalogEventTypes.DO_SEARCH, criteria: CatalogCriteria): this;
	on(type: CatalogEventTypes.DO_SEARCH, listener: (criteria: CatalogCriteria) => void): this;
	off(type: CatalogEventTypes.DO_SEARCH, listener: (criteria: CatalogCriteria) => void): this;
}