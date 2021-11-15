import {TuplePage} from '@/services/data/query/tuple-page';
import {QueryUserGroup} from '@/services/data/tuples/query-user-group-types';
import {QueryTuple} from '@/services/data/tuples/tuple-types';
import {fetchUserGroup, listUserGroups, saveUserGroup} from '@/services/data/tuples/user-group';
import {UserGroup} from '@/services/data/tuples/user-group-types';
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
import UserGroupBackground from '../../assets/user-group-background.svg';
import {renderCard} from './card';
import {renderEditor} from './editor';

const createUserGroup = (): UserGroup => {
	return {
		userGroupId: generateUuid(), name: '', spaceIds: [], userIds: [],
		createTime: getCurrentTime(),
		lastModified: getCurrentTime()
	};
};

const fetchUserGroupAndCodes = async (queryUserGroup: QueryUserGroup) => {
	const {userGroup, spaces, users} = await fetchUserGroup(queryUserGroup.userGroupId);
	return {tuple: userGroup, spaces, users};
};

const getKeyOfUserGroup = (userGroup: QueryUserGroup) => userGroup.userGroupId;

const AdminUserGroups = () => {
	const {fire: fireGlobal} = useEventBus();
	const {on, off, fire} = useTupleEventBus();
	useEffect(() => {
		const onDoCreateUserGroup = () => {
			fire(TupleEventTypes.TUPLE_CREATED, createUserGroup());
		};
		const onDoEditUserGroup = async (queryUserGroup: QueryUserGroup) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await fetchUserGroupAndCodes(queryUserGroup),
				({tuple, spaces, users}) => fire(TupleEventTypes.TUPLE_LOADED, tuple, {spaces, users}));
		};
		const onDoSearchUserGroup = async (searchText: string, pageNumber: number) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await listUserGroups({search: searchText, pageNumber, pageSize: TUPLE_SEARCH_PAGE_SIZE}),
				(page: TuplePage<QueryTuple>) => fire(TupleEventTypes.TUPLE_SEARCHED, page, searchText));
		};
		const onSaveUserGroup = async (userGroup: UserGroup, onSaved: (userGroup: UserGroup, saved: boolean) => void) => {
			if (!userGroup.name || !userGroup.name.trim()) {
				fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>User group name is required.</AlertLabel>, () => {
					onSaved(userGroup, false);
				});
			} else {
				fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
					async () => await saveUserGroup(userGroup),
					() => onSaved(userGroup, true),
					() => onSaved(userGroup, false));
			}
		};
		on(TupleEventTypes.DO_CREATE_TUPLE, onDoCreateUserGroup);
		on(TupleEventTypes.DO_EDIT_TUPLE, onDoEditUserGroup);
		on(TupleEventTypes.DO_SEARCH_TUPLE, onDoSearchUserGroup);
		on(TupleEventTypes.SAVE_TUPLE, onSaveUserGroup);
		return () => {
			off(TupleEventTypes.DO_CREATE_TUPLE, onDoCreateUserGroup);
			off(TupleEventTypes.DO_EDIT_TUPLE, onDoEditUserGroup);
			off(TupleEventTypes.DO_SEARCH_TUPLE, onDoSearchUserGroup);
			off(TupleEventTypes.SAVE_TUPLE, onSaveUserGroup);
		};
	}, [on, off, fire, fireGlobal]);

	return <TupleWorkbench title="User Groups"
	                       createButtonLabel="Create User Group" canCreate={true}
	                       searchPlaceholder="Search by group name, user name, description, etc."
	                       tupleLabel="User Group" tupleImage={UserGroupBackground} renderEditor={renderEditor}
	                       renderCard={renderCard} getKeyOfTuple={getKeyOfUserGroup}
	/>;
};
const AdminUserGroupsIndex = () => {
	return <TupleEventBusProvider>
		<AdminUserGroups/>
	</TupleEventBusProvider>;
};

export default AdminUserGroupsIndex;