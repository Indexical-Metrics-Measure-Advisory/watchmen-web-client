import { fetchMockAllPipelines } from '../mock/pipeline/mock-all-pipelines';
import { Pipeline } from '../tuples/pipeline-types';
import { isMockService } from '../utils';

export const fetchAllPipelines = async (): Promise<Array<Pipeline>> => {
	if (isMockService()) {
		return fetchMockAllPipelines();
	} else {
		// REMOTE use real api
		return fetchMockAllPipelines();
	}
};
