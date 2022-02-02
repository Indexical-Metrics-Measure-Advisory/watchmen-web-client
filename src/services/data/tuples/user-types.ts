import {TenantId} from './tenant-types';
import {Tuple, TupleHolder} from './tuple-types';
import {UserGroupHolder} from './user-group-types';

export enum UserRole {
	CONSOLE = 'console',
	ADMIN = 'admin',
	SUPER_ADMIN = 'superadmin'
}

export type UserId = string;

export interface User extends Tuple, UserGroupHolder {
	userId: UserId;
	name: string;
	role: UserRole;
	nickName: string;
	password: string;
	// only works on super admin login. otherwise, it is undefined
	tenantId?: TenantId;
}

export interface UserHolder extends TupleHolder {
	userIds: Array<UserId>;
}