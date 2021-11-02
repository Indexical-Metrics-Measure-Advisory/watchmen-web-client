import {Dayjs} from 'dayjs';
import {fetchPipelinesGraphics} from '../tuples/pipeline';
import {PipelinesGraphics, PipelinesGraphicsId} from '../tuples/pipeline-types';
import {isMockService} from '../utils';
import {fetchAllDataSources} from './all-data-sources';
import {fetchAllExternalWriters} from './all-external-writers';
import {fetchAllPipelines, fetchUpdatedPipelines} from './all-pipelines';
import {fetchAllTopics, fetchUpdatedTopics} from './all-topics';
import {PipelinesSettings} from './settings-types';

export const fetchPipelinesSettingsData = async (): Promise<PipelinesSettings> => {
	const [pipelines, topics, graphics, dataSources, externalWriters] = await Promise.all([
		fetchAllPipelines(),
		fetchAllTopics(),
		fetchPipelinesGraphics(),
		fetchAllDataSources(),
		fetchAllExternalWriters()
	]);

	return {pipelines, topics, graphics, dataSources, externalWriters};
};

const fetchUpdatedPipelinesGraphics = async (lastModifiedTime: Dayjs, existsGraphicsIds: Array<PipelinesGraphicsId>): Promise<{ updated: Array<PipelinesGraphics>, removed: Array<PipelinesGraphicsId> }> => {
	if (isMockService()) {
		return {updated: [], removed: []};
	} else {
		// TODO fetch updated pipeline graphics, not implemented yet. use fetch whole data instead now.
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
	existsGraphicsIds: Array<PipelinesGraphicsId>
}): Promise<Partial<PipelinesSettings> & { removedGraphics: Array<PipelinesGraphicsId> }> => {
	const {
		lastModifiedTimeOfPipelines,
		lastModifiedTimeOfTopics,
		lastModifiedTimeOfGraphics,
		existsGraphicsIds
	} = options;

	const [pipelines, topics, graphics, dataSources, externalWriters] = await Promise.all([
		fetchUpdatedPipelines(lastModifiedTimeOfPipelines),
		fetchUpdatedTopics(lastModifiedTimeOfTopics),
		fetchUpdatedPipelinesGraphics(lastModifiedTimeOfGraphics, existsGraphicsIds),
		fetchAllDataSources(),
		fetchAllExternalWriters()
	]);

	// fetch updated pipelines settings data
	return {
		pipelines,
		topics,
		graphics: graphics.updated,
		dataSources,
		externalWriters,
		removedGraphics: graphics.removed
	};
};