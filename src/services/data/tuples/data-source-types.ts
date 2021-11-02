import {TenantId} from './tenant-types';
import {Tuple} from './tuple-types';

export enum DataSourceType {
	MYSQL = 'mysql',
	ORACLE = 'oracle',
	MONGODB = 'mongodb'
}

export interface DataSourceParam {
	name: string;
	value: string;
}

export type DataSourceId = string;

export interface DataSource extends Tuple {
	dataSourceId: DataSourceId;
	dataSourceCode: string;
	dataSourceType: DataSourceType;
	host: string;
	port: string;
	name: string;
	username: string;
	password: string;
	url: string;
	params: Array<DataSourceParam>;
	tenantId?: TenantId;
}
