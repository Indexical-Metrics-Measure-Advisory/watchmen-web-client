import React, { useEffect } from 'react';
import UserGroupBackground from '../../assets/user-group-background.png';
import { TUPLE_SEARCH_PAGE_SIZE } from '../../basic-widgets/constants';
import { QueryUserGroup } from '../../services/tuples/query-user-group-types';
import { fetchUserGroup, listUserGroups, saveUserGroup } from '../../services/tuples/user-group';
import { UserGroup } from '../../services/tuples/user-group-types';
import { generateUuid } from '../../services/tuples/utils';
import { TupleWorkbench } from '../widgets/tuple-workbench';
import { TupleEventBusProvider, useTupleEventBus } from '../widgets/tuple-workbench/tuple-event-bus';
import { TupleEventTypes } from '../widgets/tuple-workbench/tuple-event-bus-types';
import { renderCard } from './card';
import { renderEditor } from './editor';

const createUserGroup = (): UserGroup => {
	return { userGroupId: generateUuid(), name: '', spaceIds: [], userIds: [] };
};

const fetchUserGroupAndCodes = async (queryUserGroup: QueryUserGroup) => {
	const { userGroup, spaces, users } = await fetchUserGroup(queryUserGroup.userGroupId);
	return { tuple: userGroup, spaces, users };
};

const getKeyOfUserGroup = (userGroup: QueryUserGroup) => userGroup.userGroupId;

const AdminUserGroups = () => {
	const { on, off, fire } = useTupleEventBus();
	useEffect(() => {
		const onDoCreateUserGroup = () => {
			fire(TupleEventTypes.TUPLE_CREATED, createUserGroup());
		};
		const onDoEditUserGroup = async (queryUserGroup: QueryUserGroup) => {
			const { tuple, spaces, users } = await fetchUserGroupAndCodes(queryUserGroup);
			fire(TupleEventTypes.TUPLE_LOADED, tuple, { spaces, users });
		};
		const onDoSearchUserGroup = async (searchText: string, pageNumber: number) => {
			const page = await listUserGroups({ search: searchText, pageNumber, pageSize: TUPLE_SEARCH_PAGE_SIZE });
			fire(TupleEventTypes.TUPLE_SEARCHED, page, searchText);
		};
		const onDoSaveUserGroup = async (userGroup: UserGroup) => {
			await saveUserGroup(userGroup);
			fire(TupleEventTypes.TUPLE_SAVED, userGroup);
		};
		on(TupleEventTypes.DO_CREATE_TUPLE, onDoCreateUserGroup);
		on(TupleEventTypes.DO_EDIT_TUPLE, onDoEditUserGroup);
		on(TupleEventTypes.DO_SEARCH_TUPLE, onDoSearchUserGroup);
		on(TupleEventTypes.DO_SAVE_TUPLE, onDoSaveUserGroup);
		return () => {
			off(TupleEventTypes.DO_CREATE_TUPLE, onDoCreateUserGroup);
			off(TupleEventTypes.DO_EDIT_TUPLE, onDoEditUserGroup);
			off(TupleEventTypes.DO_SEARCH_TUPLE, onDoSearchUserGroup);
			off(TupleEventTypes.DO_SAVE_TUPLE, onDoSaveUserGroup);
		};
	}, [ on, off, fire ]);

	return <TupleWorkbench title='User Groups'
	                       createButtonLabel='Create User Group' canCreate={true}
	                       searchPlaceholder='Search by group name, user name, description, etc.'
	                       tupleLabel='User Group' tupleImage={UserGroupBackground} renderEditor={renderEditor}
	                       renderCard={renderCard} getKeyOfTuple={getKeyOfUserGroup}
	/>;
};
const AdminUserGroupsIndex = () => {
	return <TupleEventBusProvider>
		<AdminUserGroups/>
	</TupleEventBusProvider>;
};

export default AdminUserGroupsIndex;