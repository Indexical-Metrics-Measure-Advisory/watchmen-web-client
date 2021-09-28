import {
	PipelineStageUnitAction,
	ReadTopicActionType,
	SystemActionType,
	WriteTopicActionType
} from './pipeline-stage-unit-action-types';
import {
	ExistsAction,
	ReadFactorAction,
	ReadFactorsAction,
	ReadRowAction,
	ReadRowsAction,
	ReadTopicAction
} from './read-topic-actions-types';
import {AlarmAction, CopyToMemoryAction, WriteToExternalAction} from './system-actions-types';
import {InsertRowAction, MergeRowAction, WriteFactorAction, WriteTopicAction} from './write-topic-actions-types';

export const isWriteTopicAction = (action: PipelineStageUnitAction): action is WriteTopicAction => {
	return isMergeRowAction(action) || isInsertRowAction(action) || isWriteFactorAction(action);
};

export const isAlarmAction = (action: PipelineStageUnitAction): action is AlarmAction => {
	return action.type === SystemActionType.ALARM;
};
export const isCopyToMemoryAction = (action: PipelineStageUnitAction): action is CopyToMemoryAction => {
	return action.type === SystemActionType.COPY_TO_MEMORY;
};
export const isWriteToExternalAction = (action: PipelineStageUnitAction): action is WriteToExternalAction => {
	return action.type === SystemActionType.WRITE_TO_EXTERNAL;
};

export const isReadTopicAction = (action: PipelineStageUnitAction): action is ReadTopicAction => {
	return isExistsAction(action) || isReadFactorAction(action) || isReadFactorsAction(action)
		|| isReadRowAction(action) || isReadRowsAction(action);
};
export const isExistsAction = (action: PipelineStageUnitAction): action is ExistsAction => {
	return action.type === ReadTopicActionType.EXISTS;
};
export const isReadFactorAction = (action: PipelineStageUnitAction): action is ReadFactorAction => {
	return action.type === ReadTopicActionType.READ_FACTOR;
};
export const isReadFactorsAction = (action: PipelineStageUnitAction): action is ReadFactorsAction => {
	return action.type === ReadTopicActionType.READ_FACTORS;
};
export const isReadRowAction = (action: PipelineStageUnitAction): action is ReadRowAction => {
	return action.type === ReadTopicActionType.READ_ROW;
};
export const isReadRowsAction = (action: PipelineStageUnitAction): action is ReadRowsAction => {
	return action.type === ReadTopicActionType.READ_ROWS;
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