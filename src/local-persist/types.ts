import {Pipeline, PipelinesGraphics} from '../services/tuples/pipeline-types';
import {Topic} from '../services/tuples/topic-types';

export interface AdminCacheData {
	pipelines: Array<Pipeline>;
	topics: Array<Topic>;
	graphics: PipelinesGraphics;
}