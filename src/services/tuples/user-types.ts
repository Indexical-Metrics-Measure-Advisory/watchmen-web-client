import {Tuple, UserGroupHolder} from './tuple-types';

export enum UserRole {
	CONSOLE = 'console',
	ADMIN = 'admin',
	SUPER_ADMIN = 'superadmin'
}

export interface User extends Tuple, UserGroupHolder {
	userId: string;
	name: string;
	role: UserRole;
	nickName: string;
	// only works on super admin login. otherwise it is undefined
	tenantId?: string;
}