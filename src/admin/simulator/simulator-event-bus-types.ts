import {Pipeline} from '../../services/tuples/pipeline-types';
import {Topic} from '../../services/tuples/topic-types';
import {ActiveStep, SimulateStart, StartFrom} from './body/state/types';

export enum SimulatorEventTypes {
	START_FROM_CHANGED = 'start-from-changed',
	START_PIPELINE_CHANGED = 'start-pipeline-changed',
	START_TOPIC_CHANGED = 'start-topic-changed',

	ACTIVE_STEP_CHANGED = 'active-step-changed',

	ASK_START = 'ask-start',
	REPLY_START = 'reply-start'
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

	fire(type: SimulatorEventTypes.ASK_START): this;
	on(type: SimulatorEventTypes.ASK_START, listener: () => void): this;
	off(type: SimulatorEventTypes.ASK_START, listener: () => void): this;

	fire(type: SimulatorEventTypes.REPLY_START, start: SimulateStart): this;
	once(type: SimulatorEventTypes.REPLY_START, listener: (start: SimulateStart) => void): this;
}