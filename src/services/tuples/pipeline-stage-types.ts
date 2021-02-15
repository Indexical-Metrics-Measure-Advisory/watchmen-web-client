import { PipelineStageUnit } from './pipeline-stage-unit-types';
import { Conditional } from './pipeline-super-types';

export interface PipelineStage extends Conditional {
	name: string;
	units: Array<PipelineStageUnit>;
}
