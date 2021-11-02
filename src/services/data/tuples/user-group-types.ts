import {SpaceHolder} from './space-types';
import {TenantId} from './tenant-types';
import {Tuple, TupleHolder} from './tuple-types';
import {UserHolder} from './user-types';

export type UserGroupId = string;

export interface UserGroup extends Tuple, SpaceHolder, UserHolder {
	userGroupId: UserGroupId;
	name: string;
	description?: string;
	tenantId?: TenantId;
}

export interface UserGroupHolder extends TupleHolder {
	userGroupIds: Array<UserGroupId>;
}