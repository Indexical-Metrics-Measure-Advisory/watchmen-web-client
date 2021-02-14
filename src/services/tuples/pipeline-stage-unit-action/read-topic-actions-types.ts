import { FindBy, FromFactor, FromTopic, MemoryWriter, ReadTopicActionType } from './pipeline-stage-unit-action-types';

export interface ReadRowAction extends FromTopic, MemoryWriter, FindBy {
	type: ReadTopicActionType.READ_ROW;
}

export interface ReadFactorAction extends FromFactor, MemoryWriter, FindBy {
	type: ReadTopicActionType.READ_FACTOR;
}

export interface ExistsAction extends FromTopic, MemoryWriter, FindBy {
	type: ReadTopicActionType.EXISTS;
}
