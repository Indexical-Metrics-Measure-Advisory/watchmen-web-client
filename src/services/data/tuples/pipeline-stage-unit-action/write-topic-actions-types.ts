import {Parameter} from '../factor-calculator-types';
import {FactorId} from '../factor-types';
import {AggregateArithmeticHolder} from './aggregate-arithmetic-types';
import {
	FindBy,
	PipelineStageUnitAction,
	ToFactor,
	ToTopic,
	WriteTopicActionType
} from './pipeline-stage-unit-action-types';

export interface MappingFactor extends AggregateArithmeticHolder {
	source: Parameter;
	factorId: FactorId;
}

export interface MappingRow extends PipelineStageUnitAction {
	mapping: Array<MappingFactor>;
}

export interface WriteTopicAction extends ToTopic, PipelineStageUnitAction {
	type: WriteTopicActionType;
}

export interface InsertRowAction extends WriteTopicAction, MappingRow {
	type: WriteTopicActionType.INSERT_ROW;
}

export interface MergeRowAction extends WriteTopicAction, MappingRow, FindBy {
	type: WriteTopicActionType.MERGE_ROW | WriteTopicActionType.INSERT_OR_MERGE_ROW;
}

export interface WriteFactorAction extends ToFactor, WriteTopicAction, FindBy, AggregateArithmeticHolder {
	type: WriteTopicActionType.WRITE_FACTOR;
	source: Parameter;
}
