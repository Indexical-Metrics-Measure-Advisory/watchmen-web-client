import Dexie from 'dexie';

interface PipelineRuntimeTable {
	pipelineRuntimeId: string;
	pipelineId: string;
	body: object;
	dataBefore: object;
	lastModifiedAt: Date;
}

interface StageRuntimeTable {
	stageRuntimeId: string;
	stageId: string;
	pipelineRuntimeId: string;
	pipelineId: string;
	body: object;
	dataBefore: object;
	lastModifiedAt: Date;
}

interface UnitRuntimeTable {
	unitRuntimeId: string;
	unitId: string;
	stageRuntimeId: string;
	stageId: string;
	pipelineRuntimeId: string;
	pipelineId: string;
	body: object;
	lastModifiedAt: Date;
}

interface ActionRuntimeTable {
	actionRuntimeId: string;
	actionId: string;
	unitRuntimeId: string;
	unitId: string;
	stageRuntimeId: string;
	stageId: string;
	pipelineRuntimeId: string;
	pipelineId: string;
	body: object;
	lastModifiedAt: Date;
}

interface RuntimeLogsTable {
	logId?: number;
	actionRuntimeId?: string;
	actionId?: string;
	unitRuntimeId?: string;
	unitId?: string;
	stageRuntimeId?: string;
	stageId?: string;
	pipelineRuntimeId: string;
	pipelineId: string;
	message: string;
	createdAt: Date;
}

export class SimulatorDatabase extends Dexie {
	pipelines: Dexie.Table<PipelineRuntimeTable, string>; // string = type of the primary key
	stages: Dexie.Table<StageRuntimeTable, string>;
	units: Dexie.Table<UnitRuntimeTable, string>;
	actions: Dexie.Table<ActionRuntimeTable, string>;
	logs: Dexie.Table<RuntimeLogsTable, number>;

	constructor() {
		super('watchmen-simulator');
		this.version(1).stores({
			pipelines: 'pipelineRuntimeId, pipelineId',
			stages: 'pipelineRuntimeId, pipelineId, stageRuntimeId, stageId',
			units: 'pipelineRuntimeId, pipelineId, stageRuntimeId, stageId, unitRuntimeId, unitId',
			actions: 'pipelineRuntimeId, pipelineId, stageRuntimeId, stageId, unitRuntimeId, unitId, actionRuntimeId, actionId',
			logs: '++logId, pipelineRuntimeId, pipelineId, stageRuntimeId, stageId, unitRuntimeId, unitId, actionRuntimeId, actionId'
		});
		this.pipelines = this.table('pipelines');
		this.stages = this.table('stages');
		this.units = this.table('units');
		this.actions = this.table('actions');
		this.logs = this.table('logs');
	}
}
