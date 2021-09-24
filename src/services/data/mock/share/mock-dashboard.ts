import {SharedDashboard} from '../../share/dashboard';
import {ChartType} from '../../tuples/chart-types';
import {Dashboard} from '../../tuples/dashboard-types';
import {getCurrentTime} from '../../utils';

export const fetchMockSharedDashboard = async (dashboardId: string, token: string): Promise<SharedDashboard> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				dashboard: {
					dashboardId: '1',
					name: 'Sales Statistics',
					reports: [
						{
							reportId: '1',
							rect: {x: 32, y: 32, width: 480, height: 300}
						}
					],
					lastVisitTime: getCurrentTime(),
					createTime: getCurrentTime(),
					lastModified: getCurrentTime()
				} as Dashboard,
				reports: [
					{
						reportId: '1',
						name: '',
						indicators: [],
						dimensions: [],
						funnels: [],
						rect: {x: 320, y: 320, width: 480, height: 300},
						chart: {
							type: ChartType.COUNT
						},
						lastVisitTime: getCurrentTime(),
						createTime: getCurrentTime(),
						lastModified: getCurrentTime()
					}
				]
			});
		}, 500);
	});
};
