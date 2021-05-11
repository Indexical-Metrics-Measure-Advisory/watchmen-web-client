import {Pipeline} from '../../../../services/tuples/pipeline-types';
import {Topic} from '../../../../services/tuples/topic-types';

export enum StartFrom {
	TOPIC = 'topic',
	PIPELINE = 'pipeline'
}

export enum ActiveStep {
	SELECT = 'select',
	PREPARE_DATA = 'prepare-data',
	RUN = 'run'
}

export interface SimulatorState {
	step: ActiveStep;

	startFrom: StartFrom;
	startTopic: Topic | null;
	startPipeline: Pipeline | null;
}

export enum RunType {
	ONE = 'one',
	ALL = 'all'
}