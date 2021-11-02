import {SharedDashboard} from '../../share/dashboard';
import {ChartType} from '../../tuples/chart-types';
import {ConnectedSpace} from '../../tuples/connected-space-types';
import {Dashboard, DashboardId} from '../../tuples/dashboard-types';
import {ParameterJointType} from '../../tuples/factor-calculator-types';
import {Token} from '../../types';
import {getCurrentTime} from '../../utils';

export const fetchMockSharedDashboard = async (dashboardId: DashboardId, token: Token): Promise<SharedDashboard> => {
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
				connectedSpaces: [
					{
						connectId: '',
						name: '',
						spaceId: '',
						subjects: [{
							subjectId: '',
							name: '',
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
							],
							dataset: {
								filters: {jointType: ParameterJointType.AND, filters: []},
								columns: [],
								joins: []
							},
							lastVisitTime: getCurrentTime(),
							lastModified: getCurrentTime(),
							createTime: getCurrentTime()
						}],
						isTemplate: false,
						lastVisitTime: getCurrentTime(),
						lastModified: getCurrentTime(),
						createTime: getCurrentTime()
					} as ConnectedSpace
				]
			});
		}, 500);
	});
};
