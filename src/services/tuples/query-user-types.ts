import {QueryTuple, QueryTupleForHolder} from './tuple-types';
import {User} from './user-types';

export interface QueryUser extends Pick<User, 'userId' | 'name'>, QueryTuple {
	spaceCount: number;
	topicCount: number;
	reportCount: number;
}

export interface QueryUserForHolder extends Pick<User, 'userId' | 'name'>, QueryTupleForHolder {
}