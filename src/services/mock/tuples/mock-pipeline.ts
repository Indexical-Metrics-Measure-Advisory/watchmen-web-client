import { PipelinesGraphics } from '../../tuples/pipeline-types';

export const fetchMockPipelinesGraphics = async (): Promise<PipelinesGraphics> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve({ topics: [] }), 500);
	});
};
