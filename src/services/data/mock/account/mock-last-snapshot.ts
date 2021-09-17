import {LastSnapshot} from '../../account/last-snapshot-types';

export const fetchMockLastSnapshot = async (): Promise<LastSnapshot> => {
	return {
		language: 'en',
		lastDashboardId: '1',
		favoritePin: false
	};
};