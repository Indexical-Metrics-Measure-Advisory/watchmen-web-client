import {
	FindBy,
	FromFactor,
	FromTopic,
	MemoryWriter,
	PipelineStageUnitAction,
	ReadTopicActionType
} from './pipeline-stage-unit-action-types';
import {AggregateArithmeticHolder} from './write-topic-actions-types';

export interface ReadTopicAction extends FromTopic, MemoryWriter, FindBy, PipelineStageUnitAction {
	type: ReadTopicActionType;
}

export interface ReadRowAction extends ReadTopicAction {
	type: ReadTopicActionType.READ_ROW;
}

export interface ReadRowsAction extends ReadTopicAction {
	type: ReadTopicActionType.READ_ROWS;
}

export interface ReadFactorAction extends FromFactor, ReadTopicAction, AggregateArithmeticHolder {
	type: ReadTopicActionType.READ_FACTOR;
}

export interface ReadFactorsAction extends FromFactor, ReadTopicAction {
	type: ReadTopicActionType.READ_FACTORS;
}

export interface ExistsAction extends ReadTopicAction {
	type: ReadTopicActionType.EXISTS;
}
