import {ExternalWriter} from '@/services/data/tuples/external-writer-types';
import dayjs from 'dayjs';
import {v4} from 'uuid';
import {ConnectedSpace} from './connected-space-types';
import {Dashboard} from './dashboard-types';
import {DataSource} from './data-source-types';
import {Enum} from './enum-types';
import {Pipeline, PipelinesGraphics} from './pipeline-types';
import {Report} from './report-types';
import {Space} from './space-types';
import {Subject} from './subject-types';
import {Tenant} from './tenant-types';
import {Topic} from './topic-types';
import {Tuple} from './tuple-types';
import {UserGroup} from './user-group-types';
import {User} from './user-types';

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
export const isEnum = (tuple: Tuple): tuple is Enum => {
	return !!(tuple as any).enumId;
};
export const isTenant = (tuple: Tuple): tuple is Tenant => {
	return !!(tuple as any).tenantId;
};
export const isDataSource = (tuple: Tuple): tuple is DataSource => {
	return !!(tuple as any).dataSourceId;
};
export const isExternalWriter = (tuple: Tuple): tuple is ExternalWriter => {
	return !!(tuple as any).writerId;
};

export const generateUuid = (): string => `${FAKE_ID_PREFIX}${v4().replace(/-/g, '')}`;
export const isFakedUuidForGraphics = (graphics: PipelinesGraphics): boolean => {
	return graphics.pipelineGraphId.startsWith(FAKE_ID_PREFIX);
};
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
	} else if (isEnum(tuple)) {
		return tuple.enumId.startsWith(FAKE_ID_PREFIX);
	} else if (isTenant(tuple)) {
		return tuple.tenantId.startsWith(FAKE_ID_PREFIX);
	} else if (isDataSource(tuple)) {
		return tuple.dataSourceId.startsWith(FAKE_ID_PREFIX);
	} else if (isExternalWriter(tuple)) {
		return tuple.writerId.startsWith(FAKE_ID_PREFIX);
	}

	console.groupCollapsed('Unsupported tuple type');
	console.error(tuple);
	console.groupEnd();
	throw new Error('Unsupported tuple type.');
};

export const prettifyDateTimeToMinute = (datetime?: string) => {
	return datetime ? dayjs(datetime).format('YYYY/M/DD H:m') : '';
};