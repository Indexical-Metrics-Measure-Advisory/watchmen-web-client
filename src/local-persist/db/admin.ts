import Dexie from 'dexie';
import {Pipeline, PipelinesGraphics} from '../../services/tuples/pipeline-types';
import {Topic} from '../../services/tuples/topic-types';
import dayjs from 'dayjs';
import {findAccount} from '../../services/account';

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

export class AdminDatabase extends Dexie {
	pipelines: Dexie.Table<PipelinesTable, string>; // string = type of the primary key
	topics: Dexie.Table<TopicsTable, string>;
	pipelinesGraphics: Dexie.Table<PipelinesGraphicsTable, string>;

	constructor() {
		super('watchmen-admin');
		this.version(1).stores({
			pipelines: 'id',
			topics: 'id',
			pipelines_graphics: 'id'
		});
		this.pipelines = this.table('pipelines');
		this.topics = this.table('topics');
		this.pipelinesGraphics = this.table('pipelines_graphics');
	}
}

export const findPipelines = async (db: AdminDatabase): Promise<Array<Pipeline>> => {
	const data = await db.pipelines.toArray();
	return data.map(row => row.body as Pipeline);
};

export const savePipeline = async (db: AdminDatabase, pipeline: Pipeline) => {
	const updatedRows = await db.pipelines.update(pipeline.pipelineId, {
		body: pipeline,
		lastModifiedAt: dayjs(pipeline.lastModifyTime).toDate()
	});
	if (updatedRows === 0) {
		await db.pipelines.add({
			id: pipeline.pipelineId,
			body: pipeline,
			lastModifiedAt: dayjs(pipeline.lastModifyTime).toDate()
		});
	}
};

export const findTopics = async (db: AdminDatabase): Promise<Array<Topic>> => {
	const data = await db.topics.toArray();
	return data.map(row => row.body as Topic);
};

export const saveTopic = async (db: AdminDatabase, topic: Topic) => {
	const updatedRows = await db.topics.update(topic.topicId, {
		body: topic,
		lastModifiedAt: dayjs(topic.lastModifyTime).toDate()
	});
	if (updatedRows === 0) {
		await db.topics.add({
			id: topic.topicId,
			body: topic,
			lastModifiedAt: dayjs(topic.lastModifyTime).toDate()
		});
	}
};

export const findPipelineGraphics = async (db: AdminDatabase): Promise<PipelinesGraphics | undefined> => {
	const data = await db.pipelinesGraphics.limit(1).toArray();
	return data[0]?.body as PipelinesGraphics;
};

export const saveGraphics = async (db: AdminDatabase, graphics: PipelinesGraphics) => {
	const name = findAccount()?.name;
	if (!name) {
		return;
	}
	const updatedRows = await db.pipelinesGraphics.update(name, {
		body: graphics,
		lastModifiedAt: dayjs(graphics.lastModifyTime).toDate()
	});
	if (updatedRows === 0) {
		await db.pipelinesGraphics.add({
			id: name,
			body: graphics,
			lastModifiedAt: dayjs(graphics.lastModifyTime).toDate()
		});
	}
};
