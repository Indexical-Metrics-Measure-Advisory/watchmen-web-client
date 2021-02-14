import { Parameter } from '../factor-calculator-types';
import {
	FindBy,
	PipelineStageUnitAction,
	ToFactor,
	ToTopic,
	WriteTopicActionType
} from './pipeline-stage-unit-action-types';

export enum NumericArithmetic {
	PERCENTAGE = 'percentage',
	ABSOLUTE_VALUE = 'abs',
	LOGARITHM = 'log',
}

export enum AggregateArithmetic {
	COUNT = 'count',
	SUM = 'sum',
	AVG = 'avg',
	MAX = 'max',
	MIN = 'min',
	MEDIAN = 'med'
}

export type ValueArithmetic = NumericArithmetic | AggregateArithmetic;

export interface MappingFactor {
	source: Parameter;
	factorId: string;
	arithmetic?: ValueArithmetic;
}

export interface MappingRow {
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

export interface WriteFactorAction extends ToFactor, WriteTopicAction, FindBy {
	type: WriteTopicActionType.WRITE_FACTOR;
	source: Parameter;
	arithmetic?: ValueArithmetic;
}
