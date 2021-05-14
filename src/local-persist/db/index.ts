import {
	AdminDatabase,
	clearPipelines,
	clearPipelinesGraphics,
	clearTopics,
	findPipelines,
	findPipelinesGraphics,
	findTopics,
	savePipeline,
	savePipelinesGraphics,
	saveTopic
} from './admin';
import {Pipeline, PipelinesGraphics} from '../../services/tuples/pipeline-types';
import {Topic} from '../../services/tuples/topic-types';
import {SimulatorDatabase} from './simulator';

const adminDB = new AdminDatabase();
const simulatorDB = new SimulatorDatabase();

export const connectAdminDB = () => {
	return adminDB;
};

export const connectSimulatorDB = () => {
	return simulatorDB;
};

export const findAdminPipelines = async (): Promise<Array<Pipeline>> => {
	return findPipelines(adminDB);
};

export const findAdminTopics = async (): Promise<Array<Topic>> => {
	return findTopics(adminDB);
};

export const findAdminPipelinesGraphics = async (): Promise<PipelinesGraphics | undefined> => {
	return findPipelinesGraphics(adminDB);
};

export const saveAdminPipeline = async (pipeline: Pipeline) => {
	await savePipeline(adminDB, pipeline);
};

export const saveAdminTopic = async (topic: Topic) => {
	await saveTopic(adminDB, topic);
};

export const saveAdminPipelinesGraphics = async (graphics: PipelinesGraphics) => {
	await savePipelinesGraphics(adminDB, graphics);
};

export const clearAdminPipelines = async () => {
	await clearPipelines(adminDB);
};
export const clearAdminTopics = async () => {
	await clearTopics(adminDB);
};
export const clearAdminPipelinesGraphics = async () => {
	await clearPipelinesGraphics(adminDB);
};