import {Router} from '@/routes/types';
import {isSuperAdmin} from '@/services/data/account';
import {TuplePage} from '@/services/data/query/tuple-page';
import {QueryTenant} from '@/services/data/tuples/query-tenant-types';
import {listTenants, saveTenant} from '@/services/data/tuples/tenant';
import {Tenant} from '@/services/data/tuples/tenant-types';
import {QueryTuple} from '@/services/data/tuples/tuple-types';
import {generateUuid} from '@/services/data/tuples/utils';
import {getCurrentTime} from '@/services/data/utils';
import {AlertLabel} from '@/widgets/alert/widgets';
import {TUPLE_SEARCH_PAGE_SIZE} from '@/widgets/basic/constants';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {TupleWorkbench} from '@/widgets/tuple-workbench';
import {TupleEventBusProvider, useTupleEventBus} from '@/widgets/tuple-workbench/tuple-event-bus';
import {TupleEventTypes} from '@/widgets/tuple-workbench/tuple-event-bus-types';
import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import TenantBackground from '../../assets/tenant-background.svg';
import {renderCard} from './card';
import {renderEditor} from './editor';

const createTenant = (): Tenant => {
	return {
		tenantId: generateUuid(), name: '',
		createTime: getCurrentTime(),
		lastModified: getCurrentTime()
	};
};

const fetchTenant = async (queryTenant: QueryTenant) => {
	return {tuple: queryTenant};
};

const getKeyOfTenant = (tenant: QueryTenant) => tenant.tenantId;

const AdminTenants = () => {
	const {fire: fireGlobal} = useEventBus();
	const {on, off, fire} = useTupleEventBus();
	useEffect(() => {
		const onDoCreateTenant = () => {
			fire(TupleEventTypes.TUPLE_CREATED, createTenant());
		};
		const onDoEditTenant = async (queryTenant: QueryTenant) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await fetchTenant(queryTenant),
				({tuple}) => fire(TupleEventTypes.TUPLE_LOADED, tuple, {}));
		};
		const onDoSearchTenant = async (searchText: string, pageNumber: number) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await listTenants({search: searchText, pageNumber, pageSize: TUPLE_SEARCH_PAGE_SIZE}),
				(page: TuplePage<QueryTuple>) => fire(TupleEventTypes.TUPLE_SEARCHED, page, searchText));
		};
		const onSaveTenant = async (tenant: Tenant, onSaved: (tenant: Tenant, saved: boolean) => void) => {
			if (!tenant.name || !tenant.name.trim()) {
				fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>Zone name is required.</AlertLabel>, () => {
					onSaved(tenant, false);
				});
			} else {
				fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
					async () => await saveTenant(tenant),
					() => onSaved(tenant, true),
					() => onSaved(tenant, false));
			}
		};
		on(TupleEventTypes.DO_CREATE_TUPLE, onDoCreateTenant);
		on(TupleEventTypes.DO_EDIT_TUPLE, onDoEditTenant);
		on(TupleEventTypes.DO_SEARCH_TUPLE, onDoSearchTenant);
		on(TupleEventTypes.SAVE_TUPLE, onSaveTenant);
		return () => {
			off(TupleEventTypes.DO_CREATE_TUPLE, onDoCreateTenant);
			off(TupleEventTypes.DO_EDIT_TUPLE, onDoEditTenant);
			off(TupleEventTypes.DO_SEARCH_TUPLE, onDoSearchTenant);
			off(TupleEventTypes.SAVE_TUPLE, onSaveTenant);
		};
	}, [on, off, fire, fireGlobal]);

	return <TupleWorkbench title="Data Zones"
	                       createButtonLabel="Create Data Zone" canCreate={true}
	                       searchPlaceholder="Search by name"
	                       tupleLabel="Data Zone" tupleImage={TenantBackground} renderEditor={renderEditor}
	                       renderCard={renderCard} getKeyOfTuple={getKeyOfTenant}
	/>;
};
const AdminTenantsIndex = () => {
	const history = useHistory();

	if (!isSuperAdmin()) {
		history.replace(Router.ADMIN_HOME);
		return null;
	}

	return <TupleEventBusProvider>
		<AdminTenants/>
	</TupleEventBusProvider>;
};

export default AdminTenantsIndex;