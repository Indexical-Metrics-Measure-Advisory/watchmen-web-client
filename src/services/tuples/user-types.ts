import {Tuple, UserGroupHolder} from './tuple-types';

export interface User extends Tuple, UserGroupHolder {
	userId: string;
	name: string;
	nickName: string;
	// only works on super admin login. otherwise it is undefined
	tenantId?: string;
}