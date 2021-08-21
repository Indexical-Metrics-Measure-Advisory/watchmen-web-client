import {QueryTuple, QueryTupleForHolder} from './tuple-types';
import {DataSource} from './data-source-types';

export interface QueryDataSource extends Pick<DataSource, 'dataSourceId' | 'dataSourceType' | 'dataSourceCode' | 'createTime' | 'lastModified'>, QueryTuple {
	tenantName: string;
}

export interface QueryDataSourceForHolder extends Pick<DataSource, 'dataSourceId' | 'dataSourceCode'>, QueryTupleForHolder {
}