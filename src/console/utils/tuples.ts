import { getCurrentLanguage } from '../../langs';
import { ConnectedSpace } from '../../services/tuples/connected-space-types';
import { Dashboard } from '../../services/tuples/dashboard-types';
import { Subject } from '../../services/tuples/subject-types';
import { generateUuid } from '../../services/tuples/utils';
import { getCurrentTime } from '../../services/utils';

export const createDashboard = (name?: string): Dashboard => {
	const dashboardId = generateUuid();
	return {
		dashboardId,
		name: name || `${getCurrentLanguage().PLAIN.NEW_DASHBOARD_NAME} ${btoa(dashboardId).substr(0, 12)}`,
		chartIds: [],
		lastVisitTime: getCurrentTime(),
		createTime: getCurrentTime(),
		lastModifyTime: getCurrentTime()
	};
};

export const createConnectedSpace = (spaceId: string, name?: string): ConnectedSpace => {
	const connectId = generateUuid();
	return {
		connectId,
		name: name || `${getCurrentLanguage().PLAIN.NEW_CONNECTED_SPACE_NAME} ${btoa(connectId).substr(0, 12)}`,
		spaceId,
		subjects: [],
		lastVisitTime: getCurrentTime(),
		createTime: getCurrentTime(),
		lastModifyTime: getCurrentTime()
	};
};

export const createSubject = (name?: string): Subject => {
	const subjectId = generateUuid();
	return {
		subjectId,
		name: name || `${getCurrentLanguage().PLAIN.NEW_SUBJECT_NAME} ${btoa(subjectId).substr(0, 12)}`,
		lastVisitTime: getCurrentTime(),
		createTime: getCurrentTime(),
		lastModifyTime: getCurrentTime()
	};
};