import React from 'react';
import {useForceUpdate} from '../../../basic-widgets/utils';
import {TuplePropertyInput} from '../../widgets/tuple-workbench/tuple-editor';
import {useDataSourceEventBus} from '../data-source-event-bus';
import {DataSourceEventTypes} from '../data-source-event-bus-types';
import {DataSource} from '../../../services/tuples/data-source-types';

export const DataSourceCodeInput = (props: { dataSource: DataSource }) => {
	const {dataSource} = props;

	const {fire} = useDataSourceEventBus();
	const forceUpdate = useForceUpdate();
	const onCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (dataSource.dataSourceCode !== event.target.value) {
			dataSource.dataSourceCode = event.target.value;
			fire(DataSourceEventTypes.DATASOURCE_CODE_CHANGED, dataSource);
			forceUpdate();
		}
	};

	return <TuplePropertyInput value={dataSource.dataSourceCode || ''} onChange={onCodeChange}/>;
};