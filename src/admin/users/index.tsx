import {isSuperAdmin} from '@/services/data/account';
import {TuplePage} from '@/services/data/query/tuple-page';
import {QueryUser} from '@/services/data/tuples/query-user-types';
import {listTenants} from '@/services/data/tuples/tenant';
import {QueryTuple} from '@/services/data/tuples/tuple-types';
import {fetchUser, listUsers, saveUser} from '@/services/data/tuples/user';
import {User, UserRole} from '@/services/data/tuples/user-types';
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
import UserBackground from '../../assets/user-background.svg';
import {renderCard} from './card';
import {renderEditor} from './editor';

const createUser = (): User => {
	return {
		userId: generateUuid(), name: '', nickName: '', password: '',
		role: UserRole.CONSOLE,
		userGroupIds: [],
		createTime: getCurrentTime(),
		lastModified: getCurrentTime()
	};
};

const fetchUserAndCodes = async (queryUser: QueryUser) => {
	const {user, groups, tenants} = await fetchUser(queryUser.userId);
	// console.log(tenants);
	return {tuple: user, groups, tenants};
};

const getKeyOfUser = (user: QueryUser) => user.userId;

const AdminUsers = () => {
	const {fire: fireGlobal} = useEventBus();
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
				(page: TuplePage<QueryTuple>) => fire(TupleEventTypes.TUPLE_SEARCHED, page, searchText));
		};
		const onSaveUser = async (user: User, onSaved: (user: User, saved: boolean) => void) => {
			if (!user.name || !user.name.trim()) {
				fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>User name is required.</AlertLabel>, () => {
					onSaved(user, false);
				});
				return;
			}
			if (isSuperAdmin() && !user.tenantId) {
				fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>Tenant is required.</AlertLabel>, () => {
					onSaved(user, false);
				});
				return;
			}
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await saveUser(user),
				() => onSaved(user, true),
				() => onSaved(user, false));
		};
		on(TupleEventTypes.DO_CREATE_TUPLE, onDoCreateUser);
		on(TupleEventTypes.DO_EDIT_TUPLE, onDoEditUser);
		on(TupleEventTypes.DO_SEARCH_TUPLE, onDoSearchUser);
		on(TupleEventTypes.SAVE_TUPLE, onSaveUser);
		return () => {
			off(TupleEventTypes.DO_CREATE_TUPLE, onDoCreateUser);
			off(TupleEventTypes.DO_EDIT_TUPLE, onDoEditUser);
			off(TupleEventTypes.DO_SEARCH_TUPLE, onDoSearchUser);
			off(TupleEventTypes.SAVE_TUPLE, onSaveUser);
		};
	}, [on, off, fire, fireGlobal]);

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