import React from 'react';
import {TuplePropertyLabel} from '../widgets/tuple-workbench/tuple-editor';
import {HoldByDataSource} from './types';
import {DataSource} from '@/services/tuples/data-source-types';
import {DataSourceCodeInput} from './data-source/data-source-code-input';
import {DataSourceEventBusProvider} from './data-source-event-bus';
import {DataSourceTenantInput} from './data-source/data-source-tenant-input';
import {QueryTenantForHolder} from '@/services/tuples/query-tenant-types';
import {DataSourceTypeInput} from './data-source/data-source-type-input';
import {DataSourceConnectInput} from './data-source/data-source-connection-input';
import {DataSourceParams} from './data-source/data-source-params';

const DataSourceEditor = (props: { dataSource: DataSource; tenants: Array<QueryTenantForHolder>; }) => {
	const {dataSource, tenants} = props;

	return <DataSourceEventBusProvider>
		<TuplePropertyLabel>Data Source Code:</TuplePropertyLabel>
		<DataSourceCodeInput dataSource={dataSource}/>
		<TuplePropertyLabel>Data Source Type:</TuplePropertyLabel>
		<DataSourceTypeInput dataSource={dataSource}/>
		<TuplePropertyLabel>Data Zone:</TuplePropertyLabel>
		<DataSourceTenantInput dataSource={dataSource} tenants={tenants}/>
		<TuplePropertyLabel>Host:</TuplePropertyLabel>
		<DataSourceConnectInput dataSource={dataSource} propName="host"/>
		<TuplePropertyLabel>Port:</TuplePropertyLabel>
		<DataSourceConnectInput dataSource={dataSource} propName="port"/>
		<TuplePropertyLabel>Data Source Name:</TuplePropertyLabel>
		<DataSourceConnectInput dataSource={dataSource} propName="name"/>
		<TuplePropertyLabel>Username:</TuplePropertyLabel>
		<DataSourceConnectInput dataSource={dataSource} propName="username"/>
		<TuplePropertyLabel>Password:</TuplePropertyLabel>
		<DataSourceConnectInput dataSource={dataSource} propName="password"/>
		<DataSourceParams dataSource={dataSource}/>
	</DataSourceEventBusProvider>;
};

export const renderEditor = (dataSource: DataSource, codes?: HoldByDataSource) => {
	const tenants: Array<QueryTenantForHolder> = (codes?.tenants || []);
	return <DataSourceEditor dataSource={dataSource} tenants={tenants}/>;
};
