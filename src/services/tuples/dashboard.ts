import {Apis, get, post} from '../apis';
import {
	deleteMockDashboard,
	fetchMockDashboards,
	renameMockDashboard,
	saveMockDashboard
} from '../mock/tuples/mock-dashboard';
import {isMockService} from '../utils';
import {Dashboard} from './dashboard-types';
import {isFakedUuid} from './utils';

export const fetchDashboards = async (): Promise<Array<Dashboard>> => {
	if (isMockService()) {
		return fetchMockDashboards();
	} else {
		return await get({api: Apis.DASHBOARD_MINE});
	}
};

export const saveDashboard = async (dashboard: Dashboard): Promise<void> => {
	if (isMockService()) {
		return saveMockDashboard(dashboard);
	} else if (isFakedUuid(dashboard)) {
		const data = await get({api: Apis.DASHBOARD_CREATE, search: {name: dashboard.name}});
		dashboard.dashboardId = data.dashboardId;
		dashboard.lastModified = data.lastModified;
	} else {
		const data = await post({api: Apis.DASHBOARD_SAVE, data: dashboard});
		dashboard.lastModified = data.lastModified;
	}
};

export const renameDashboard = async (dashboard: Dashboard): Promise<void> => {
	if (isMockService()) {
		return renameMockDashboard(dashboard);
	} else {
		await get({api: Apis.DASHBOARD_RENAME, search: {dashboardId: dashboard.dashboardId, name: dashboard.name}});
	}
};

export const deleteDashboard = async (dashboard: Dashboard): Promise<void> => {
	if (isMockService()) {
		return deleteMockDashboard(dashboard);
	} else {
		await get({api: Apis.DASHBOARD_DELETE, search: {dashboardId: dashboard.dashboardId}});
	}
};
