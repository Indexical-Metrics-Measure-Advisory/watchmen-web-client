import {Dashboard} from '../tuples/dashboard-types';

export const buildDashboardShareUrl = async (dashboard: Dashboard): Promise<string> => {
	// REMOTE use real api to retrieve dashboard share url
	const {protocol, host} = window.location;
	return `${protocol}//${host}/share/dashboard/${dashboard.dashboardId}`;
};