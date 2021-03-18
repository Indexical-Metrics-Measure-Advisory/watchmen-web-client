import { findToken } from "../account";
import { fetchMockAdminDashboard } from "../mock/admin/mock-home";
import { Dashboard } from "../tuples/dashboard-types";
import { Report } from "../tuples/report-types";
import { doFetch, getServiceHost, isMockService } from "../utils";

export interface AdminDashboard {
	dashboard?: Dashboard;
	reports: Array<Report>;
}

export const fetchAdminDashboard = async (): Promise<AdminDashboard> => {
	if (isMockService()) {
		return await fetchMockAdminDashboard();
	} else {
		// REMOTE use real apis
		const token = findToken();
		const response = await doFetch(`${getServiceHost()}home/dashboard`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
		});
		return await response.json();
	}
};
