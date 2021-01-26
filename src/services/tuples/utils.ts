import { v4 } from 'uuid';
import { Report } from './report-types';
import { Space } from './space-types';
import { Topic } from './topic-types';
import { Tuple } from './tuple-types';
import { UserGroup } from './user-group-types';
import { User } from './user-types';

const FAKE_ID_PREFIX = 'f-';

const isTopic = (tuple: Tuple): tuple is Topic => {
	return !!(tuple as any).topicId;
};
const isReport = (tuple: Tuple): tuple is Report => {
	return !!(tuple as any).reportId;
};
const isSpace = (tuple: Tuple): tuple is Space => {
	return !!(tuple as any).spaceId;
};
const isUserGroup = (tuple: Tuple): tuple is UserGroup => {
	return !!(tuple as any).userGroupId;
};
const isUser = (tuple: Tuple): tuple is User => {
	return !!(tuple as any).userId;
};

export const generateUuid = (): string => `${FAKE_ID_PREFIX}${v4()}`;
export const isFakedUuid = (tuple: Tuple): boolean => {
	if (isTopic(tuple)) {
		return tuple.topicId.startsWith(FAKE_ID_PREFIX);
	} else if (isReport(tuple)) {
		return tuple.reportId.startsWith(FAKE_ID_PREFIX);
	} else if (isSpace(tuple)) {
		return tuple.spaceId.startsWith(FAKE_ID_PREFIX);
	} else if (isUserGroup(tuple)) {
		return tuple.userGroupId.startsWith(FAKE_ID_PREFIX);
	} else if (isUser(tuple)) {
		return tuple.userId.startsWith(FAKE_ID_PREFIX);
	}

	console.groupCollapsed('Unsupported tuple type');
	console.error(tuple);
	console.groupEnd();
	throw new Error('Unsupported tuple type.');
};