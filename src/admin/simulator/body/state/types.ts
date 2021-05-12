import {Pipeline} from '../../../../services/tuples/pipeline-types';
import {Topic} from '../../../../services/tuples/topic-types';
import {DataRow} from '../../simulator-event-bus-types';

export enum StartFrom {
	TOPIC = 'topic',
	PIPELINE = 'pipeline'
}

export enum ActiveStep {
	SELECT = 'select',
	PREPARE_DATA = 'prepare-data',
	RUN = 'run',
	RESULT = 'result'
}

export interface SimulateStart {
	startFrom: StartFrom;
	startTopic: Topic | null;
	startPipeline: Pipeline | null;
}

export interface SimulatorState extends SimulateStart {
	step: ActiveStep;

	runPipelines: Array<Pipeline>;
	topicsData: { [key in string]: Array<DataRow> };
}
