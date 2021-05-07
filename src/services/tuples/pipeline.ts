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
import {isFakedUuid} from './utils';

export const fetchPipelinesGraphics = async (): Promise<PipelinesGraphics> => {
    if (isMockService()) {
        return fetchMockPipelinesGraphics();
    } else {
        return await get({api: Apis.PIPELINE_GRAPHICS_MINE});
    }
};

export const savePipelinesGraphics = async (graphics: PipelinesGraphics): Promise<void> => {
    if (isMockService()) {
        return saveMockPipelinesGraphics(graphics);
    } else {
        await post({api: Apis.PIPELINE_GRAPHICS_SAVE, data: graphics});
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
