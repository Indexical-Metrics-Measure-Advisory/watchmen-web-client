import {
	PipelineStageUnitAction,
	ReadTopicActionType,
	SystemActionType,
	WriteTopicActionType
} from './pipeline-stage-unit-action-types';
import { ExistsAction, ReadFactorAction, ReadRowAction } from './read-topic-actions-types';
import { AlarmAction, CopyToMemoryAction } from './system-actions-types';
import { InsertRowAction, MergeRowAction, WriteFactorAction, WriteTopicAction } from './write-topic-actions-types';

export const isWriteTopicAction = (action: PipelineStageUnitAction): action is WriteTopicAction => {
	return isMergeRowAction(action) || isInsertRowAction(action) || isWriteFactorAction(action);
};

export const isAlarmAction = (action: PipelineStageUnitAction): action is AlarmAction => {
	return action.type === SystemActionType.ALARM;
};
export const isCopyToMemoryAction = (action: PipelineStageUnitAction): action is CopyToMemoryAction => {
	return action.type === SystemActionType.COPY_TO_MEMORY;
};

export const isExistsAction = (action: PipelineStageUnitAction): action is ExistsAction => {
	return action.type === ReadTopicActionType.EXISTS;
};
export const isReadFactorAction = (action: PipelineStageUnitAction): action is ReadFactorAction => {
	return action.type === ReadTopicActionType.READ_FACTOR;
};
export const isReadRowAction = (action: PipelineStageUnitAction): action is ReadRowAction => {
	return action.type === ReadTopicActionType.READ_ROW;
};

export const isMergeRowAction = (action: PipelineStageUnitAction): action is MergeRowAction => {
	return action.type === WriteTopicActionType.INSERT_OR_MERGE_ROW
		|| action.type === WriteTopicActionType.MERGE_ROW;
};
export const isInsertRowAction = (action: PipelineStageUnitAction): action is InsertRowAction => {
	return action.type === WriteTopicActionType.INSERT_ROW;
};
export const isWriteFactorAction = (action: PipelineStageUnitAction): action is WriteFactorAction => {
	return action.type === WriteTopicActionType.WRITE_FACTOR;
};