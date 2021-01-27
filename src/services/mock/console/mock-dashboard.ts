import { Dashboard } from '../../console/dashboard-types';
import { getCurrentTime } from '../../utils';

export const fetchMockDashboards = async (): Promise<Array<Dashboard>> => {
	return [
		{
			dashboardId: '1',
			name: 'Sales Statistics',
			chartIds: [],
			lastVisitTime: '2020/10/20 09:36:46',
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		}
	];
};
