import {Pipeline} from '../../../../services/tuples/pipeline-types';
import {PipelineStage} from '../../../../services/tuples/pipeline-stage-types';
import {DataRow} from '../../simulator-event-bus-types';
import {Topic} from '../../../../services/tuples/topic-types';
import {PipelineStageUnit} from '../../../../services/tuples/pipeline-stage-unit-types';
import {PipelineStageUnitAction} from '../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';

export enum RunStatus {
	WAIT = 'wait',
	READY = 'ready',
	RUNNING = 'running',
	DONE = 'done',
	FAIL = 'fail'
}

export interface PipelineRuntimeContext {
	pipeline: Pipeline;
	topic: Topic;
	status: RunStatus;
	triggerData: DataRow;
	stages: Array<StageRuntimeContext>;
}

export interface StageRuntimeContext {
	stage: PipelineStage;
	status: RunStatus;
	parentContext: PipelineRuntimeContext;
	units: Array<UnitRuntimeContext>;
}

export interface UnitRuntimeContext {
	unit: PipelineStageUnit;
	status: RunStatus;
	parentContext: StageRuntimeContext;
	actions: Array<ActionRuntimeContext>;
}

export interface ActionRuntimeContext {
	action: PipelineStageUnitAction;
	status: RunStatus;
	parentContext: UnitRuntimeContext;
}