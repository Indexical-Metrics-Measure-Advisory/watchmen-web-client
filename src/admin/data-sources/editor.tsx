import React from 'react';
import {TuplePropertyLabel} from '../widgets/tuple-workbench/tuple-editor';
import {HoldByDataSource} from './types';
import {DataSource} from '../../services/tuples/data-source-types';
import {DataSourceCodeInput} from './data-source/data-source-code-input';
import {DataSourceEventBusProvider} from './data-source-event-bus';
import {DataSourceTenantInput} from './data-source/data-source-tenant-input';
import {QueryTenantForHolder} from '../../services/tuples/query-tenant-types';

const DataSourceEditor = (props: { dataSource: DataSource; tenants: Array<QueryTenantForHolder>; }) => {
	const {dataSource, tenants} = props;

	return <DataSourceEventBusProvider>
		<TuplePropertyLabel>Data Source Code:</TuplePropertyLabel>
		<DataSourceCodeInput dataSource={dataSource}/>
		<TuplePropertyLabel>Data Zone:</TuplePropertyLabel>
		<DataSourceTenantInput dataSource={dataSource} tenants={tenants}/>
		{/*<TuplePropertyLabel>Description:</TuplePropertyLabel>*/}
	</DataSourceEventBusProvider>;
};

export const renderEditor = (dataSource: DataSource, codes?: HoldByDataSource) => {
	const tenants: Array<QueryTenantForHolder> = (codes?.tenants || []);
	return <DataSourceEditor dataSource={dataSource} tenants={tenants}/>;
};
