import Dexie from 'dexie';

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
