import {DataSource} from '../../services/tuples/data-source-types';

export enum DataSourceEventTypes {
	DATASOURCE_CODE_CHANGED = 'data-source-name-changed',
	DATASOURCE_TENANT_CHANGED = 'data-source-tenant-changed',

	ITEMS_IMPORTED = 'items-imported',
	ITEM_SEARCH_TEXT_CHANGED = 'item-search-text-changed'
}

export interface DataSourceEventBus {
	fire(type: DataSourceEventTypes.DATASOURCE_CODE_CHANGED, dataSource: DataSource): this;
	on(type: DataSourceEventTypes.DATASOURCE_CODE_CHANGED, listener: (dataSource: DataSource) => void): this;
	off(type: DataSourceEventTypes.DATASOURCE_CODE_CHANGED, listener: (dataSource: DataSource) => void): this;

	fire(type: DataSourceEventTypes.DATASOURCE_TENANT_CHANGED, dataSource: DataSource): this;
	on(type: DataSourceEventTypes.DATASOURCE_TENANT_CHANGED, listener: (dataSource: DataSource) => void): this;
	off(type: DataSourceEventTypes.DATASOURCE_TENANT_CHANGED, listener: (dataSource: DataSource) => void): this;
}