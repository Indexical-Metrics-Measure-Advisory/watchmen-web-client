import { fetchMockPipelinesGraphics } from '../mock/tuples/mock-pipeline';
import { isMockService } from '../utils';
import { PipelinesGraphics } from './pipeline-types';

export const fetchPipelinesGraphics = async (): Promise<PipelinesGraphics> => {
	if (isMockService()) {
		return fetchMockPipelinesGraphics();
	} else {
		// REMOTE use real api
		return { topics: [] };
	}
};
