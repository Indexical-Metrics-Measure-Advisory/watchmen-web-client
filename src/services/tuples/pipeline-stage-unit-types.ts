import { ParameterJoint } from './factor-calculator-types';
import { PipelineStageUnitAction } from './pipeline-stage-unit-action/pipeline-stage-unit-action-types';

export interface PipelineStageUnit {
	conditional: boolean;
	on?: ParameterJoint;
	do: Array<PipelineStageUnitAction>;
}
