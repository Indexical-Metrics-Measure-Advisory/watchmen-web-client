import { PipelineStageUnitAction, WriteTopicActionType } from './pipeline-stage-unit-action-types';
import { WriteTopicAction } from './write-topic-actions-types';

export const isWriteTopicAction = (action: PipelineStageUnitAction): action is WriteTopicAction => {
	return WriteTopicActionType.INSERT_OR_MERGE_ROW === action.type
		|| WriteTopicActionType.INSERT_ROW === action.type
		|| WriteTopicActionType.MERGE_ROW === action.type
		|| WriteTopicActionType.WRITE_FACTOR === action.type;
};
