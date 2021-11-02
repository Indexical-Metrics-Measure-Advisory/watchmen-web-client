import {PipelineStageUnitAction} from './pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {Conditional} from './pipeline-super-types';

export type PipelineStageUnitId = string;

export interface PipelineStageUnit extends Conditional {
	unitId: PipelineStageUnitId;
	name: string;
	/** all actions in this unit can be looped inside */
	loopVariableName?: string;
	do: Array<PipelineStageUnitAction>;
}
