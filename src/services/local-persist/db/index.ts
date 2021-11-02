import {AdminLastSnapshot} from '../../data/admin/last-snapshot-types';
import {Pipeline, PipelinesGraphics, PipelinesGraphicsId} from '../../data/tuples/pipeline-types';
import {Topic} from '../../data/tuples/topic-types';
import {
	AdminDatabase,
	clearPipelines,
	clearPipelinesGraphics,
	clearTopics,
	deletePipelineGraphics,
	findPipelines,
	findPipelinesGraphics,
	findTopics,
	loadLastSnapshot,
	saveLastSnapshot,
	savePipeline,
	savePipelinesGraphics,
	saveTopic
} from './admin';
import {deleteSimulatorDatabase, SimulatorDatabase} from './simulator';

const adminDB = new AdminDatabase();
let simulatorDB = new SimulatorDatabase();

export const connectAdminDB = () => {
	return adminDB;
};

export const connectSimulatorDB = () => {
	if (!simulatorDB.isOpen()) {
		simulatorDB = new SimulatorDatabase();
	}
	return simulatorDB;
};

export const clearSimulatorDB = async () => {
	await deleteSimulatorDatabase();
};

export const findAdminPipelines = async (): Promise<Array<Pipeline>> => {
	return findPipelines(adminDB);
};

export const findAdminTopics = async (): Promise<Array<Topic>> => {
	return findTopics(adminDB);
};

export const findAdminPipelinesGraphics = async (): Promise<Array<PipelinesGraphics>> => {
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
export const deleteAdminPipelineGraphics = async (pipelineGraphId: PipelinesGraphicsId) => {
	await deletePipelineGraphics(adminDB, pipelineGraphId);
};
export const clearAdminPipelinesGraphics = async () => {
	await clearPipelinesGraphics(adminDB);
};

export const loadAdminLastSnapshot = async (): Promise<AdminLastSnapshot> => {
	return await loadLastSnapshot(adminDB);
};

export const saveAdminLastSnapshot = async (snapshot: Partial<AdminLastSnapshot>) => {
	await saveLastSnapshot(adminDB, snapshot);
};