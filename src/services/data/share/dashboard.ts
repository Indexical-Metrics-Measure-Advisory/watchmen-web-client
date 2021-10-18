import {saveTokenIntoSession} from '../account';
import {Apis, get} from '../apis';
import {fetchMockSharedDashboard} from '../mock/share/mock-dashboard';
import {ConnectedSpace} from '../tuples/connected-space-types';
import {Dashboard} from '../tuples/dashboard-types';
import {isMockService} from '../utils';

export interface SharedDashboard {
	dashboard: Dashboard;
	connectedSpaces: Array<ConnectedSpace>;
}

export const fetchSharedDashboard = async (dashboardId: string, token: string): Promise<SharedDashboard> => {
	if (isMockService()) {
		return await fetchMockSharedDashboard(dashboardId, token);
	} else {
		const dashboard = await get({api: Apis.DASHBOARD_SHARE_GET, search: {dashboardId, token}, auth: false});
		saveTokenIntoSession(token);
		return dashboard;
	}
};
