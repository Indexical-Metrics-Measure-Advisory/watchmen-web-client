import {DataSource} from '@/services/data/tuples/data-source-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {TuplePropertyInput} from '@/widgets/tuple-workbench/tuple-editor';
import React, {ChangeEvent} from 'react';
import {useDataSourceEventBus} from '../data-source-event-bus';
import {DataSourceEventTypes} from '../data-source-event-bus-types';

export const DataSourceCodeInput = (props: { dataSource: DataSource }) => {
	const {dataSource} = props;

	const {fire} = useDataSourceEventBus();
	const forceUpdate = useForceUpdate();
	const onCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (dataSource.dataSourceCode !== event.target.value) {
			dataSource.dataSourceCode = event.target.value;
			fire(DataSourceEventTypes.DATASOURCE_CODE_CHANGED, dataSource);
			forceUpdate();
		}
	};

	return <TuplePropertyInput value={dataSource.dataSourceCode || ''} onChange={onCodeChange}/>;
};