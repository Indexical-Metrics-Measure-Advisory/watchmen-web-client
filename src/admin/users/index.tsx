import React, { useEffect } from 'react';
import UserBackground from '../../assets/user-background.png';
import { TUPLE_SEARCH_PAGE_SIZE } from '../../basic-widgets/constants';
import { QueryUser } from '../../services/tuples/query-user-types';
import { fetchUser, listUsers, saveUser } from '../../services/tuples/user';
import { User } from '../../services/tuples/user-types';
import { generateUuid } from '../../services/tuples/utils';
import { TupleWorkbench } from '../widgets/tuple-workbench';
import { TupleEventBusProvider, useTupleEventBus } from '../widgets/tuple-workbench/tuple-event-bus';
import { TupleEventTypes } from '../widgets/tuple-workbench/tuple-event-bus-types';
import { renderCard } from './card';
import { renderEditor } from './editor';

const createUser = (): User => {
	return { userId: generateUuid(), name: '', nickName: '', userGroupIds: [] };
};

const fetchUserAndCodes = async (queryUser: QueryUser) => {
	const { user, groups } = await fetchUser(queryUser.userId);
	return { tuple: user, groups };
};

const getKeyOfUser = (user: QueryUser) => user.userId;

const AdminUsers = () => {
	const { on, off, fire } = useTupleEventBus();
	useEffect(() => {
		const onDoCreateUser = () => {
			fire(TupleEventTypes.TUPLE_CREATED, createUser());
		};
		const onDoEditUser = async (queryUser: QueryUser) => {
			const { tuple, groups } = await fetchUserAndCodes(queryUser);
			fire(TupleEventTypes.TUPLE_LOADED, tuple, { groups });
		};
		const onDoSearchUser = async (searchText: string, pageNumber: number) => {
			const page = await listUsers({ search: searchText, pageNumber, pageSize: TUPLE_SEARCH_PAGE_SIZE });
			fire(TupleEventTypes.TUPLE_SEARCHED, page, searchText);
		};
		const onDoSaveUser = async (user: User) => {
			await saveUser(user);
			fire(TupleEventTypes.TUPLE_SAVED, user);
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
	}, [ on, off, fire ]);

	return <TupleWorkbench title='Users'
	                       createButtonLabel='Create User' canCreate={true}
	                       searchPlaceholder='Search by user name, group name, etc.'
	                       tupleLabel='User' tupleImage={UserBackground} renderEditor={renderEditor}
	                       renderCard={renderCard} getKeyOfTuple={getKeyOfUser}
	/>;
};
const AdminUsersIndex = () => {
	return <TupleEventBusProvider>
		<AdminUsers/>
	</TupleEventBusProvider>;
};

export default AdminUsersIndex;