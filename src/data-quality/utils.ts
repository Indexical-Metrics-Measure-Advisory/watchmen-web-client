import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {Topic} from '@/services/data/tuples/topic-types';

export const getPipelineName = (pipeline: Pipeline): string => {
	return (pipeline.name || 'Noname Pipeline') + ` #${pipeline.pipelineId}`;
};

export const getTopicName = (topic: Topic): string => {
	return (topic.name || 'Noname Topic') + ` #${topic.topicId}`;
};