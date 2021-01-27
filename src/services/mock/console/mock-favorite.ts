import { Favorite } from '../../console/favorite-types';

export const fetchMockFavorite = async (): Promise<Favorite> => {
	return {
		pin: false,
		connectedSpaceIds: [ '2' ],
		dashboardIds: [ '1' ]
	};
};