import {Apis, get, post} from '../apis';
import {
	fetchMockPipelinesGraphics,
	renameMockPipeline,
	saveMockPipeline,
	saveMockPipelinesGraphics,
	toggleMockPipelineEnabled
} from '../mock/tuples/mock-pipeline';
import {isMockService} from '../utils';
import {Pipeline, PipelinesGraphics} from './pipeline-types';
import {isFakedUuid, isFakedUuidForGraphics} from './utils';

export const fetchPipelinesGraphics = async (): Promise<Array<PipelinesGraphics>> => {
	if (isMockService()) {
		return fetchMockPipelinesGraphics();
	} else {
		return await get({api: Apis.PIPELINE_GRAPHICS_MINE});
	}
};

export const savePipelinesGraphics = async (graphics: PipelinesGraphics): Promise<void> => {
	if (isMockService()) {
		return saveMockPipelinesGraphics(graphics);
	} else if (isFakedUuidForGraphics(graphics)) {
		const data = await post({api: Apis.PIPELINE_GRAPHICS_SAVE, data: graphics});
		graphics.pipelineGraphId = data.pipelineGraphId;
		graphics.lastModifyTime = data.lastModifyTime;
	} else {
		const data = await post({api: Apis.PIPELINE_GRAPHICS_SAVE, data: graphics});
		graphics.lastModifyTime = data.lastModifyTime;
	}
};

export const fetchPipeline = async (pipelineId: string): Promise<{ pipeline: Pipeline }> => {
	if (isMockService()) {
		// return nothing
		return {} as { pipeline: Pipeline };
	} else {
		const pipeline = await get({api: Apis.PIPELINE_GET, search: {pipelineId}});
		return {pipeline};
	}
};

export const savePipeline = async (pipeline: Pipeline): Promise<void> => {
	if (isMockService()) {
		return saveMockPipeline(pipeline);
	} else if (isFakedUuid(pipeline)) {
		const data = await post({api: Apis.PIPELINE_CREATE, data: pipeline});
		pipeline.pipelineId = data.pipelineId;
		pipeline.lastModifyTime = data.lastModifyTime;
	} else {
		const data = await post({api: Apis.PIPELINE_SAVE, data: pipeline});
		pipeline.lastModifyTime = data.lastModifyTime;
	}
};

export const renamePipeline = async (pipelineId: string, name: string): Promise<void> => {
	if (isMockService()) {
		return renameMockPipeline(pipelineId, name);
	} else {
		await get({api: Apis.PIPELINE_RENAME, search: {pipelineId, name}});
	}
};

export const togglePipelineEnabled = async (pipelineId: string, enabled: boolean): Promise<void> => {
	if (isMockService()) {
		return toggleMockPipelineEnabled(pipelineId, enabled);
	} else {
		await get({api: Apis.PIPELINE_ENABLE, search: {pipelineId, enabled}});
	}
};
