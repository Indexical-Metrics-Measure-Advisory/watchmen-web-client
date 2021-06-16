import {
	AdminDatabase,
	clearPipelines,
	clearPipelinesGraphics,
	clearTopics,
	findPipelines,
	findPipelinesGraphics,
	findTopics,
	loadLastSnapshot,
	saveLastSnapshot,
	savePipeline,
	savePipelinesGraphics,
	saveTopic
} from './admin';
import {Pipeline, PipelinesGraphics} from '../../services/tuples/pipeline-types';
import {Topic} from '../../services/tuples/topic-types';
import {deleteSimulatorDatabase, SimulatorDatabase} from './simulator';
import {AdminLastSnapshot} from '../../services/admin/last-snapshot-types';

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
export const clearAdminPipelinesGraphics = async () => {
	await clearPipelinesGraphics(adminDB);
};

export const loadAdminLastSnapshot = async (): Promise<AdminLastSnapshot> => {
	return await loadLastSnapshot(adminDB);
};

export const saveAdminLastSnapshot = async (snapshot: Partial<AdminLastSnapshot>) => {
	await saveLastSnapshot(adminDB, snapshot);
};