import { fetchMockPipelinesGraphics, saveMockPipelinesGraphics } from '../mock/tuples/mock-pipeline';
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

export const savePipelinesGraphics = async (graphics: PipelinesGraphics): Promise<void> => {
	if (isMockService()) {
		return saveMockPipelinesGraphics(graphics);
	} else {
		// REMOTE use real api
	}
};
