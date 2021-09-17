import {Dashboard} from '../../tuples/dashboard-types';
import {isFakedUuid} from '../../tuples/utils';
import {getCurrentTime} from '../../utils';

export const fetchMockDashboards = async (): Promise<Array<Dashboard>> => {
	return [
		{
			dashboardId: '1',
			name: 'Sales Statistics',
			reports: [],
			lastVisitTime: '2020/10/20 09:36:46',
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		}
	];
};

let newDashboardId = 10000;
export const saveMockDashboard = async (dashboard: Dashboard): Promise<void> => {
	return new Promise((resolve) => {
		if (isFakedUuid(dashboard)) {
			dashboard.dashboardId = `${newDashboardId++}`;
		}
		setTimeout(() => resolve(), 500);
	});
};

export const renameMockDashboard = async (dashboard: Dashboard): Promise<void> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve(), 500);
	});
};

export const deleteMockDashboard = async (dashboard: Dashboard): Promise<void> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve(), 500);
	});
};