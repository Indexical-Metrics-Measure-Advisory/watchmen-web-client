import { Parameter, ParameterJoint } from '../factor-calculator-types';
import { MemoryWriter, PipelineStageUnitAction, SystemActionType } from './pipeline-stage-unit-action-types';

export enum AlarmActionSeverity {
	LOW = 'low',
	MEDIUM = 'medium',
	HIGH = 'high',
	CRITICAL = 'critical',
}

export interface AlarmAction extends PipelineStageUnitAction {
	type: SystemActionType.ALARM;
	conditional: boolean;
	on?: ParameterJoint;
	severity: AlarmActionSeverity;
	message: string;
}

/** copy something to memory variable */
export interface CopyToMemoryAction extends PipelineStageUnitAction, MemoryWriter {
	type: SystemActionType.COPY_TO_MEMORY;
	source: Parameter;
}
