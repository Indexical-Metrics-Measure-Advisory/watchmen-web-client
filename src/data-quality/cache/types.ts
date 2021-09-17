import {
	MappedTopicsMap,
	PipelineRelationMap,
	PipelinesMap,
	TopicRelationMap
} from '@/services/data/pipeline/pipeline-relations';
import {DataQualityCacheData} from '@/services/local-persist/types';

export interface DQCMaps {
	topics: MappedTopicsMap;
	pipelines: PipelinesMap;
}

export interface DQCRelations {
	pipelines: PipelineRelationMap;
	topics: TopicRelationMap;
}

export interface DQCCacheData extends DataQualityCacheData {
	relations: DQCRelations;
	maps: DQCMaps;
}
