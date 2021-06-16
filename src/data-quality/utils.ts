import {Pipeline} from '../services/tuples/pipeline-types';
import {Topic} from '../services/tuples/topic-types';

export const getPipelineName = (pipeline: Pipeline): string => {
	return (pipeline.name || 'Noname Pipeline') + ` #${pipeline.pipelineId}`;
};

export const getTopicName = (topic: Topic): string => {
	return (topic.name || 'Noname Topic') + ` #${topic.topicId}`;
};