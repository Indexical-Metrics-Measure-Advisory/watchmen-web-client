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

export interface SimulateStart {
	startFrom: StartFrom;
	startTopic: Topic | null;
	startPipeline: Pipeline | null;
}

export interface SimulatorState extends SimulateStart {
	step: ActiveStep;
}

export enum RunType {
	ONE = 'one',
	ALL = 'all'
}