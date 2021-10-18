import {Apis, get} from '../apis';
import {fetchMockAdminDashboard} from '../mock/admin/mock-home';
import {ConnectedSpace} from '../tuples/connected-space-types';
import {Dashboard} from '../tuples/dashboard-types';
import {isMockService} from '../utils';

export interface AdminDashboard {
	dashboard?: Dashboard;
	connectedSpaces: Array<ConnectedSpace>;
}

export const fetchAdminDashboard = async (): Promise<AdminDashboard> => {
	if (isMockService()) {
		return await fetchMockAdminDashboard();
	} else {
		return await get({api: Apis.DASHBOARD_FOR_ADMIN});
	}
};
