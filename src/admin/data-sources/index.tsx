import {TupleEventBusProvider, useTupleEventBus} from '../widgets/tuple-workbench/tuple-event-bus';
import React, {useEffect} from 'react';
import {useEventBus} from '../../events/event-bus';
import {EventTypes} from '../../events/types';
import {TupleEventTypes} from '../widgets/tuple-workbench/tuple-event-bus-types';
import {TUPLE_SEARCH_PAGE_SIZE} from '../../basic-widgets/constants';
import {DataPage} from '../../services/query/data-page';
import {QueryTuple} from '../../services/tuples/tuple-types';
import {AlertLabel} from '../../alert/widgets';
import {TupleWorkbench} from '../widgets/tuple-workbench';
import DataSourceBackground from '../../assets/data-source-background.svg';
import {DataSource} from '../../services/tuples/data-source-types';
import {QueryDataSource} from '../../services/tuples/query-data-source-types';
import {createDataSource} from './utils';
import {fetchDataSource, listDataSources, saveDataSource} from '../../services/tuples/data-source';
import {renderCard} from './card';
import {renderEditor} from './editor';
import {listTenants} from '../../services/tuples/tenant';
import {isMultipleDataSourcesEnabled} from '../../feature-switch';
import {useHistory} from 'react-router-dom';
import {isSuperAdmin} from '../../services/account';
import {Router} from '../../routes/types';

const fetchDataSourceAndCodes = async (queryDataSource: QueryDataSource) => {
	const {dataSource} = await fetchDataSource(queryDataSource.dataSourceId);
	const {data: tenants} = await listTenants({search: '', pageNumber: 1, pageSize: 9999});
	return {tuple: dataSource, tenants};
};

const getKeyOfDataSource = (dataSource: QueryDataSource) => dataSource.dataSourceId;

const AdminDataSources = () => {
	const {once: onceGlobal, fire: fireGlobal} = useEventBus();
	const {on, off, fire} = useTupleEventBus();
	useEffect(() => {
		const onDoCreateDataSource = () => {
			const dataSource = createDataSource();
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => {
					const {data: tenants} = await listTenants({search: '', pageNumber: 1, pageSize: 9999});
					return {tenants};
				},
				({tenants}) => fire(TupleEventTypes.TUPLE_CREATED, dataSource, {tenants}));
		};
		const onDoEditDataSource = async (queryDataSource: QueryDataSource) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await fetchDataSourceAndCodes(queryDataSource),
				({tuple, tenants}) => fire(TupleEventTypes.TUPLE_LOADED, tuple, {tenants}));
		};
		const onDoSearchDataSource = async (searchText: string, pageNumber: number) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await listDataSources({search: searchText, pageNumber, pageSize: TUPLE_SEARCH_PAGE_SIZE}),
				(page: DataPage<QueryTuple>) => fire(TupleEventTypes.TUPLE_SEARCHED, page, searchText));
		};
		const onDoSaveDataSource = async (dataSource: DataSource) => {
			if (!dataSource.dataSourceCode || !dataSource.dataSourceCode.trim()) {
				onceGlobal(EventTypes.ALERT_HIDDEN, () => {
					fire(TupleEventTypes.TUPLE_SAVED, dataSource, false);
				}).fire(EventTypes.SHOW_ALERT, <AlertLabel>Data source code is required.</AlertLabel>);
				return;
			}
			if (!dataSource.dataSourceType) {
				onceGlobal(EventTypes.ALERT_HIDDEN, () => {
					fire(TupleEventTypes.TUPLE_SAVED, dataSource, false);
				}).fire(EventTypes.SHOW_ALERT, <AlertLabel>Data source type is required.</AlertLabel>);
				return;
			}
			if (!dataSource.tenantId) {
				onceGlobal(EventTypes.ALERT_HIDDEN, () => {
					fire(TupleEventTypes.TUPLE_SAVED, dataSource, false);
				}).fire(EventTypes.SHOW_ALERT, <AlertLabel>Data zone is required.</AlertLabel>);
				return;
			}
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await saveDataSource(dataSource),
				() => fire(TupleEventTypes.TUPLE_SAVED, dataSource, true),
				() => fire(TupleEventTypes.TUPLE_SAVED, dataSource, false));
		};
		on(TupleEventTypes.DO_CREATE_TUPLE, onDoCreateDataSource);
		on(TupleEventTypes.DO_EDIT_TUPLE, onDoEditDataSource);
		on(TupleEventTypes.DO_SEARCH_TUPLE, onDoSearchDataSource);
		on(TupleEventTypes.DO_SAVE_TUPLE, onDoSaveDataSource);
		return () => {
			off(TupleEventTypes.DO_CREATE_TUPLE, onDoCreateDataSource);
			off(TupleEventTypes.DO_EDIT_TUPLE, onDoEditDataSource);
			off(TupleEventTypes.DO_SEARCH_TUPLE, onDoSearchDataSource);
			off(TupleEventTypes.DO_SAVE_TUPLE, onDoSaveDataSource);
		};
	}, [on, off, fire, onceGlobal, fireGlobal]);

	return <TupleWorkbench title="Data Sources"
	                       createButtonLabel="Create Data Source" canCreate={true}
	                       searchPlaceholder="Search by data source name, zone name, etc."
	                       tupleLabel="Data Source" tupleImage={DataSourceBackground} tupleImagePosition="left 80px"
	                       renderEditor={renderEditor}
	                       renderCard={renderCard} getKeyOfTuple={getKeyOfDataSource}
	/>;
};

const AdminDataSourcesIndex = () => {
	const history = useHistory();
	if (!isMultipleDataSourcesEnabled()) {
		if (isSuperAdmin()) {
			history.replace(Router.ADMIN_TENANTS);
		} else {
			history.replace(Router.ADMIN_HOME);
		}
		return null;
	}

	return <TupleEventBusProvider>
		<AdminDataSources/>
	</TupleEventBusProvider>;
};

export default AdminDataSourcesIndex;