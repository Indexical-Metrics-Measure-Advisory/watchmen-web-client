import {fetchPipelinesGraphics} from '../tuples/pipeline';
import {fetchAllPipelines} from './all-pipelines';
import {fetchAllTopics} from './all-topics';
import {PipelinesSettings} from './settings-types';
import {Dayjs} from 'dayjs';

export const fetchPipelinesSettingsData = async (): Promise<PipelinesSettings> => {
	const [pipelines, topics, graphics] = await Promise.all([
		fetchAllPipelines(),
		fetchAllTopics(),
		fetchPipelinesGraphics()
	]);

	return {pipelines, topics, graphics};
};

export const fetchUpdatedPipelinesSettingsData = async (
	lastModifiedTimeOfPipelines: Dayjs,
	lastModifiedTimeOfTopics: Dayjs,
	lastModifiedTimeOfGraphics: Dayjs
): Promise<Partial<PipelinesSettings>> => {
	const [pipelines, topics, graphics] = [[], [], null];

	// TODO fetch updated pipelines settings data
	return {pipelines, topics, graphics: graphics ?? undefined};
};