import {Pipeline} from '@/services/tuples/pipeline-types';
import {Topic} from '@/services/tuples/topic-types';
import {PipelineStage} from '@/services/tuples/pipeline-stage-types';
import {PipelineStageUnit} from '@/services/tuples/pipeline-stage-unit-types';
import {PipelineStageUnitAction} from '@/services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';

export const getPipelineName = (pipeline: Pipeline): string => {
	return pipeline.name || `Noname Pipeline (#${pipeline.pipelineId})`;
};

export const getStageName = (stage: PipelineStage): string => {
	return stage.name || `Noname Stage (#${stage.stageId})`;
};

export const getUnitName = (unit: PipelineStageUnit): string => {
	return unit.name || `Noname Unit (#${unit.unitId})`;
};

export const getActionType = (action: PipelineStageUnitAction): string => {
	return action.type;
};

export const getTopicName = (topic: Topic): string => {
	return topic.name || `Noname Topic (#${topic.topicId})`;
};