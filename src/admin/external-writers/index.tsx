import {isWriteExternalEnabled} from '@/feature-switch';
import {Router} from '@/routes/types';
import {isSuperAdmin} from '@/services/data/account';
import {TuplePage} from '@/services/data/query/tuple-page';
import {fetchExternalWriter, listExternalWriters, saveExternalWriter} from '@/services/data/tuples/external-writer';
import {ExternalWriter} from '@/services/data/tuples/external-writer-types';
import {QueryExternalWriter} from '@/services/data/tuples/query-external-writer-types';
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
import ExternalWriterBackground from '../../assets/external-writer-background.svg';
import {useAdminCacheEventBus} from '../cache/cache-event-bus';
import {AdminCacheEventTypes} from '../cache/cache-event-bus-types';
import {renderCard} from './card';
import {renderEditor} from './editor';
import {createExternalWriter} from './utils';

const fetchExternalWriterAndCodes = async (queryExternalWriter: QueryExternalWriter) => {
	const {externalWriter} = await fetchExternalWriter(queryExternalWriter.writerId);
	const {data: tenants} = await listTenants({search: '', pageNumber: 1, pageSize: 9999});
	return {tuple: externalWriter, tenants};
};

const getKeyOfExternalWriter = (externalWriter: QueryExternalWriter) => externalWriter.writerId;

const AdminExternalWriters = () => {
	const {fire: fireGlobal} = useEventBus();
	const {fire: fireCache} = useAdminCacheEventBus();
	const {on, off, fire} = useTupleEventBus();
	useEffect(() => {
		const onDoCreateExternalWriter = () => {
			const dataSource = createExternalWriter();
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => {
					const {data: tenants} = await listTenants({search: '', pageNumber: 1, pageSize: 9999});
					return {tenants};
				},
				({tenants}) => fire(TupleEventTypes.TUPLE_CREATED, dataSource, {tenants}));
		};
		const onDoEditExternalWriter = async (queryExternalWriter: QueryExternalWriter) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await fetchExternalWriterAndCodes(queryExternalWriter),
				({tuple, tenants}) => fire(TupleEventTypes.TUPLE_LOADED, tuple, {tenants}));
		};
		const onDoSearchExternalWriter = async (searchText: string, pageNumber: number) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await listExternalWriters({
					search: searchText,
					pageNumber,
					pageSize: TUPLE_SEARCH_PAGE_SIZE
				}),
				(page: TuplePage<QueryTuple>) => fire(TupleEventTypes.TUPLE_SEARCHED, page, searchText));
		};
		const onSaveExternalWriter = async (externalWriter: ExternalWriter, onSaved: (externalWriter: ExternalWriter, saved: boolean) => void) => {
			if (!externalWriter.writerCode || !externalWriter.writerCode.trim()) {
				fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>External Writer code is required.</AlertLabel>, () => {
					onSaved(externalWriter, false);
				});
				return;
			}
			if (!externalWriter.type) {
				fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>External Writer type is required.</AlertLabel>, () => {
					onSaved(externalWriter, false);
				});
				return;
			}
			if (!externalWriter.tenantId) {
				fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>Data zone is required.</AlertLabel>, () => {
					onSaved(externalWriter, false);
				});
				return;
			}
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await saveExternalWriter(externalWriter),
				() => {
					onSaved(externalWriter, true);
					fireCache(AdminCacheEventTypes.SAVE_EXTERNAL_WRITER, externalWriter);
				},
				() => onSaved(externalWriter, false));
		};
		on(TupleEventTypes.DO_CREATE_TUPLE, onDoCreateExternalWriter);
		on(TupleEventTypes.DO_EDIT_TUPLE, onDoEditExternalWriter);
		on(TupleEventTypes.DO_SEARCH_TUPLE, onDoSearchExternalWriter);
		on(TupleEventTypes.SAVE_TUPLE, onSaveExternalWriter);
		return () => {
			off(TupleEventTypes.DO_CREATE_TUPLE, onDoCreateExternalWriter);
			off(TupleEventTypes.DO_EDIT_TUPLE, onDoEditExternalWriter);
			off(TupleEventTypes.DO_SEARCH_TUPLE, onDoSearchExternalWriter);
			off(TupleEventTypes.SAVE_TUPLE, onSaveExternalWriter);
		};
	}, [on, off, fire, fireCache, fireGlobal]);

	return <TupleWorkbench title="External Writers"
	                       createButtonLabel="Create External Writer" canCreate={true}
	                       searchPlaceholder="Search by external writer name, zone name, etc."
	                       tupleLabel="External Writer" tupleImage={ExternalWriterBackground}
	                       tupleImagePosition="left 80px"
	                       renderEditor={renderEditor}
	                       renderCard={renderCard} getKeyOfTuple={getKeyOfExternalWriter}
	/>;
};

const AdminExternalWritersIndex = () => {
	const history = useHistory();
	if (!isWriteExternalEnabled()) {
		if (isSuperAdmin()) {
			history.replace(Router.ADMIN_TENANTS);
		} else {
			history.replace(Router.ADMIN_HOME);
		}
		return null;
	}

	return <TupleEventBusProvider>
		<AdminExternalWriters/>
	</TupleEventBusProvider>;
};

export default AdminExternalWritersIndex;