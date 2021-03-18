import { saveTokenIntoSession } from '../account';
import { fetchMockSharedDashboard } from '../mock/share/mock-dashboard';
import { Dashboard } from '../tuples/dashboard-types';
import { Report } from '../tuples/report-types';
import { doFetch, getServiceHost, isMockService } from '../utils';

export interface SharedDashboard {
	dashboard: Dashboard;
	reports: Array<Report>;
}

export const fetchSharedDashboard = async (dashboardId: string, token: string): Promise<SharedDashboard> => {
	if (isMockService()) {
		return await fetchMockSharedDashboard(dashboardId, token);
	} else {
		const response = await doFetch(`${getServiceHost()}share/dashboard?dashboard_id=${dashboardId}&&token=${token}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		saveTokenIntoSession(token);

		return await response.json();
	}
};
