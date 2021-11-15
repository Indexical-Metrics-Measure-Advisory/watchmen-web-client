import {QueryUserGroupForHolder} from '@/services/data/tuples/query-user-group-types';
import {Space} from '@/services/data/tuples/space-types';
import {listUserGroupsForHolder} from '@/services/data/tuples/user-group';
import {UserGroupId} from '@/services/data/tuples/user-group-types';
import {TupleItemPicker} from '@/widgets/tuple-workbench/tuple-item-picker';
import React from 'react';

const hasUserGroup = (space: Space) => !!space.userGroupIds && space.userGroupIds.length > 0;
const getUserGroupIds = (space: Space): Array<UserGroupId> => space.userGroupIds;
const findNameFromUserGroups = (userGroupId: UserGroupId, userGroups: Array<QueryUserGroupForHolder>): string => {
	// eslint-disable-next-line
	return userGroups.find(userGroup => userGroup.userGroupId == userGroupId)!.name;
};
const removeUserGroup = (space: Space) => (userGroupOrId: string | QueryUserGroupForHolder) => {
	let userGroupId: UserGroupId;
	if (typeof userGroupOrId === 'string') {
		userGroupId = userGroupOrId;
	} else {
		userGroupId = userGroupOrId.userGroupId;
	}
	// eslint-disable-next-line
	const index = space.userGroupIds.findIndex(id => id == userGroupId);
	if (index !== -1) {
		space.userGroupIds.splice(index, 1);
	}
};
const addUserGroup = (space: Space) => (userGroup: QueryUserGroupForHolder) => {
	const {userGroupId} = userGroup;
	// eslint-disable-next-line
	const index = space.userGroupIds.findIndex(id => id == userGroupId);
	if (index === -1) {
		space.userGroupIds.push(userGroupId);
	}
};
const getIdOfUserGroup = (userGroup: QueryUserGroupForHolder) => userGroup.userGroupId;
const getNameOfUserGroup = (userGroup: QueryUserGroupForHolder) => userGroup.name;
// eslint-disable-next-line
const isUserGroupPicked = (space: Space) => (userGroup: QueryUserGroupForHolder) => space.userGroupIds.some(userGroupId => userGroupId == userGroup.userGroupId);

export const UserGroupPicker = (props: {
	label: string;
	space: Space;
	codes: Array<QueryUserGroupForHolder>;
}) => {
	const {label, space, codes} = props;

	return <TupleItemPicker actionLabel={label}
	                        holder={space} codes={codes}
	                        isHolding={hasUserGroup} getHoldIds={getUserGroupIds} getNameOfHold={findNameFromUserGroups}
	                        listCandidates={listUserGroupsForHolder} getIdOfCandidate={getIdOfUserGroup}
	                        getNameOfCandidate={getNameOfUserGroup} isCandidateHold={isUserGroupPicked(space)}
	                        removeHold={removeUserGroup(space)} addHold={addUserGroup(space)}/>;
};
