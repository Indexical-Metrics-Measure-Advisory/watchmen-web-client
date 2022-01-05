import {isMultipleDataSourcesEnabled} from '@/feature-switch';
import {Router} from '@/routes/types';
import {isSuperAdmin} from '@/services/data/account';
import {TuplePage} from '@/services/data/query/tuple-page';
import {fetchDataSource, listDataSources, saveDataSource} from '@/services/data/tuples/data-source';
import {DataSource} from '@/services/data/tuples/data-source-types';
import {QueryDataSource} from '@/services/data/tuples/query-data-source-types';
import {listTenants} from '@/services/data/tuples/tenant';
import {QueryTuple} from '@/services/data/tuples/tuple-types';
import {AlertLabel} from '@/widgets/alert/widgets';
import {TUPLE_SEARCH_PAGE_SIZE} from '@/widgets/basic/constants';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {TupleWorkbench} from '@/widgets/tuple-workbench';
import {TupleEventBusProvider, useTupleEventBus} from '@/widgets/tuple-workbench/tuple-event-bus';
import {TupleEventTypes} from '@/widgets/tuple-workbench/tuple-event-bus-types';
import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import DataSourceBackground from '../../assets/data-source-background.svg';
import {useAdminCacheEventBus} from '../cache/cache-event-bus';
import {AdminCacheEventTypes} from '../cache/cache-event-bus-types';
import {renderCard} from './card';
import {renderEditor} from './editor';
import {createDataSource} from './utils';

const fetchDataSourceAndCodes = async (queryDataSource: QueryDataSource) => {
	const {dataSource} = await fetchDataSource(queryDataSource.dataSourceId);
	const {data: tenants} = await listTenants({search: '', pageNumber: 1, pageSize: 9999});
	return {tuple: dataSource, tenants};
};

const getKeyOfDataSource = (dataSource: QueryDataSource) => dataSource.dataSourceId;

const AdminDataSources = () => {
	const {fire: fireGlobal} = useEventBus();
	const {fire: fireCache} = useAdminCacheEventBus();
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
				(page: TuplePage<QueryTuple>) => fire(TupleEventTypes.TUPLE_SEARCHED, page, searchText));
		};
		const onSaveDataSource = async (dataSource: DataSource, onSaved: (dataSource: DataSource, saved: boolean) => void) => {
			if (!dataSource.dataSourceCode || !dataSource.dataSourceCode.trim()) {
				fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>Data source code is required.</AlertLabel>, () => {
					onSaved(dataSource, false);
				});
				return;
			}
			if (!dataSource.dataSourceType) {
				fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>Data source type is required.</AlertLabel>, () => {
					onSaved(dataSource, false);
				});
				return;
			}
			if (!dataSource.tenantId) {
				fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>Data zone is required.</AlertLabel>, () => {
					onSaved(dataSource, false);
				});
				return;
			}
			const hasIncorrectParam = (dataSource.params || []).some(({name, value}) => {
				return (name || '').trim().length === 0 && (value || '').trim().length !== 0;
			});
			if (hasIncorrectParam) {
				fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>Extra parameter name is required.</AlertLabel>, () => {
					onSaved(dataSource, false);
				});
				return;
			}
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST, async () => {
				dataSource.params = (dataSource.params || [])
					.filter(({name}) => {
						return (name || '').trim().length !== 0;
					});
				return await saveDataSource(dataSource);
			}, () => {
				onSaved(dataSource, true);
				fireCache(AdminCacheEventTypes.SAVE_DATA_SOURCE, dataSource);
			}, () => onSaved(dataSource, false));
		};
		on(TupleEventTypes.DO_CREATE_TUPLE, onDoCreateDataSource);
		on(TupleEventTypes.DO_EDIT_TUPLE, onDoEditDataSource);
		on(TupleEventTypes.DO_SEARCH_TUPLE, onDoSearchDataSource);
		on(TupleEventTypes.SAVE_TUPLE, onSaveDataSource);
		return () => {
			off(TupleEventTypes.DO_CREATE_TUPLE, onDoCreateDataSource);
			off(TupleEventTypes.DO_EDIT_TUPLE, onDoEditDataSource);
			off(TupleEventTypes.DO_SEARCH_TUPLE, onDoSearchDataSource);
			off(TupleEventTypes.SAVE_TUPLE, onSaveDataSource);
		};
	}, [on, off, fire, fireCache, fireGlobal]);

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