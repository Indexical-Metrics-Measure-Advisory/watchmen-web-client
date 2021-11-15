import {DataSource} from '@/services/data/tuples/data-source-types';
import {QueryTenantForHolder} from '@/services/data/tuples/query-tenant-types';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {TuplePropertyDropdown} from '@/widgets/tuple-workbench/tuple-editor';
import React from 'react';
import {useDataSourceEventBus} from '../data-source-event-bus';
import {DataSourceEventTypes} from '../data-source-event-bus-types';

export const DataSourceTenantInput = (props: { dataSource: DataSource, tenants: Array<QueryTenantForHolder> }) => {
	const {dataSource, tenants} = props;

	const {fire} = useDataSourceEventBus();
	const forceUpdate = useForceUpdate();

	const onTenantChange = (option: DropdownOption) => {
		dataSource.tenantId = option.value as string;
		fire(DataSourceEventTypes.DATASOURCE_TENANT_CHANGED, dataSource);
		forceUpdate();
	};

	const options: Array<DropdownOption> = tenants.map(candidate => {
		return {value: candidate.tenantId, label: candidate.name};
	});

	return <TuplePropertyDropdown value={dataSource.tenantId} options={options} onChange={onTenantChange}/>;
};