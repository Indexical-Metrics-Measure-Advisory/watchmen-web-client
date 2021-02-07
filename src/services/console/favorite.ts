import { fetchMockFavorite } from '../mock/console/mock-favorite';
import { isMockService } from '../utils';
import { Favorite } from './favorite-types';

export const fetchFavorite = async (): Promise<Favorite> => {
	if (isMockService()) {
		return fetchMockFavorite();
	} else {
		// REMOTE use real api
		return fetchMockFavorite();
	}
};

export const saveFavorite = async (favorite: Favorite): Promise<void> => {
	// REMOTE use real api
};