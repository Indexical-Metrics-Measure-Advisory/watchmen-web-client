import { findToken } from '../account';
import { deleteMockDashboard, fetchMockDashboards, saveMockDashboard } from '../mock/tuples/mock-dashboard';
import { getServiceHost, isMockService } from '../utils';
import { Dashboard } from './dashboard-types';
import { isFakedUuid } from './utils';

export const fetchDashboards = async (): Promise<Array<Dashboard>> => {
	if (isMockService()) {
		return fetchMockDashboards();
	} else {
		const token = findToken();
		const response = await fetch(`${getServiceHost()}dashboard/me`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token
			}
		});

		return await response.json();
	}
};

export const saveDashboard = async (dashboard: Dashboard): Promise<void> => {
	if (isMockService()) {
		return saveMockDashboard(dashboard);
	} else if (isFakedUuid(dashboard)) {
		const token = findToken();
		const response = await fetch(`${getServiceHost()}dashboard/create?name=${dashboard.name}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token
			}
		});

		const data = await response.json();
		dashboard.dashboardId = data.dashboardId;
		dashboard.lastModifyTime = data.lastModifyTime;
	} else {
		const token = findToken();
		const response = await fetch(`${getServiceHost()}dashboard/save`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token
			},
			body: JSON.stringify(dashboard)
		});

		const data = await response.json();
		dashboard.lastModifyTime = data.lastModifyTime;
	}
};

export const deleteDashboard = async (dashboard: Dashboard): Promise<void> => {
	if (isMockService()) {
		return deleteMockDashboard(dashboard);
	} else {
		const token = findToken();
		await fetch(`${getServiceHost()}dashboard/delete?dashboard_id=${dashboard.dashboardId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token
			}
		});
	}
};
