import {QueryTuple, QueryTupleForHolder} from './tuple-types';
import {UserGroup} from './user-group-types';

export interface QueryUserGroup extends Pick<UserGroup, 'userGroupId' | 'name' | 'description'>, QueryTuple {
	userCount: number;
	spaceCount: number;
	topicCount: number;
	reportCount: number;
}

export interface QueryUserGroupForHolder extends Pick<UserGroup, 'userGroupId' | 'name'>, QueryTupleForHolder {
}