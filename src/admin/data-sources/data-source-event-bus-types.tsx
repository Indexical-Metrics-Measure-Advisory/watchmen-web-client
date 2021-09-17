import {DataSource} from '@/services/data/tuples/data-source-types';

export enum DataSourceEventTypes {
	DATASOURCE_CODE_CHANGED = 'data-source-name-changed',
	DATASOURCE_TENANT_CHANGED = 'data-source-tenant-changed',
	DATASOURCE_TYPE_CHANGED = 'data-source-type-changed',
	DATASOURCE_CONNECT_PROP_CHANGED = 'data-source-connect-prop-changed',
	DATASOURCE_PARAM_CHANGED = 'data-source-param-changed'
}

export interface DataSourceEventBus {
	fire(type: DataSourceEventTypes.DATASOURCE_CODE_CHANGED, dataSource: DataSource): this;
	on(type: DataSourceEventTypes.DATASOURCE_CODE_CHANGED, listener: (dataSource: DataSource) => void): this;
	off(type: DataSourceEventTypes.DATASOURCE_CODE_CHANGED, listener: (dataSource: DataSource) => void): this;

	fire(type: DataSourceEventTypes.DATASOURCE_TENANT_CHANGED, dataSource: DataSource): this;
	on(type: DataSourceEventTypes.DATASOURCE_TENANT_CHANGED, listener: (dataSource: DataSource) => void): this;
	off(type: DataSourceEventTypes.DATASOURCE_TENANT_CHANGED, listener: (dataSource: DataSource) => void): this;

	fire(type: DataSourceEventTypes.DATASOURCE_TYPE_CHANGED, dataSource: DataSource): this;
	on(type: DataSourceEventTypes.DATASOURCE_TYPE_CHANGED, listener: (dataSource: DataSource) => void): this;
	off(type: DataSourceEventTypes.DATASOURCE_TYPE_CHANGED, listener: (dataSource: DataSource) => void): this;

	fire(type: DataSourceEventTypes.DATASOURCE_CONNECT_PROP_CHANGED, dataSource: DataSource): this;
	on(type: DataSourceEventTypes.DATASOURCE_CONNECT_PROP_CHANGED, listener: (dataSource: DataSource) => void): this;
	off(type: DataSourceEventTypes.DATASOURCE_CONNECT_PROP_CHANGED, listener: (dataSource: DataSource) => void): this;

	fire(type: DataSourceEventTypes.DATASOURCE_PARAM_CHANGED, dataSource: DataSource): this;
	on(type: DataSourceEventTypes.DATASOURCE_PARAM_CHANGED, listener: (dataSource: DataSource) => void): this;
	off(type: DataSourceEventTypes.DATASOURCE_PARAM_CHANGED, listener: (dataSource: DataSource) => void): this;
}