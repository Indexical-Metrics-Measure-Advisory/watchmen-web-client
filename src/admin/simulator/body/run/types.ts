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

export interface PipelineRuntimeContext {
	pipeline: Pipeline;
	topic: Topic;
	status: PipelineRunStatus;
	triggerData: DataRow;
	stages: Array<StageRuntimeContext>;
	allData: TopicsData;
}

export interface StageRuntimeContext {
	stage: PipelineStage;
	status: StageRunStatus;
	parentContext: PipelineRuntimeContext;
	units: Array<UnitRuntimeContext>;
}

export interface UnitRuntimeContext {
	unit: PipelineStageUnit;
	status: UnitRunStatus;
	parentContext: StageRuntimeContext;
	actions: Array<ActionRuntimeContext>;
}

export interface ActionRuntimeContext {
	action: PipelineStageUnitAction;
	status: ActionRunStatus;
	parentContext: UnitRuntimeContext;
}