import {DataSource} from '../data/tuples/data-source-types';
import {ExternalWriter} from '../data/tuples/external-writer-types';
import {Pipeline, PipelinesGraphics} from '../data/tuples/pipeline-types';
import {Topic} from '../data/tuples/topic-types';

export interface AdminCacheData {
	pipelines: Array<Pipeline>;
	topics: Array<Topic>;
	graphics: Array<PipelinesGraphics>;
	dataSources: Array<DataSource>;
	externalWriters: Array<ExternalWriter>;
}

export interface DataQualityCacheData {
	pipelines: Array<Pipeline>;
	topics: Array<Topic>;
}