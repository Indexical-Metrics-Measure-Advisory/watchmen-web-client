import {QueryUserGroupForHolder} from '@/services/data/tuples/query-user-group-types';
import {listUserGroupsForHolder} from '@/services/data/tuples/user-group';
import {UserGroupId} from '@/services/data/tuples/user-group-types';
import {User} from '@/services/data/tuples/user-types';
import {TupleItemPicker} from '@/widgets/tuple-workbench/tuple-item-picker';
import React from 'react';

const hasUserGroup = (user: User) => !!user.userGroupIds && user.userGroupIds.length > 0;
const getUserGroupIds = (user: User): Array<UserGroupId> => user.userGroupIds;
const findNameFromUserGroups = (userGroupId: UserGroupId, userGroups: Array<QueryUserGroupForHolder>): string => {
	// eslint-disable-next-line
	return userGroups.find(userGroup => userGroup.userGroupId == userGroupId)!.name;
};
const removeUserGroup = (user: User) => (userGroupOrId: string | QueryUserGroupForHolder) => {
	let userGroupId: UserGroupId;
	if (typeof userGroupOrId === 'string') {
		userGroupId = userGroupOrId;
	} else {
		userGroupId = userGroupOrId.userGroupId;
	}
	// eslint-disable-next-line
	const index = user.userGroupIds.findIndex(id => id == userGroupId);
	if (index !== -1) {
		user.userGroupIds.splice(index, 1);
	}
};
const addUserGroup = (user: User) => (userGroup: QueryUserGroupForHolder) => {
	const {userGroupId} = userGroup;
	// eslint-disable-next-line
	const index = user.userGroupIds.findIndex(id => id == userGroupId);
	if (index === -1) {
		user.userGroupIds.push(userGroupId);
	}
};
const getIdOfUserGroup = (userGroup: QueryUserGroupForHolder) => userGroup.userGroupId;
const getNameOfUserGroup = (userGroup: QueryUserGroupForHolder) => userGroup.name;
// eslint-disable-next-line
const isUserGroupPicked = (user: User) => (userGroup: QueryUserGroupForHolder) => user.userGroupIds.some(userGroupId => userGroupId == userGroup.userGroupId);

export const UserGroupPicker = (props: {
	label: string;
	user: User;
	codes: Array<QueryUserGroupForHolder>;
}) => {
	const {label, user, codes} = props;

	return <TupleItemPicker actionLabel={label}
	                        holder={user} codes={codes}
	                        isHolding={hasUserGroup} getHoldIds={getUserGroupIds} getNameOfHold={findNameFromUserGroups}
	                        listCandidates={listUserGroupsForHolder} getIdOfCandidate={getIdOfUserGroup}
	                        getNameOfCandidate={getNameOfUserGroup} isCandidateHold={isUserGroupPicked(user)}
	                        removeHold={removeUserGroup(user)} addHold={addUserGroup(user)}/>;
};
