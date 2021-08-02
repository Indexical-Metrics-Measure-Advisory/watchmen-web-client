import {DataQualityCacheData} from '../../local-persist/types';
import {
	PipelineRelationMap,
	PipelinesMap,
	TopicRelationMap,
	TopicsMap
} from '../../services/pipeline/pipeline-relations';

export interface DQCMaps {
	topics: TopicsMap;
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
