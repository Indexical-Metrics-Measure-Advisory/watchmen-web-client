import { Lang } from '../../langs';
import { Dashboard } from '../../services/tuples/dashboard-types';
import { generateUuid } from '../../services/tuples/utils';
import { getCurrentTime } from '../../services/utils';

export const createDashboard = (name?: string): Dashboard => {
	const dashboardId = generateUuid();
	return {
		dashboardId: dashboardId,
		name: name || `${Lang.PLAIN.NEW_DASHBOARD_NAME} ${btoa(dashboardId).substr(0, 12)}`,
		chartIds: [],
		lastVisitTime: getCurrentTime(),
		createTime: getCurrentTime(),
		lastModifyTime: getCurrentTime()
	};
};