import { PipelineStageUnitAction } from './pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import { Conditional } from './pipeline-super-types';

export interface PipelineStageUnit extends Conditional {
	unitId: string;
	name: string;
	do: Array<PipelineStageUnitAction>;
}
