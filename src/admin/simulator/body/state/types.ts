import {Pipeline} from '../../../../services/tuples/pipeline-types';
import {Topic} from '../../../../services/tuples/topic-types';

export enum StartFrom {
	TOPIC = 'topic',
	PIPELINE = 'pipeline'
}

export interface SimulatorState {
	startFrom: StartFrom;
	startTopic: Topic | null;
	startPipeline: Pipeline | null;
}