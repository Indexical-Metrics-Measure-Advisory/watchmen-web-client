import React, {useEffect} from 'react';
import {AlertLabel} from '../../alert/widgets';
import UserBackground from '../../assets/user-background.svg';
import {TUPLE_SEARCH_PAGE_SIZE} from '../../basic-widgets/constants';
import {useEventBus} from '../../events/event-bus';
import {EventTypes} from '../../events/types';
import {DataPage} from '../../services/query/data-page';
import {QueryUser} from '../../services/tuples/query-user-types';
import {QueryTuple} from '../../services/tuples/tuple-types';
import {fetchUser, listUsers, saveUser} from '../../services/tuples/user';
import {User, UserRole} from '../../services/tuples/user-types';
import {generateUuid} from '../../services/tuples/utils';
import {getCurrentTime} from '../../services/utils';
import {TupleWorkbench} from '../widgets/tuple-workbench';
import {TupleEventBusProvider, useTupleEventBus} from '../widgets/tuple-workbench/tuple-event-bus';
import {TupleEventTypes} from '../widgets/tuple-workbench/tuple-event-bus-types';
import {renderCard} from './card';
import {renderEditor} from './editor';
import {listTenants} from '../../services/tuples/tenant';
import {isSuperAdmin} from '../../services/account';

const createUser = (): User => {
	return {
		userId: generateUuid(), name: '', nickName: '',
		role: UserRole.CONSOLE,
		userGroupIds: [],
		createTime: getCurrentTime(),
		lastModifyTime: getCurrentTime()
	};
};

const fetchUserAndCodes = async (queryUser: QueryUser) => {
	const {user, groups, tenants} = await fetchUser(queryUser.userId);
	console.log(tenants);
	return {tuple: user, groups, tenants};
};

const getKeyOfUser = (user: QueryUser) => user.userId;

const AdminUsers = () => {
	const {once: onceGlobal, fire: fireGlobal} = useEventBus();
	const {on, off, fire} = useTupleEventBus();
	useEffect(() => {
		const onDoCreateUser = async () => {
			const tenants = (await listTenants({search: '', pageNumber: 1, pageSize: 9999})).data;
			fire(TupleEventTypes.TUPLE_CREATED, createUser(), {tenants});
		};
		const onDoEditUser = async (queryUser: QueryUser) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await fetchUserAndCodes(queryUser),
				({tuple, groups, tenants}) => fire(TupleEventTypes.TUPLE_LOADED, tuple, {groups, tenants}));
		};
		const onDoSearchUser = async (searchText: string, pageNumber: number) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await listUsers({search: searchText, pageNumber, pageSize: TUPLE_SEARCH_PAGE_SIZE}),
				(page: DataPage<QueryTuple>) => fire(TupleEventTypes.TUPLE_SEARCHED, page, searchText));
		};
		const onDoSaveUser = async (user: User) => {
			if (!user.name || !user.name.trim()) {
				onceGlobal(EventTypes.ALERT_HIDDEN, () => {
					fire(TupleEventTypes.TUPLE_SAVED, user, false);
				}).fire(EventTypes.SHOW_ALERT, <AlertLabel>User name is required.</AlertLabel>);
				return;
			}
			if (isSuperAdmin() && !user.tenantId) {
				onceGlobal(EventTypes.ALERT_HIDDEN, () => {
					fire(TupleEventTypes.TUPLE_SAVED, user, false);
				}).fire(EventTypes.SHOW_ALERT, <AlertLabel>Tenant is required.</AlertLabel>);
				return;
			}
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await saveUser(user),
				() => fire(TupleEventTypes.TUPLE_SAVED, user, true),
				() => fire(TupleEventTypes.TUPLE_SAVED, user, false));
		};
		on(TupleEventTypes.DO_CREATE_TUPLE, onDoCreateUser);
		on(TupleEventTypes.DO_EDIT_TUPLE, onDoEditUser);
		on(TupleEventTypes.DO_SEARCH_TUPLE, onDoSearchUser);
		on(TupleEventTypes.DO_SAVE_TUPLE, onDoSaveUser);
		return () => {
			off(TupleEventTypes.DO_CREATE_TUPLE, onDoCreateUser);
			off(TupleEventTypes.DO_EDIT_TUPLE, onDoEditUser);
			off(TupleEventTypes.DO_SEARCH_TUPLE, onDoSearchUser);
			off(TupleEventTypes.DO_SAVE_TUPLE, onDoSaveUser);
		};
	}, [on, off, fire, onceGlobal, fireGlobal]);

	return <TupleWorkbench title="Users"
	                       createButtonLabel="Create User" canCreate={true}
	                       searchPlaceholder="Search by user name, group name, etc."
	                       tupleLabel="User" tupleImage={UserBackground} renderEditor={renderEditor}
	                       renderCard={renderCard} getKeyOfTuple={getKeyOfUser}
	/>;
};
const AdminUsersIndex = () => {
	return <TupleEventBusProvider>
		<AdminUsers/>
	</TupleEventBusProvider>;
};

export default AdminUsersIndex;