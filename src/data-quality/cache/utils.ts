import {Pipeline} from '../../services/tuples/pipeline-types';
import {Topic} from '../../services/tuples/topic-types';
import {DQCCacheData} from './types';
import {
	buildPipelinesMap,
	buildPipelinesRelation,
	buildTopicsMap,
	buildTopicsRelation
} from '../../services/pipeline/pipeline-relations';

export const buildRelations = (options: {
	pipelines: Array<Pipeline>;
	topics: Array<Topic>;
}): DQCCacheData => {
	const {pipelines, topics} = options;

	const topicsMap = buildTopicsMap(topics);
	const pipelinesMap = buildPipelinesMap(pipelines);
	const pipelineRelations = buildPipelinesRelation(pipelines, topicsMap);
	const topicRelations = buildTopicsRelation(topics, pipelineRelations);

	return {
		pipelines, topics,
		maps: {pipelines: pipelinesMap, topics: topicsMap},
		relations: {pipelines: pipelineRelations, topics: topicRelations}
	};
};
