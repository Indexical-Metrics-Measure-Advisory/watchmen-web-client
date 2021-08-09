import React from 'react';
import {DropdownOption} from '../../../basic-widgets/types';
import {useForceUpdate} from '../../../basic-widgets/utils';
import {TuplePropertyDropdown} from '../../widgets/tuple-workbench/tuple-editor';
import {useDataSourceEventBus} from '../data-source-event-bus';
import {DataSourceEventTypes} from '../data-source-event-bus-types';
import {DataSource, DataSourceType} from '../../../services/tuples/data-source-types';

export const DataSourceTypeInput = (props: { dataSource: DataSource }) => {
	const {dataSource} = props;

	const {fire} = useDataSourceEventBus();
	const forceUpdate = useForceUpdate();

	const onTypeChange = (option: DropdownOption) => {
		dataSource.dataSourceType = option.value as DataSourceType;
		fire(DataSourceEventTypes.DATASOURCE_TYPE_CHANGED, dataSource);
		forceUpdate();
	};

	const options: Array<DropdownOption> = [
		{value: DataSourceType.MYSQL, label: 'MySQL'},
		{value: DataSourceType.ORACLE, label: 'Oracle'},
		{value: DataSourceType.MONGODB, label: 'MongoDB'}
	];

	return <TuplePropertyDropdown value={dataSource.dataSourceType} options={options} onChange={onTypeChange}/>;
};