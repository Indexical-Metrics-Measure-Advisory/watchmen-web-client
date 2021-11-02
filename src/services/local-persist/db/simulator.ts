import Dexie from 'dexie';
import {PipelineStageId} from '../../data/tuples/pipeline-stage-types';
import {PipelineStageUnitActionId} from '../../data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {PipelineStageUnitId} from '../../data/tuples/pipeline-stage-unit-types';
import {PipelineId} from '../../data/tuples/pipeline-types';

export type PipelineRuntimeId = string;

export interface PipelineRuntimeTable {
	pipelineRuntimeId: PipelineRuntimeId;
	pipelineId: PipelineId;
	status: string;
	context: object;
	dataBefore: object;
	dataAfter?: object;
	changed?: Array<object>;
	lastModifiedAt: Date;
}

export type StageRuntimeId = string;

export interface StageRuntimeTable {
	stageRuntimeId: StageRuntimeId;
	stageId: PipelineStageId;
	pipelineRuntimeId: PipelineRuntimeId;
	pipelineId: PipelineId;
	stageIndex: number;
	status: string;
	context: object;
	dataBefore: object;
	dataAfter?: object;
	lastModifiedAt: Date;
}

export type UnitRuntimeId = string;

export interface UnitRuntimeTable {
	unitRuntimeId: UnitRuntimeId;
	unitId: PipelineStageUnitId;
	stageRuntimeId: StageRuntimeId;
	stageId: PipelineStageId;
	pipelineRuntimeId: PipelineRuntimeId;
	pipelineId: PipelineId;
	unitIndex: number;
	status: string;
	context: object;
	dataBefore: object;
	dataAfter?: object;
	lastModifiedAt: Date;
}

export type InternalUnitRuntimeId = string;

export interface InternalUnitRuntimeTable {
	internalUnitRuntimeId: InternalUnitRuntimeId;
	unitRuntimeId: UnitRuntimeId;
	unitId: PipelineStageUnitId;
	stageRuntimeId: StageRuntimeId;
	stageId: PipelineStageId;
	pipelineRuntimeId: PipelineRuntimeId;
	pipelineId: PipelineId;
	internalUnitIndex: number;
	status: string;
	context: object;
	dataBefore: object;
	dataAfter?: object;
	lastModifiedAt: Date;
}

export type ActionRuntimeId = string;

export interface ActionRuntimeTable {
	actionRuntimeId: ActionRuntimeId;
	actionId: PipelineStageUnitActionId;
	internalUnitRuntimeId: InternalUnitRuntimeId;
	unitRuntimeId: UnitRuntimeId;
	unitId: PipelineStageUnitId;
	stageRuntimeId: StageRuntimeId;
	stageId: PipelineStageId;
	pipelineRuntimeId: PipelineRuntimeId;
	pipelineId: PipelineId;
	actionIndex: number;
	status: string;
	context: object;
	dataBefore: object;
	dataAfter?: object;
	lastModifiedAt: Date;
}

export type RuntimeLogsId = string;

export interface RuntimeLogsTable {
	logId?: RuntimeLogsId;
	actionRuntimeId?: ActionRuntimeId;
	actionId?: PipelineStageUnitActionId;
	internalUnitRuntimeId?: InternalUnitRuntimeId;
	unitRuntimeId?: UnitRuntimeId;
	unitId?: PipelineStageUnitId;
	stageRuntimeId?: StageRuntimeId;
	stageId?: PipelineStageId;
	pipelineRuntimeId: PipelineRuntimeId;
	pipelineId: PipelineId;
	message: string;
	error?: string;
	createdAt: Date;
}

export const deleteSimulatorDatabase = async () => {
	await Dexie.delete('watchmen-simulator');
};

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
