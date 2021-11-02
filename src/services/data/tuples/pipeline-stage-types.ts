import {PipelineStageUnit} from './pipeline-stage-unit-types';
import {Conditional} from './pipeline-super-types';

export type PipelineStageId = string;

export interface PipelineStage extends Conditional {
	stageId: PipelineStageId;
	name: string;
	units: Array<PipelineStageUnit>;
}
