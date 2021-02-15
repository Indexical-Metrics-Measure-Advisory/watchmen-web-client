import { Pipeline, PipelinesGraphics } from '../../tuples/pipeline-types';
import { isFakedUuid } from '../../tuples/utils';

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

let newPipelineId = 10000;
export const saveMockPipeline = async (pipeline: Pipeline): Promise<void> => {
	return new Promise((resolve) => {
		if (isFakedUuid(pipeline)) {
			pipeline.pipelineId = `${newPipelineId++}`;
		}
		setTimeout(() => resolve(), 500);
	});
};

export const renameMockPipeline = async (pipelineId: string, name: string): Promise<void> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve(), 500);
	});
};

export const toggleMockPipelineEnabled = async (pipelineId: string, enabled: boolean): Promise<void> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve(), 500);
	});
};