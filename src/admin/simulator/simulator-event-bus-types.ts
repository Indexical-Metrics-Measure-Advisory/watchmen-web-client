import {Pipeline} from '../../services/tuples/pipeline-types';
import {Topic} from '../../services/tuples/topic-types';

export enum SimulatorEventTypes {
	START_PIPELINE = 'start-pipeline',
	START_TOPIC = 'start-topic'
}

export interface SimulatorEventBus {
	fire(type: SimulatorEventTypes.START_PIPELINE, pipeline: Pipeline): this;
	on(type: SimulatorEventTypes.START_PIPELINE, listener: (pipeline: Pipeline) => void): this;
	off(type: SimulatorEventTypes.START_PIPELINE, listener: (pipeline: Pipeline) => void): this;

	fire(type: SimulatorEventTypes.START_TOPIC, topic: Topic): this;
	on(type: SimulatorEventTypes.START_TOPIC, listener: (topic: Topic) => void): this;
	off(type: SimulatorEventTypes.START_TOPIC, listener: (topic: Topic) => void): this;
}