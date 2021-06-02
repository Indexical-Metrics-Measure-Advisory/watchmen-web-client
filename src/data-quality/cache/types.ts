import {DataQualityCacheData} from '../../local-persist/types';
import {Pipeline} from '../../services/tuples/pipeline-types';
import {Topic} from '../../services/tuples/topic-types';
import {Factor} from '../../services/tuples/factor-types';

export type FactorsMap = { [key in string]: Factor };
export type MappedTopic = { topic: Topic; factors: FactorsMap };
export type TopicsMap = { [key in string]: MappedTopic };
export type PipelinesMap = { [key in string]: Pipeline };

export interface DQCMaps {
	topics: TopicsMap;
	pipelines: PipelinesMap;
}

export interface RelevantTopic {
	topic: Topic;
	factors: Array<Factor>;
}

export interface PipelineRelation {
	pipeline: Pipeline;
	trigger?: RelevantTopic;
	incoming: Array<RelevantTopic>;
	outgoing: Array<RelevantTopic>;
}

export type PipelineRelationMap = { [key in string]: PipelineRelation }

export interface TopicRelation {
	topic: Topic;
	trigger: Array<Pipeline>;
	readMe: Array<Pipeline>;
	writeMe: Array<Pipeline>;
}

export type TopicRelationMap = { [key in string]: TopicRelation };

export interface DQCRelations {
	pipelines: PipelineRelationMap;
	topics: TopicRelationMap;
}

export interface DQCCacheData extends DataQualityCacheData {
	relations: DQCRelations;
	maps: DQCMaps;
}
