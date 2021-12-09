import {PipelineStage} from '@/services/data/tuples/pipeline-stage-types';
import {
	PipelineStageUnitAction
} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {PipelineStageUnit} from '@/services/data/tuples/pipeline-stage-unit-types';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {Topic} from '@/services/data/tuples/topic-types';

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