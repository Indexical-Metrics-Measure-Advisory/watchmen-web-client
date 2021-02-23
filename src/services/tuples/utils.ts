import { v4 } from 'uuid';
import { ConnectedSpace } from './connected-space-types';
import { Dashboard } from './dashboard-types';
import { Pipeline } from './pipeline-types';
import { Report } from './report-types';
import { Space } from './space-types';
import { Subject } from './subject-types';
import { Topic } from './topic-types';
import { Tuple } from './tuple-types';
import { UserGroup } from './user-group-types';
import { User } from './user-types';

const FAKE_ID_PREFIX = 'f-';

export const removeFakeIdPrefix = (id: string) => {
	return id.startsWith(FAKE_ID_PREFIX) ? id.substr(2) : id;
};

export const isTopic = (tuple: Tuple): tuple is Topic => {
	return !!(tuple as any).topicId;
};
export const isReport = (tuple: Tuple): tuple is Report => {
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
const isDashboard = (tuple: Tuple): tuple is Dashboard => {
	return !!(tuple as any).dashboardId;
};
const isConnectedSpace = (tuple: Tuple): tuple is ConnectedSpace => {
	return !!(tuple as any).connectId;
};
export const isSubject = (tuple: Tuple): tuple is Subject => {
	return !!(tuple as any).subjectId;
};
export const isPipeline = (tuple: Tuple): tuple is Pipeline => {
	return !!(tuple as any).pipelineId;
};

export const generateUuid = (): string => `${FAKE_ID_PREFIX}${v4().replace(/-/g, '')}`;
export const isFakedUuid = (tuple: Tuple): boolean => {
	if (isPipeline(tuple)) {
		// pipeline check must before topic check
		// since "topicId" also exists in pipeline object
		return tuple.pipelineId.startsWith(FAKE_ID_PREFIX);
	} else if (isTopic(tuple)) {
		return tuple.topicId.startsWith(FAKE_ID_PREFIX);
	} else if (isReport(tuple)) {
		return tuple.reportId.startsWith(FAKE_ID_PREFIX);
	} else if (isConnectedSpace(tuple)) {
		// connected space check must before space check
		// since "spaceId" also exists in connected space object
		return tuple.connectId.startsWith(FAKE_ID_PREFIX);
	} else if (isSpace(tuple)) {
		return tuple.spaceId.startsWith(FAKE_ID_PREFIX);
	} else if (isUserGroup(tuple)) {
		return tuple.userGroupId.startsWith(FAKE_ID_PREFIX);
	} else if (isUser(tuple)) {
		return tuple.userId.startsWith(FAKE_ID_PREFIX);
	} else if (isDashboard(tuple)) {
		return tuple.dashboardId.startsWith(FAKE_ID_PREFIX);
	} else if (isSubject(tuple)) {
		return tuple.subjectId.startsWith(FAKE_ID_PREFIX);
	}

	console.groupCollapsed('Unsupported tuple type');
	console.error(tuple);
	console.groupEnd();
	throw new Error('Unsupported tuple type.');
};