import Dexie from 'dexie';

interface PipelineRuntimeTable {
	pipelineRuntimeId: string;
	pipelineId: string;
	status: string;
	context: object;
	dataBefore: object;
	dataAfter?: object;
	changed?: Array<object>;
	lastModifiedAt: Date;
}

interface StageRuntimeTable {
	stageRuntimeId: string;
	stageId: string;
	pipelineRuntimeId: string;
	pipelineId: string;
	stageIndex: number;
	status: string;
	context: object;
	dataBefore: object;
	dataAfter?: object;
	lastModifiedAt: Date;
}

interface UnitRuntimeTable {
	unitRuntimeId: string;
	unitId: string;
	stageRuntimeId: string;
	stageId: string;
	pipelineRuntimeId: string;
	pipelineId: string;
	unitIndex: number;
	status: string;
	context: object;
	dataBefore: object;
	dataAfter?: object;
	lastModifiedAt: Date;
}

interface InternalUnitRuntimeTable {
	internalUnitRuntimeId: string;
	unitRuntimeId: string;
	unitId: string;
	stageRuntimeId: string;
	stageId: string;
	pipelineRuntimeId: string;
	pipelineId: string;
	internalUnitIndex: number;
	status: string;
	context: object;
	dataBefore: object;
	dataAfter?: object;
	lastModifiedAt: Date;
}

interface ActionRuntimeTable {
	actionRuntimeId: string;
	actionId: string;
	internalUnitRuntimeId: string;
	unitRuntimeId: string;
	unitId: string;
	stageRuntimeId: string;
	stageId: string;
	pipelineRuntimeId: string;
	pipelineId: string;
	actionIndex: number;
	status: string;
	context: object;
	dataBefore: object;
	dataAfter?: object;
	lastModifiedAt: Date;
}

interface RuntimeLogsTable {
	logId?: number;
	actionRuntimeId?: string;
	actionId?: string;
	internalUnitRuntimeId?: string;
	unitRuntimeId?: string;
	unitId?: string;
	stageRuntimeId?: string;
	stageId?: string;
	pipelineRuntimeId: string;
	pipelineId: string;
	message: string;
	error?: string;
	createdAt: Date;
}

export class SimulatorDatabase extends Dexie {
	pipelines: Dexie.Table<PipelineRuntimeTable, string>; // string = type of the primary key
	stages: Dexie.Table<StageRuntimeTable, string>;
	units: Dexie.Table<UnitRuntimeTable, string>;
	internalUnits: Dexie.Table<InternalUnitRuntimeTable, string>;
	actions: Dexie.Table<ActionRuntimeTable, string>;
	logs: Dexie.Table<RuntimeLogsTable, number>;

	constructor() {
		super('watchmen-simulator');
		this.version(1).stores({
			pipelines: 'pipelineRuntimeId, pipelineId',
			stages: 'stageRuntimeId, stageId, pipelineRuntimeId, pipelineId',
			units: 'unitRuntimeId, unitId, stageRuntimeId, stageId, pipelineRuntimeId, pipelineId',
			internalUnits: 'internalUnitRuntimeId, unitRuntimeId, unitId, stageRuntimeId, stageId, pipelineRuntimeId, pipelineId',
			actions: 'actionRuntimeId, actionId, unitRuntimeId, unitId, stageRuntimeId, stageId, pipelineRuntimeId, pipelineId',
			logs: '++logId, pipelineRuntimeId, pipelineId, stageRuntimeId, stageId, unitRuntimeId, unitId, internalUnitRuntimeId, actionRuntimeId, actionId'
		});
		this.pipelines = this.table('pipelines');
		this.stages = this.table('stages');
		this.units = this.table('units');
		this.internalUnits = this.table('internalUnits');
		this.actions = this.table('actions');
		this.logs = this.table('logs');
	}
}
