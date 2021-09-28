import {ExternalWriter} from '../data/tuples/external-writer-types';
import {Pipeline, PipelinesGraphics} from '../data/tuples/pipeline-types';
import {Topic} from '../data/tuples/topic-types';

export interface AdminCacheData {
	pipelines: Array<Pipeline>;
	topics: Array<Topic>;
	graphics: Array<PipelinesGraphics>;
	externalWriters: Array<ExternalWriter>;
}

export interface DataQualityCacheData {
	pipelines: Array<Pipeline>;
	topics: Array<Topic>;
}