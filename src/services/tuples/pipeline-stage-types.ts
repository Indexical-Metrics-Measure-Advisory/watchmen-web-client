import { ParameterJoint } from './factor-calculator-types';
import { PipelineStageUnit } from './pipeline-stage-unit-types';

export interface PipelineStage {
	name: string;
	conditional: boolean;
	on?: ParameterJoint;
	units: Array<PipelineStageUnit>;
}
