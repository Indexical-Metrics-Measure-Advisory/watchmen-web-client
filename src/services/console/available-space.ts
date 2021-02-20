import { findToken } from "../account";
import { fetchMockAvailableSpaces } from "../mock/console/mock-avaiable-space";
import { getServiceHost, isMockService } from "../utils";
import { AvailableSpaceInConsole } from "./settings-types";

export const fetchAvailableSpaces = async (): Promise<Array<AvailableSpaceInConsole>> => {
	if (isMockService()) {
		return fetchMockAvailableSpaces();
	} else {
		const token = findToken();
		const response = await fetch(`${getServiceHost()}space/available`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
		});
		return await response.json();
	}
};
