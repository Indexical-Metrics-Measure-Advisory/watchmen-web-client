import { fetchAllPipelines } from './all-pipelines';
import { fetchAllTopics } from './all-topics';
import { PipelinesSettings } from './settings-types';

export const fetchPipelinesSettingsData = async (): Promise<PipelinesSettings> => {
	const [ pipelines, topics ] = await Promise.all([
		fetchAllPipelines(),
		fetchAllTopics()
	]);

	// @ts-ignore
	return { pipelines, topics };
};