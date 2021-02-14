import { fetchPipelinesGraphics } from '../tuples/pipeline';
import { fetchAllPipelines } from './all-pipelines';
import { fetchAllTopics } from './all-topics';
import { PipelinesSettings } from './settings-types';

export const fetchPipelinesSettingsData = async (): Promise<PipelinesSettings> => {
	const [ pipelines, topics, graphics ] = await Promise.all([
		fetchAllPipelines(),
		fetchAllTopics(),
		fetchPipelinesGraphics()
	]);

	// @ts-ignore
	return { pipelines, topics, graphics };
};