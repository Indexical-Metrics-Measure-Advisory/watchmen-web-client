import {SpaceHolder, Tuple, UserHolder} from './tuple-types';

export interface UserGroup extends Tuple, SpaceHolder, UserHolder {
	userGroupId: string;
	name: string;
	description?: string;
}
