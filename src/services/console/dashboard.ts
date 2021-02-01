import { Dashboard } from '../tuples/dashboard-types';

export const buildDashboardShareUrl = async (dashboard: Dashboard): Promise<string> => {
	// TODO call real api to retrieve dashboard share url
	return `${window.location.href}/share/${dashboard.dashboardId}`;
}