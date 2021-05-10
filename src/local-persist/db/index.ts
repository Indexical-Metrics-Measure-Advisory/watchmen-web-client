import {
	AdminDatabase,
	findPipelineGraphics,
	findPipelines,
	findTopics,
	saveGraphics,
	savePipeline,
	saveTopic
} from './admin';
import {Pipeline, PipelinesGraphics} from '../../services/tuples/pipeline-types';
import {Topic} from '../../services/tuples/topic-types';

const adminDB = new AdminDatabase();

export const connectAdminDB = () => {
	return adminDB;
};

export const findAdminPipelines = async (): Promise<Array<Pipeline>> => {
	return findPipelines(adminDB);
};

export const findAdminTopics = async (): Promise<Array<Topic>> => {
	return findTopics(adminDB);
};

export const findAdminPipelinesGraphics = async (): Promise<PipelinesGraphics | undefined> => {
	return findPipelineGraphics(adminDB);
};

export const saveAdminPipeline = async (pipeline: Pipeline) => {
	await savePipeline(adminDB, pipeline);
};

export const saveAdminTopic = async (topic: Topic) => {
	await saveTopic(adminDB, topic);
};

export const saveAdminPipelinesGraphics = async (graphics: PipelinesGraphics) => {
	await saveGraphics(adminDB, graphics);
};