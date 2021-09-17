import {Apis, get, post} from '../apis';
import {fetchMockFavorite} from '../mock/console/mock-favorite';
import {isMockService} from '../utils';
import {Favorite} from './favorite-types';

export const fetchFavorite = async (): Promise<Favorite> => {
	if (isMockService()) {
		return fetchMockFavorite();
	} else {
		return await get({api: Apis.FAVORITE_MINE});
	}
};

export const saveFavorite = async (favorite: Favorite): Promise<void> => {
	if (isMockService()) {
		console.log('mock saveFavorite');
	} else {
		await post({api: Apis.FAVORITE_SAVE, data: favorite});
	}
};
