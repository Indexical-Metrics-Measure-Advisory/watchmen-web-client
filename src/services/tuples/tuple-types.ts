export interface Tuple {
}

export interface QueryTuple {
}

export interface QueryTupleForHolder {
}

export interface TupleHolder {
}

export interface SpaceHolder extends TupleHolder {
	spaceIds: Array<string>;
}

export interface TopicHolder extends TupleHolder {
	topicIds: Array<string>;
}

export interface UserGroupHolder extends TupleHolder {
	userGroupIds: Array<string>;
}

export interface UserHolder extends TupleHolder {
	userIds: Array<string>;
}