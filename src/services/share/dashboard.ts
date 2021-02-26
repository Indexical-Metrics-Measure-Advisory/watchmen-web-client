import { ChartType } from '../tuples/chart-types';
import { Dashboard } from '../tuples/dashboard-types';
import { Report } from '../tuples/report-types';
import { getCurrentTime } from '../utils';

export interface SharedDashboard {
	dashboard: Dashboard;
	reports: Array<Report>;
}

export const fetchSharedDashboard = async (dashboardId: string, token: string): Promise<SharedDashboard> => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve({
				dashboard: {
					dashboardId: '1',
					name: 'Sales Statistics',
					reports: [ {
						reportId: '1',
						rect: { x: 32, y: 32, width: 480, height: 300 }
					} ],
					lastVisitTime: getCurrentTime(),
					createTime: getCurrentTime(),
					lastModifyTime: getCurrentTime()
				} as Dashboard,
				reports: [ {
					reportId: '1',
					name: '',
					indicators: [],
					dimensions: [],
					rect: { x: 320, y: 320, width: 480, height: 300 },
					chart: {
						type: ChartType.COUNT
					},
					lastVisitTime: getCurrentTime(),
					createTime: getCurrentTime(),
					lastModifyTime: getCurrentTime()
				} ]
			});
		}, 500);
	});
};
