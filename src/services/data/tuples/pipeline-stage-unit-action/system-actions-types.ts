import {Parameter} from '../factor-calculator-types';
import {Conditional} from '../pipeline-super-types';
import {MemoryWriter, PipelineStageUnitAction, SystemActionType} from './pipeline-stage-unit-action-types';

export enum AlarmActionSeverity {
	LOW = 'low',
	MEDIUM = 'medium',
	HIGH = 'high',
	CRITICAL = 'critical',
}

export interface AlarmAction extends PipelineStageUnitAction, Conditional {
	type: SystemActionType.ALARM;
	severity: AlarmActionSeverity;
	message: string;
}

/** copy something to memory variable */
export interface CopyToMemoryAction extends PipelineStageUnitAction, MemoryWriter {
	type: SystemActionType.COPY_TO_MEMORY;
	source: Parameter;
}

export interface WriteToExternalAction extends PipelineStageUnitAction {
	type: SystemActionType.WRITE_TO_EXTERNAL;
	externalWriterId: string;
	eventCode?: string;
}
