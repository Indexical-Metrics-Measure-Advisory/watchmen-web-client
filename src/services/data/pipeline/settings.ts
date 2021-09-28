import {Dayjs} from 'dayjs';
import {fetchPipelinesGraphics} from '../tuples/pipeline';
import {PipelinesGraphics} from '../tuples/pipeline-types';
import {isMockService} from '../utils';
import {fetchAllExternalWriters} from './all-external-writers';
import {fetchAllPipelines, fetchUpdatedPipelines} from './all-pipelines';
import {fetchAllTopics, fetchUpdatedTopics} from './all-topics';
import {PipelinesSettings} from './settings-types';

export const fetchPipelinesSettingsData = async (): Promise<PipelinesSettings> => {
	const [pipelines, topics, graphics, externalWriters] = await Promise.all([
		fetchAllPipelines(),
		fetchAllTopics(),
		fetchPipelinesGraphics(),
		fetchAllExternalWriters()
	]);

	return {pipelines, topics, graphics, externalWriters};
};

const fetchUpdatedPipelinesGraphics = async (lastModifiedTime: Dayjs, existsGraphicsIds: Array<string>): Promise<{ updated: Array<PipelinesGraphics>, removed: Array<string> }> => {
	if (isMockService()) {
		return {updated: [], removed: []};
	} else {
		// TODO fetch updated pipeline graphics
		return {
			updated: await fetchPipelinesGraphics(),
			removed: []
		};
	}
};

export const fetchUpdatedPipelinesSettingsData = async (options: {
	lastModifiedTimeOfPipelines: Dayjs,
	lastModifiedTimeOfTopics: Dayjs,
	lastModifiedTimeOfGraphics: Dayjs,
	existsGraphicsIds: Array<string>
}): Promise<Partial<PipelinesSettings> & { removedGraphics: Array<string> }> => {
	const {
		lastModifiedTimeOfPipelines,
		lastModifiedTimeOfTopics,
		lastModifiedTimeOfGraphics,
		existsGraphicsIds
	} = options;

	const [pipelines, topics, graphics, externalWriters] = await Promise.all([
		fetchUpdatedPipelines(lastModifiedTimeOfPipelines),
		fetchUpdatedTopics(lastModifiedTimeOfTopics),
		fetchUpdatedPipelinesGraphics(lastModifiedTimeOfGraphics, existsGraphicsIds),
		fetchAllExternalWriters()
	]);

	// fetch updated pipelines settings data
	return {pipelines, topics, graphics: graphics.updated, externalWriters, removedGraphics: graphics.removed};
};