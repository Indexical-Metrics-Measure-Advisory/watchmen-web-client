import { fetchMockAllTopics } from "../mock/pipeline/mock-all-topics";
import { Topic } from "../tuples/topic-types";
import { getServiceHost, isMockService } from "../utils";

export const fetchAllTopics = async (): Promise<Array<Topic>> => {
	if (isMockService()) {
		return fetchMockAllTopics();
	} else {
		// REMOTE use real api
		const response = await fetch(`${getServiceHost()}topic/all`, {
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
