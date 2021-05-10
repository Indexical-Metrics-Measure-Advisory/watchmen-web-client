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
import {fetchPipelinesSettingsData, fetchUpdatedPipelinesSettingsData} from '../services/pipeline/settings';
import dayjs, {Dayjs} from 'dayjs';
import {Tuple} from '../services/tuples/tuple-types';
import {Pipeline, PipelinesGraphics} from '../services/tuples/pipeline-types';
import {Topic} from '../services/tuples/topic-types';

export const prepareAdminDB = () => {
	connectAdminDB();
	console.info('%cLocal admin database prepared', `font-size:14px;font-variant:petite-caps;font-weight:bold;text-transform:capitalize;color:white;background-color:rgba(94,119,171,0.9);padding:2px 6px;border-radius:6px;`);
};

const getLastModifiedAt = (tuples: Array<Tuple>): Dayjs => {
	return tuples.reduce((time, tuple) => {
		const lastModifiedAt = tuple.lastModifyTime;
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

const saveGraphics = async (graphics: PipelinesGraphics) => {
	await saveAdminPipelinesGraphics(graphics);
};

export const loadAdminData = async (): Promise<AdminCacheData> => {
	const [pipelines, topics, graphics] = await Promise.all([
		findAdminPipelines(),
		findAdminTopics(),
		findAdminPipelinesGraphics()
	]);

	if ((!pipelines || pipelines.length === 0)
		&& (!topics || topics.length === 0)
		&& !graphics) {
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
			graphics: settings.graphics
		};
	} else {
		const {
			pipelines: updatedPipelines,
			topics: updatedTopics,
			graphics: updatedGraphics
		} = await fetchUpdatedPipelinesSettingsData(
			getLastModifiedAt(pipelines),
			getLastModifiedAt(topics),
			graphics?.lastModifyTime ? dayjs(graphics.lastModifyTime) : dayjs('2000/01/01 00:00:00')
		);

		const g = updatedGraphics ? updatedGraphics : graphics!;
		if (g) {
			await saveGraphics(g);
		}

		// merge
		return {
			pipelines: await mergePipelines(pipelines, updatedPipelines),
			topics: await mergeTopics(topics, updatedTopics),
			graphics: g
		};
	}
};

export const clearAdminData = async () => {
	await clearAdminPipelines();
	await clearAdminTopics();
	await clearAdminPipelinesGraphics();
};