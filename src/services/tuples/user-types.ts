import { Tuple, UserGroupHolder } from './tuple-types';

export interface User extends Tuple, UserGroupHolder {
	userId: string;
	name: string;
	nickName: string;
}