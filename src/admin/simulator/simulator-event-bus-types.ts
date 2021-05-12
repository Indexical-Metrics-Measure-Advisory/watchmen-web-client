import {Pipeline} from '../../services/tuples/pipeline-types';
import {Topic} from '../../services/tuples/topic-types';
import {ActiveStep, SimulateStart, StartFrom} from './body/state/types';

export type DataRow = { [key in string]: string | null };

export enum SimulatorEventTypes {
	START_FROM_CHANGED = 'start-from-changed',
	START_PIPELINE_CHANGED = 'start-pipeline-changed',
	START_TOPIC_CHANGED = 'start-topic-changed',

	ACTIVE_STEP_CHANGED = 'active-step-changed',

	PIPELINE_RUN_CHANGED = 'pipeline-run-changed',
	TOPIC_DATA_CHANGED = 'topic-data-changed',

	ASK_START = 'ask-start',
	REPLY_START = 'reply-start',

	ASK_PIPELINE_RUN = 'ask-pipeline-run',
	REPLY_PIPELINE_RUN = 'reply-pipeline-run',

	ASK_TOPIC_DATA = 'ask-topic-data',
	REPLY_TOPIC_DATA = 'reply-topic-data'
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

	fire(type: SimulatorEventTypes.ASK_START): this;
	on(type: SimulatorEventTypes.ASK_START, listener: () => void): this;
	off(type: SimulatorEventTypes.ASK_START, listener: () => void): this;

	fire(type: SimulatorEventTypes.REPLY_START, start: SimulateStart): this;
	once(type: SimulatorEventTypes.REPLY_START, listener: (start: SimulateStart) => void): this;

	fire(type: SimulatorEventTypes.ASK_PIPELINE_RUN, pipeline: Pipeline): this;
	on(type: SimulatorEventTypes.ASK_PIPELINE_RUN, listener: (pipeline: Pipeline) => void): this;
	off(type: SimulatorEventTypes.ASK_PIPELINE_RUN, listener: (pipeline: Pipeline) => void): this;

	fire(type: SimulatorEventTypes.REPLY_PIPELINE_RUN, run: boolean): this;
	once(type: SimulatorEventTypes.REPLY_PIPELINE_RUN, listener: (run: boolean) => void): this;

	fire(type: SimulatorEventTypes.ASK_TOPIC_DATA, topic: Topic): this;
	on(type: SimulatorEventTypes.ASK_TOPIC_DATA, listener: (topic: Topic) => void): this;
	off(type: SimulatorEventTypes.ASK_TOPIC_DATA, listener: (topic: Topic) => void): this;

	fire(type: SimulatorEventTypes.REPLY_TOPIC_DATA, rows: Array<DataRow>): this;
	once(type: SimulatorEventTypes.REPLY_TOPIC_DATA, listener: (rows: Array<DataRow>) => void): this;
}