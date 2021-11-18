import {DataSource} from '@/services/data/tuples/data-source-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {TuplePropertyInput} from '@/widgets/tuple-workbench/tuple-editor';
import React, {ChangeEvent} from 'react';
import {useDataSourceEventBus} from '../data-source-event-bus';
import {DataSourceEventTypes} from '../data-source-event-bus-types';

export const DataSourceConnectInput = (props: { dataSource: DataSource, propName: 'host' | 'port' | 'username' | 'password' | 'name' }) => {
	const {dataSource, propName} = props;

	const {fire} = useDataSourceEventBus();
	const forceUpdate = useForceUpdate();
	const onCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (dataSource[propName] !== event.target.value) {
			dataSource[propName] = event.target.value;
			fire(DataSourceEventTypes.DATASOURCE_CONNECT_PROP_CHANGED, dataSource);
			forceUpdate();
		}
	};

	return <TuplePropertyInput value={dataSource[propName] || ''} onChange={onCodeChange}/>;
};