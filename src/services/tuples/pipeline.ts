import { findToken } from "../account";
import {
	fetchMockPipelinesGraphics,
	renameMockPipeline,
	saveMockPipeline,
	saveMockPipelinesGraphics,
	toggleMockPipelineEnabled,
} from "../mock/tuples/mock-pipeline";
import { getServiceHost, isMockService } from "../utils";
import { Pipeline, PipelinesGraphics } from "./pipeline-types";
import { isFakedUuid } from "./utils";

export const fetchPipelinesGraphics = async (): Promise<PipelinesGraphics> => {
	if (isMockService()) {
		return fetchMockPipelinesGraphics();
	} else {
		// REMOTE use real api
		const token = findToken();
		const response = await fetch(`${getServiceHost()}pipeline/graphics/me`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
			// body: JSON.stringify(graphics),
		});

		const data = await response.json();
		return data;
	}
};

export const savePipelinesGraphics = async (graphics: PipelinesGraphics): Promise<void> => {
	if (isMockService()) {
		return saveMockPipelinesGraphics(graphics);
	} else {
		// REMOTE use real api
		const token = findToken();
		await fetch(`${getServiceHost()}pipeline/graphics`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
			body: JSON.stringify(graphics),
		});

		// const data = await response.json();
		// return data;
	}
};

export const savePipeline = async (pipeline: Pipeline): Promise<void> => {
	if (isMockService()) {
		return saveMockPipeline(pipeline);
	} else if (isFakedUuid(pipeline)) {
		const token = findToken();
		const response = await fetch(`${getServiceHost()}pipeline`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
			body: JSON.stringify(pipeline),
		});

		const data = await response.json();
		pipeline.pipelineId = data.pipelineId;
		pipeline.lastModifyTime = data.lastModifyTime;
	} else {
		const token = findToken();
		const response = await fetch(`${getServiceHost()}pipeline`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
			body: JSON.stringify(pipeline),
		});

		const data = await response.json();
		pipeline.lastModifyTime = data.lastModifyTime;
	}
};

export const renamePipeline = async (pipelineId: string, name: string): Promise<void> => {
	if (isMockService()) {
		return renameMockPipeline(pipelineId, name);
	} else {
		// REMOTE use real api
		return renameMockPipeline(pipelineId, name);
	}
};

export const togglePipelineEnabled = async (pipelineId: string, enabled: boolean): Promise<void> => {
	if (isMockService()) {
		return toggleMockPipelineEnabled(pipelineId, enabled);
	} else {
		// REMOTE use real api
		return toggleMockPipelineEnabled(pipelineId, enabled);
	}
};
