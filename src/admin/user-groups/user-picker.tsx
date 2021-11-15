import {QueryUserForHolder} from '@/services/data/tuples/query-user-types';
import {listUsersForHolder} from '@/services/data/tuples/user';
import {UserGroup} from '@/services/data/tuples/user-group-types';
import {UserId} from '@/services/data/tuples/user-types';
import {TupleItemPicker} from '@/widgets/tuple-workbench/tuple-item-picker';
import React from 'react';

const hasUser = (userGroup: UserGroup) => !!userGroup.userIds && userGroup.userIds.length > 0;
const getUserIds = (userGroup: UserGroup): Array<UserId> => userGroup.userIds;
const findNameFromUsers = (userId: UserId, users: Array<QueryUserForHolder>): string => {
	// eslint-disable-next-line
	return users.find(user => user.userId == userId)!.name;
};
const removeUser = (userGroup: UserGroup) => (userOrId: string | QueryUserForHolder) => {
	let userId: UserId;
	if (typeof userOrId === 'string') {
		userId = userOrId;
	} else {
		userId = userOrId.userId;
	}
	// eslint-disable-next-line
	const index = userGroup.userIds.findIndex(id => id == userId);
	if (index !== -1) {
		userGroup.userIds.splice(index, 1);
	}
};
const addUser = (userGroup: UserGroup) => (user: QueryUserForHolder) => {
	const {userId} = user;
	// eslint-disable-next-line
	const index = userGroup.userIds.findIndex(id => id == userId);
	if (index === -1) {
		userGroup.userIds.push(userId);
	}
};
const getIdOfUser = (user: QueryUserForHolder) => user.userId;
const getNameOfUser = (user: QueryUserForHolder) => user.name;
// eslint-disable-next-line
const isUserPicked = (userGroup: UserGroup) => (user: QueryUserForHolder) => userGroup.userIds.some(userId => userId == user.userId);

export const UserPicker = (props: {
	label: string;
	userGroup: UserGroup;
	codes: Array<QueryUserForHolder>;
}) => {
	const {label, userGroup, codes} = props;

	return <TupleItemPicker actionLabel={label}
	                        holder={userGroup} codes={codes}
	                        isHolding={hasUser} getHoldIds={getUserIds} getNameOfHold={findNameFromUsers}
	                        listCandidates={listUsersForHolder} getIdOfCandidate={getIdOfUser}
	                        getNameOfCandidate={getNameOfUser} isCandidateHold={isUserPicked(userGroup)}
	                        removeHold={removeUser(userGroup)} addHold={addUser(userGroup)}/>;
};
