import { ParameterJoint } from './factor-calculator-types';
import { PipelineStage } from './pipeline-stage-types';
import { Tuple } from './tuple-types';

export enum PipelineTriggerType {
	INSERT = 'insert',
	MERGE = 'merge',
	// insert or merge
	INSERT_OR_MERGE = 'insert-or-merge',
	DELETE = 'delete',
}

export interface Pipeline extends Tuple {
	pipelineId: string;
	topicId: string;
	name: string;
	type: PipelineTriggerType;
	conditional: boolean;
	on?: ParameterJoint;
	stages: Array<PipelineStage>;
}
