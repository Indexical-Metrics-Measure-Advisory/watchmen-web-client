import {ChartType} from '@/services/data/tuples/chart-types';
import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Dashboard} from '@/services/data/tuples/dashboard-types';
import {ParameterJointType} from '@/services/data/tuples/factor-calculator-types';
import {Report} from '@/services/data/tuples/report-types';
import {SpaceId} from '@/services/data/tuples/space-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {generateUuid} from '@/services/data/tuples/utils';
import {getCurrentTime} from '@/services/data/utils';
import {base64Encode} from '@/services/utils';
import {getCurrentLanguage} from '@/widgets/langs';

export const createDashboard = (name?: string): Dashboard => {
	const dashboardId = generateUuid();
	return {
		dashboardId,
		name: name || `${getCurrentLanguage().PLAIN.NEW_DASHBOARD_NAME} ${base64Encode(dashboardId).substring(0, 12)}`,
		reports: [],
		lastVisitTime: getCurrentTime(),
		createTime: getCurrentTime(),
		lastModified: getCurrentTime()
	};
};

export const createConnectedSpace = (spaceId: SpaceId, name?: string): ConnectedSpace => {
	const connectId = generateUuid();
	return {
		connectId,
		name: name || `${getCurrentLanguage().PLAIN.NEW_CONNECTED_SPACE_NAME} ${base64Encode(connectId).substring(0, 12)}`,
		spaceId,
		subjects: [],
		isTemplate: false,
		lastVisitTime: getCurrentTime(),
		createTime: getCurrentTime(),
		lastModified: getCurrentTime()
	};
};

export const createSubject = (name?: string): Subject => {
	const subjectId = generateUuid();
	return {
		subjectId,
		name: name || `${getCurrentLanguage().PLAIN.NEW_SUBJECT_NAME} ${base64Encode(subjectId).substring(0, 12)}`,
		dataset: {
			filters: {jointType: ParameterJointType.AND, filters: []},
			columns: [],
			joins: []
		},
		lastVisitTime: getCurrentTime(),
		createTime: getCurrentTime(),
		lastModified: getCurrentTime()
	};
};

export const createReport = (name?: string): Report => {
	const reportId = generateUuid();
	return {
		reportId,
		name: name || `${getCurrentLanguage().PLAIN.NEW_REPORT_NAME} ${base64Encode(reportId).substring(0, 12)}`,
		indicators: [],
		dimensions: [],
		rect: {x: 32, y: 32, width: 480, height: 300},
		chart: {type: ChartType.COUNT},
		lastVisitTime: getCurrentTime(),
		createTime: getCurrentTime(),
		lastModified: getCurrentTime()
	};
};