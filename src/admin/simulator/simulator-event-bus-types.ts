import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {ActiveStep, SimulateStart, StartFrom, TopicsData} from './body/state/types';
import {DataRow} from './types';

export enum SimulatorEventTypes {
	START_FROM_CHANGED = 'start-from-changed',
	START_PIPELINE_CHANGED = 'start-pipeline-changed',
	START_TOPIC_CHANGED = 'start-topic-changed',

	ACTIVE_STEP_CHANGED = 'active-step-changed',

	PIPELINE_RUN_CHANGED = 'pipeline-run-changed',
	TOPIC_DATA_CHANGED = 'topic-data-changed',

	ASK_START = 'ask-start',

	ASK_PIPELINE_RUN = 'ask-pipeline-run',

	ASK_TOPIC_DATA = 'ask-topic-data',

	ASK_RUN_MATERIAL = 'ask-run-material',
}

export interface SimulatorEventBus {
	fire(type: SimulatorEventTypes.START_FROM_CHANGED, from: StartFrom): this;
	on(type: SimulatorEventTypes.START_FROM_CHANGED, listener: (from: StartFrom) => void): this;
	off(type: SimulatorEventTypes.START_FROM_CHANGED, listener: (from: StartFrom) => void): this;

	fire(type: SimulatorEventTypes.START_PIPELINE_CHANGED, pipeline: Pipeline | null): this;
	on(type: SimulatorEventTypes.START_PIPELINE_CHANGED, listener: (pipeline: Pipeline | null) => void): this;
	off(type: SimulatorEventTypes.START_PIPELINE_CHANGED, listener: (pipeline: Pipeline | null) => void): this;

	fire(type: SimulatorEventTypes.START_TOPIC_CHANGED, topic: Topic | null): this;
	on(type: SimulatorEventTypes.START_TOPIC_CHANGED, listener: (topic: Topic | null) => void): this;
	off(type: SimulatorEventTypes.START_TOPIC_CHANGED, listener: (topic: Topic | null) => void): this;

	fire(type: SimulatorEventTypes.ACTIVE_STEP_CHANGED, step: ActiveStep): this;
	on(type: SimulatorEventTypes.ACTIVE_STEP_CHANGED, listener: (step: ActiveStep) => void): this;
	off(type: SimulatorEventTypes.ACTIVE_STEP_CHANGED, listener: (step: ActiveStep) => void): this;

	fire(type: SimulatorEventTypes.PIPELINE_RUN_CHANGED, pipeline: Pipeline, run: boolean): this;
	on(type: SimulatorEventTypes.PIPELINE_RUN_CHANGED, listener: (pipeline: Pipeline, run: boolean) => void): this;
	off(type: SimulatorEventTypes.PIPELINE_RUN_CHANGED, listener: (pipeline: Pipeline, run: boolean) => void): this;

	fire(type: SimulatorEventTypes.TOPIC_DATA_CHANGED, topic: Topic, rows: Array<DataRow>): this;
	on(type: SimulatorEventTypes.TOPIC_DATA_CHANGED, listener: (topic: Topic, rows: Array<DataRow>) => void): this;
	off(type: SimulatorEventTypes.TOPIC_DATA_CHANGED, listener: (topic: Topic, rows: Array<DataRow>) => void): this;

	fire(type: SimulatorEventTypes.ASK_START, onStart: (start: SimulateStart) => void): this;
	on(type: SimulatorEventTypes.ASK_START, listener: (onStart: (start: SimulateStart) => void) => void): this;
	off(type: SimulatorEventTypes.ASK_START, listener: (onStart: (start: SimulateStart) => void) => void): this;

	fire(type: SimulatorEventTypes.ASK_PIPELINE_RUN, pipeline: Pipeline, onRunGet: (run: boolean) => void): this;
	on(type: SimulatorEventTypes.ASK_PIPELINE_RUN, listener: (pipeline: Pipeline, onRunGet: (run: boolean) => void) => void): this;
	off(type: SimulatorEventTypes.ASK_PIPELINE_RUN, listener: (pipeline: Pipeline, onRunGet: (run: boolean) => void) => void): this;

	fire(type: SimulatorEventTypes.ASK_TOPIC_DATA, topic: Topic, onData: (rows: Array<DataRow>) => void): this;
	on(type: SimulatorEventTypes.ASK_TOPIC_DATA, listener: (topic: Topic, onData: (rows: Array<DataRow>) => void) => void): this;
	off(type: SimulatorEventTypes.ASK_TOPIC_DATA, listener: (topic: Topic, onData: (rows: Array<DataRow>) => void) => void): this;

	fire(type: SimulatorEventTypes.ASK_RUN_MATERIAL, onMaterial: (topicData: TopicsData, pipelines: Array<Pipeline>) => void): this;
	on(type: SimulatorEventTypes.ASK_RUN_MATERIAL, listener: (onMaterial: (topicData: TopicsData, pipelines: Array<Pipeline>) => void) => void): this;
	off(type: SimulatorEventTypes.ASK_RUN_MATERIAL, listener: (onMaterial: (topicData: TopicsData, pipelines: Array<Pipeline>) => void) => void): this;
}