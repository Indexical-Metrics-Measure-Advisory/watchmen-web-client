import {fetchPipelinesGraphics} from '../tuples/pipeline';
import {fetchAllPipelines, fetchUpdatedPipelines} from './all-pipelines';
import {fetchAllTopics, fetchUpdatedTopics} from './all-topics';
import {PipelinesSettings} from './settings-types';
import {Dayjs} from 'dayjs';
import {PipelinesGraphics} from '../tuples/pipeline-types';
import {isMockService} from '../utils';
import {Apis, post} from '../apis';

export const fetchPipelinesSettingsData = async (): Promise<PipelinesSettings> => {
	const [pipelines, topics, graphics] = await Promise.all([
		fetchAllPipelines(),
		fetchAllTopics(),
		fetchPipelinesGraphics()
	]);

	return {pipelines, topics, graphics};
};

const fetchUpdatedPipelinesGraphics = async (lastModifiedTime: Dayjs): Promise<PipelinesGraphics | null> => {
	if (isMockService()) {
		return null;
	} else {
		return await post({
			api: Apis.PIPELINE_GRAPHICS_MINE_UPDATED,
			data: lastModifiedTime.format('YYYY/MM/DD HH:mm:ss')
		});
	}
};

export const fetchUpdatedPipelinesSettingsData = async (
	lastModifiedTimeOfPipelines: Dayjs,
	lastModifiedTimeOfTopics: Dayjs,
	lastModifiedTimeOfGraphics: Dayjs
): Promise<Partial<PipelinesSettings>> => {
	const [pipelines, topics, graphics] = await Promise.all([
		fetchUpdatedPipelines(lastModifiedTimeOfPipelines),
		fetchUpdatedTopics(lastModifiedTimeOfTopics),
		fetchUpdatedPipelinesGraphics(lastModifiedTimeOfGraphics)
	]);

	// fetch updated pipelines settings data
	return {pipelines, topics, graphics: graphics ?? undefined};
};