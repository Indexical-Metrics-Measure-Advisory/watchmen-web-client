import { findToken } from '../account';
import { fetchMockDashboards } from '../mock/console/mock-dashboard';
import { getServiceHost, isMockService } from '../utils';
import { Dashboard } from './dashboard-types';

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
