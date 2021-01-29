import { LastSnapshot } from '../../console/last-snapshot-types';

export const fetchMockLastSnapshot = async (): Promise<LastSnapshot> => {
	return {
		language: 'en',
		lastDashboardId: '1',
		favoritePin: false
	};
};