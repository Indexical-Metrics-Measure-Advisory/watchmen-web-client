import { fetchMockAdminDashboard } from '../mock/admin/mock-home';
import { Dashboard } from '../tuples/dashboard-types';
import { Report } from '../tuples/report-types';
import { isMockService } from '../utils';

export interface AdminDashboard {
	dashboard?: Dashboard;
	reports: Array<Report>;
}

export const fetchAdminDashboard = async (): Promise<AdminDashboard> => {
	if (isMockService()) {
		return await fetchMockAdminDashboard();
	} else {
		// REMOTE use real api
		return await fetchMockAdminDashboard();
	}
};
