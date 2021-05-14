import {Pipeline} from '../../../../services/tuples/pipeline-types';
import {PipelineStage} from '../../../../services/tuples/pipeline-stage-types';
import {DataRow} from '../../simulator-event-bus-types';
import {Topic} from '../../../../services/tuples/topic-types';
import {PipelineStageUnit} from '../../../../services/tuples/pipeline-stage-unit-types';
import {PipelineStageUnitAction} from '../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {TopicsData} from '../state/types';

export enum PipelineRunStatus {
	WAIT = 'wait',
	READY = 'ready',
	RUNNING = 'running',
	IGNORED = 'ignored',
	DONE = 'done',
	FAIL = 'fail'
}

export enum StageRunStatus {
	READY = 'ready',
	RUNNING = 'running',
	IGNORED = 'ignored',
	DONE = 'done',
	FAIL = 'fail'
}

export enum UnitRunStatus {
	READY = 'ready',
	RUNNING = 'running',
	IGNORED = 'ignored',
	DONE = 'done',
	FAIL = 'fail'
}

export enum ActionRunStatus {
	READY = 'ready',
	RUNNING = 'running',
	DONE = 'done',
	FAIL = 'fail'
}

export interface ChangedDataRow {
	topicId: string;
	before?: DataRow;
	after: DataRow;
}

export interface PipelineRuntimeContext {
	pipeline: Pipeline;
	topic: Topic;
	status: PipelineRunStatus;
	/** topic row trigger this pipeline */
	triggerData: DataRow;
	/**
	 * topic data which already exists when trigger this pipeline.
	 */
	existsData: Array<DataRow>;
	stages: Array<StageRuntimeContext>;

	/** all data declared in prepare data panel */
	allData: TopicsData;

	pipelineRuntimeId?: string;
	runtimeData: TopicsData;
	// changed data rows
	changedData: Array<ChangedDataRow>;
	variables: { [key in string]: any };
}

export interface StageRuntimeContext {
	stageIndex: number;
	stage: PipelineStage;
	status: StageRunStatus;
	units: Array<UnitRuntimeContext>;

	pipelineRuntimeId?: string;
	stageRuntimeId?: string;
	variables: { [key in string]: any };
}

export interface UnitRuntimeContext {
	unitIndex: number;
	unit: PipelineStageUnit;
	status: UnitRunStatus;
	actions: Array<ActionRuntimeContext>;

	pipelineRuntimeId?: string;
	stageRuntimeId?: string;
	unitRuntimeId?: string;
	variables: { [key in string]: any };
}

export interface ActionRuntimeContext {
	actionIndex: number;
	action: PipelineStageUnitAction;
	status: ActionRunStatus;

	pipelineRuntimeId?: string;
	stageRuntimeId?: string;
	unitRuntimeId?: string;
	actionRuntimeId?: string;
	variables: { [key in string]: any };
}