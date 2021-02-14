import { PipelinesGraphics } from '../../tuples/pipeline-types';

export const fetchMockPipelinesGraphics = async (): Promise<PipelinesGraphics> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve({ topics: [] }), 500);
	});
};

export const saveMockPipelinesGraphics = async (graphics: PipelinesGraphics): Promise<void> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve(), 500);
	});
};
