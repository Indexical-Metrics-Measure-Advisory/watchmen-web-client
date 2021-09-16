import {DataQualityCacheData} from '@/local-persist/types';
import {
	MappedTopicsMap,
	PipelineRelationMap,
	PipelinesMap,
	TopicRelationMap
} from '@/services/pipeline/pipeline-relations';

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
