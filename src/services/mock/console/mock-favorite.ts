import {Favorite} from '../../console/favorite-types';

export const fetchMockFavorite = async (): Promise<Favorite> => {
	return {
		connectedSpaceIds: ['1', '2', '3', '4', '5', '6'],
		dashboardIds: ['1']
	};
};