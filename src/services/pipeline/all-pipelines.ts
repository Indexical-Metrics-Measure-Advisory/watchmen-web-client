import { fetchMockAllPipelines } from "../mock/pipeline/mock-all-pipelines";
import { Pipeline } from "../tuples/pipeline-types";
import { getServiceHost, isMockService } from "../utils";

export const fetchAllPipelines = async (): Promise<Array<Pipeline>> => {
	if (isMockService()) {
		return fetchMockAllPipelines();
	} else {
		// REMOTE use real api
		// return fetchMockAllPipelines();
		const response = await fetch(`${getServiceHost()}pipeline/all`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				// authorization: token,
			},
		});

		const result = await response.json();
		return result;
	}
};
