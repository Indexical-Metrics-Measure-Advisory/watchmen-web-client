import dayjs from 'dayjs';
import Dexie from 'dexie';
import {findAccount} from '../../data/account';
import {AdminLastSnapshot} from '../../data/admin/last-snapshot-types';
import {Pipeline, PipelinesGraphics} from '../../data/tuples/pipeline-types';
import {Topic} from '../../data/tuples/topic-types';

interface PipelinesTable {
	id: string;
	body: object;
	lastModifiedAt: Date;
}

interface TopicsTable {
	id: string;
	body: object;
	lastModifiedAt: Date;
}

interface PipelinesGraphicsTable {
	id: string;
	body: object;
	lastModifiedAt: Date;
}

interface AdminLastSnapshotTable {
	id: string;
	body: object;
	lastModifiedAt: Date;
}

export class AdminDatabase extends Dexie {
	pipelines: Dexie.Table<PipelinesTable, string>; // string = type of the primary key
	topics: Dexie.Table<TopicsTable, string>;
	pipelinesGraphics: Dexie.Table<PipelinesGraphicsTable, string>;
	lastSnapshot: Dexie.Table<AdminLastSnapshotTable, string>;

	constructor() {
		super('watchmen-admin');
		this.version(1).stores({
			pipelines: 'id',
			topics: 'id',
			pipelines_graphics: 'id'
		});
		this.version(2).stores({
			admin_last_snapshot: 'id'
		});
		this.pipelines = this.table('pipelines');
		this.topics = this.table('topics');
		this.pipelinesGraphics = this.table('pipelines_graphics');
		this.lastSnapshot = this.table('admin_last_snapshot');
	}
}

export const findPipelines = async (db: AdminDatabase): Promise<Array<Pipeline>> => {
	const data = await db.pipelines.toArray();
	return data.map(row => row.body as Pipeline);
};

export const savePipeline = async (db: AdminDatabase, pipeline: Pipeline) => {
	const updatedRows = await db.pipelines.update(pipeline.pipelineId, {
		body: pipeline,
		lastModifiedAt: dayjs(pipeline.lastModified).toDate()
	});
	if (updatedRows === 0) {
		await db.pipelines.add({
			id: pipeline.pipelineId,
			body: pipeline,
			lastModifiedAt: dayjs(pipeline.lastModified).toDate()
		});
	}
};

export const clearPipelines = async (db: AdminDatabase) => {
	await db.pipelines.clear();
};

export const findTopics = async (db: AdminDatabase): Promise<Array<Topic>> => {
	const data = await db.topics.toArray();
	return data.map(row => row.body as Topic);
};

export const saveTopic = async (db: AdminDatabase, topic: Topic) => {
	const updatedRows = await db.topics.update(topic.topicId, {
		body: topic,
		lastModifiedAt: dayjs(topic.lastModified).toDate()
	});
	if (updatedRows === 0) {
		await db.topics.add({
			id: topic.topicId,
			body: topic,
			lastModifiedAt: dayjs(topic.lastModified).toDate()
		});
	}
};

export const clearTopics = async (db: AdminDatabase) => {
	await db.topics.clear();
};

export const findPipelinesGraphics = async (db: AdminDatabase): Promise<Array<PipelinesGraphics>> => {
	const name = findAccount()?.name;
	if (!name) {
		return [];
	}
	const data: Array<PipelinesGraphicsTable> = await db.pipelinesGraphics.toArray();
	return data.filter(({id, body}) => {
		if (body == null) {
			return false;
		} else if (id === name) {
			// version 1, id is account name, delete it anyway
			db.pipelinesGraphics.delete(id);
			return true;
		} else if ((body as any).account === name) {
			// now for an account, there are multiple graphics
			return true;
		} else if (!(body as any).account) {
			// belongs to nobody, delete it
			db.pipelinesGraphics.delete(id);
			return false;
		} else {
			// belongs to other accounts, ignored
			return false;
		}
	}).map(item => item.body) as Array<PipelinesGraphics>;
};

export const savePipelinesGraphics = async (db: AdminDatabase, graphics: PipelinesGraphics) => {
	const name = findAccount()?.name;
	if (!name) {
		return;
	}
	const updatedRows = await db.pipelinesGraphics.update(graphics.pipelineGraphId, {
		body: {...graphics, account: name},
		lastModifiedAt: dayjs(graphics.lastModified).toDate()
	});
	if (updatedRows === 0) {
		await db.pipelinesGraphics.add({
			id: graphics.pipelineGraphId,
			body: {...graphics, account: name},
			lastModifiedAt: dayjs(graphics.lastModified).toDate()
		});
	}
	await saveLastSnapshot(db, {lastPipelineGraphId: graphics.pipelineGraphId});
};

export const deletePipelineGraphics = async (db: AdminDatabase, pipelineGraphId: string) => {
	const name = findAccount()?.name;
	if (!name) {
		return;
	}

	const graphics = await db.pipelinesGraphics.get(pipelineGraphId);
	if (graphics) {
		if ((graphics.body as any).account === name) {
			await db.pipelinesGraphics.delete(pipelineGraphId);
		}
	}
};

export const clearPipelinesGraphics = async (db: AdminDatabase) => {
	await db.pipelinesGraphics.clear();
};

export const loadLastSnapshot = async (db: AdminDatabase): Promise<AdminLastSnapshot> => {
	const name = findAccount()?.name;
	if (!name) {
		return {};
	}
	const lastSnapshot = await db.lastSnapshot.get(name);
	if (!lastSnapshot) {
		return {};
	} else {
		return lastSnapshot.body || {};
	}
};

export const saveLastSnapshot = async (db: AdminDatabase, snapshot: Partial<AdminLastSnapshot>) => {
	const name = findAccount()?.name;
	if (!name) {
		return;
	}

	const exists = await loadLastSnapshot(db);
	const updated: AdminLastSnapshot = {...exists, ...snapshot};
	const updatedRows = await db.lastSnapshot.update(name, {
		body: updated,
		lastModifiedAt: dayjs().toDate()
	});
	if (updatedRows === 0) {
		await db.lastSnapshot.add({
			id: name,
			body: updated,
			lastModifiedAt: dayjs().toDate()
		});
	}
};

