import { Dashboard } from '../tuples/dashboard-types';
import { Report } from '../tuples/report-types';
import { getCurrentTime } from '../utils';

export interface SharedDashboard {
	dashboard: Dashboard;
	reports: Array<Report>;
}

export const fetchSharedDashboard = async (dashboardId: string): Promise<SharedDashboard> => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve({
				dashboard: {
					dashboardId: '1',
					name: 'Sales Statistics',
					reports: [],
					lastVisitTime: '2020/10/20 09:36:46',
					createTime: getCurrentTime(),
					lastModifyTime: getCurrentTime()
				},
				reports: []
			});
		}, 500);
	});
};
