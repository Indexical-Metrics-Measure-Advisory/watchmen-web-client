import { findToken } from "../account";
import { fetchMockAllPipelines } from "../mock/pipeline/mock-all-pipelines";
import { Pipeline } from "../tuples/pipeline-types";
import { getServiceHost, isMockService } from "../utils";

export const fetchAllPipelines = async (): Promise<Array<Pipeline>> => {
	if (isMockService()) {
		return fetchMockAllPipelines();
	} else {
		// REMOTE use real api
		// return fetchMockAllPipelines();
		const token = findToken();
		const response = await fetch(`${getServiceHost()}pipeline/all`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
		});

		const result = await response.json();
		return result;
	}
};
