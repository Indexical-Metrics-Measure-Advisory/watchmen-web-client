import dayjs, {Dayjs} from 'dayjs';
import {findAccount} from '../data/account';
import {fetchPipelinesSettingsData, fetchUpdatedPipelinesSettingsData} from '../data/pipeline/settings';
import {Pipeline, PipelinesGraphics, PipelinesGraphicsId} from '../data/tuples/pipeline-types';
import {Topic} from '../data/tuples/topic-types';
import {Tuple} from '../data/tuples/tuple-types';
import {
	clearAdminPipelines,
	clearAdminPipelinesGraphics,
	clearAdminTopics,
	connectAdminDB,
	findAdminPipelines,
	findAdminPipelinesGraphics,
	findAdminTopics,
	saveAdminPipeline,
	saveAdminPipelinesGraphics,
	saveAdminTopic
} from './db';
import {AdminCacheData} from './types';

export const prepareAdminDB = () => {
	connectAdminDB();
	console.info('%cLocal admin database prepared', `font-size:14px;font-variant:petite-caps;font-weight:bold;text-transform:capitalize;color:white;background-color:rgba(94,119,171,0.9);padding:2px 6px;border-radius:6px;`);
};

const getLastModifiedAt = (tuples: Array<Tuple>): Dayjs => {
	return tuples.reduce((time, tuple) => {
		const lastModifiedAt = tuple.lastModified;
		if (lastModifiedAt) {
			return time.isBefore(dayjs(lastModifiedAt)) ? dayjs(lastModifiedAt) : time;
		} else {
			return time;
		}
	}, dayjs('2000/01/01 00:00:00'));
};

const savePipelines = async (pipelines: Array<Pipeline>) => {
	await Promise.all(pipelines.map(async pipeline => await saveAdminPipeline(pipeline)));
};
const mergePipelines = async (pipelines: Array<Pipeline>, updatedPipelines: Array<Pipeline> | undefined): Promise<Array<Pipeline>> => {
	const existsMap = pipelines.reduce((map, pipeline) => {
		map.set(pipeline.pipelineId, pipeline);
		return map;
	}, new Map<string, Pipeline>());
	if (updatedPipelines) {
		updatedPipelines.map(pipeline => existsMap.set(pipeline.pipelineId, pipeline));
		await savePipelines(updatedPipelines);
	}

	return Array.from(existsMap.values());
};

const saveTopics = async (topics: Array<Topic>) => {
	await Promise.all(topics.map(async topic => await saveAdminTopic(topic)));
};
const mergeTopics = async (topics: Array<Topic>, updatedTopics: Array<Topic> | undefined): Promise<Array<Topic>> => {
	const existsMap = topics.reduce((map, topic) => {
		map.set(topic.topicId, topic);
		return map;
	}, new Map<string, Topic>());
	if (updatedTopics) {
		updatedTopics.map(async topic => existsMap.set(topic.topicId, topic));
		await saveTopics(updatedTopics);
	}

	return Array.from(existsMap.values());
};

const saveGraphics = async (graphics: Array<PipelinesGraphics>) => {
	for (let g of graphics) {
		await saveAdminPipelinesGraphics(g);
	}
};
const mergePipelineGraphics = async (graphics: Array<PipelinesGraphics>, updatedGraphics: Array<PipelinesGraphics> | undefined, removedGraphics: Array<PipelinesGraphicsId>): Promise<Array<PipelinesGraphics>> => {
	const existsMap = graphics.reduce((map, graphics) => {
		map.set(graphics.pipelineGraphId, graphics);
		return map;
	}, new Map<string, PipelinesGraphics>());
	if (updatedGraphics) {
		updatedGraphics.map(async graphics => existsMap.set(graphics.pipelineGraphId, graphics));
		await saveGraphics(updatedGraphics);
	}

	if (removedGraphics && removedGraphics.length !== 0) {
		return Array.from(existsMap.values()).filter(g => !removedGraphics.includes(g.pipelineGraphId));
	} else {
		return Array.from(existsMap.values());
	}
};

export const loadAdminData = async (): Promise<AdminCacheData> => {
	// check tenant
	const tenantId = findAccount()?.tenantId;
	if (!tenantId) {
		// no tenant of current user
		return {pipelines: [], topics: [], graphics: [], dataSources: [], externalWriters: []};
	}

	const [pipelines, topics, graphics] = await Promise.all([
		findAdminPipelines(),
		findAdminTopics(),
		findAdminPipelinesGraphics()
	]);

	const pipelineCount = pipelines?.length || 0;
	const topicCount = topics?.length || 0;
	const noCacheData = (pipelineCount + topicCount + (graphics?.length || 0)) === 0;
	// eslint-disable-next-line
	const shouldRefreshCache = (pipelineCount !== 0 && pipelines[0].tenantId != tenantId)
		// eslint-disable-next-line
		|| (topicCount !== 0 && topics[0].tenantId != tenantId);

	if (noCacheData || shouldRefreshCache) {
		if (shouldRefreshCache) {
			await clearAdminPipelines();
			await clearAdminTopics();
		}

		// no data in local persistence
		const settings = await fetchPipelinesSettingsData();

		await savePipelines(settings.pipelines);
		await saveTopics(settings.topics);
		if (settings.graphics) {
			await saveGraphics(settings.graphics);
		}

		return {
			pipelines: settings.pipelines,
			topics: settings.topics,
			graphics: settings.graphics,
			dataSources: settings.dataSources,
			externalWriters: settings.externalWriters
		};
	} else {
		const {
			pipelines: updatedPipelines,
			topics: updatedTopics,
			graphics: updatedGraphics,
			removedGraphics,
			dataSources,
			externalWriters
		} = await fetchUpdatedPipelinesSettingsData({
			lastModifiedTimeOfPipelines: getLastModifiedAt(pipelines),
			lastModifiedTimeOfTopics: getLastModifiedAt(topics),
			lastModifiedTimeOfGraphics: graphics.reduce((time, graphics) => {
				const lastModifiedAt = graphics.lastModified;
				if (lastModifiedAt) {
					return time.isBefore(dayjs(lastModifiedAt)) ? dayjs(lastModifiedAt) : time;
				} else {
					return time;
				}
			}, dayjs('2000/01/01 00:00:00')),
			existsGraphicsIds: graphics.map(g => g.pipelineGraphId)
		});

		// merge
		return {
			pipelines: await mergePipelines(pipelines, updatedPipelines),
			topics: await mergeTopics(topics, updatedTopics),
			graphics: await mergePipelineGraphics(graphics, updatedGraphics, removedGraphics),
			dataSources: dataSources || [],
			externalWriters: externalWriters || []
		};
	}
};

export const clearAdminData = async () => {
	await clearAdminPipelines();
	await clearAdminTopics();
	await clearAdminPipelinesGraphics();
};