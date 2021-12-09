import {PipelineStage} from '@/services/data/tuples/pipeline-stage-types';
import {
	PipelineStageUnitAction
} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {PipelineStageUnit} from '@/services/data/tuples/pipeline-stage-unit-types';
import {Pipeline, PipelineId} from '@/services/data/tuples/pipeline-types';
import {Topic, TopicId} from '@/services/data/tuples/topic-types';
import {PipelineRuntimeId} from '@/services/local-persist/db/simulator';
import {DataRow} from '../../types';
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
	topicId: TopicId;
	before?: DataRow;
	after: DataRow;
}

export type AllTopics = Record<TopicId, Topic>;
export type InMemoryVariables = Record<string, any>;

export interface DefeatedPipeline {
	triggerData: ChangedDataRow;
	pipelines: Array<PipelineId>;
}

export interface PipelineRuntimeContext {
	pipeline: Pipeline;
	topic: Topic;
	status: PipelineRunStatus;
	/** topic row trigger this pipeline */
	triggerData: DataRow;
	/** topic row trigger this pipeline, it used to be */
	triggerDataOnce?: DataRow;

	stages: Array<StageRuntimeContext>;

	allTopics: AllTopics;

	pipelineRuntimeId?: PipelineRuntimeId;
	/** runtime data */
	runtimeData: TopicsData;
	// changed data rows
	changedData: Array<ChangedDataRow>;
	variables: InMemoryVariables;

	// defeated pipelines
	defeatedPipelines?: Array<DefeatedPipeline>;
}

export interface StageRuntimeContext {
	stageIndex: number;
	stage: PipelineStage;
	status: StageRunStatus;
	units: Array<UnitRuntimeContext>;

	pipelineRuntimeId?: string;
	stageRuntimeId?: string;
}

export interface UnitRuntimeContext {
	unitIndex: number;
	unit: PipelineStageUnit;
	status: UnitRunStatus;
	internals: Array<InternalUnitRuntimeContext>;

	pipelineRuntimeId?: string;
	stageRuntimeId?: string;
	unitRuntimeId?: string;
}

export interface InternalUnitRuntimeContext {
	internalUnitIndex: number;
	unit: PipelineStageUnit;
	status: UnitRunStatus;
	actions: Array<ActionRuntimeContext>;

	// since there might be a loop, delegate variables in pipeline
	variables: InMemoryVariables;

	pipelineRuntimeId?: string;
	stageRuntimeId?: string;
	unitRuntimeId?: string;
	internalUnitRuntimeId?: string;
}

export interface ActionRuntimeContext {
	actionIndex: number;
	action: PipelineStageUnitAction;
	status: ActionRunStatus;

	pipelineRuntimeId?: string;
	stageRuntimeId?: string;
	unitRuntimeId?: string;
	actionRuntimeId?: string;
}