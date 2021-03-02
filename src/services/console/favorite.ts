import { findToken } from "../account";
import { fetchMockFavorite } from "../mock/console/mock-favorite";
import { getServiceHost, isMockService, doFetch } from "../utils";
import { Favorite } from "./favorite-types";

export const fetchFavorite = async (): Promise<Favorite> => {
	if (isMockService()) {
		return fetchMockFavorite();
	} else {
		// REMOTE use real api
		const token = findToken();
		const response = await doFetch(`${getServiceHost()}favorites/me`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
		});

		return await response.json();
	}
};

export const saveFavorite = async (favorite: Favorite): Promise<void> => {
	if (isMockService()) {
		console.log("mock saveFavorite");
	} else {
		const token = findToken();
		await doFetch(`${getServiceHost()}favorites/save`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
			body: JSON.stringify(favorite),
		});
	}

	// return await response.json();
};
