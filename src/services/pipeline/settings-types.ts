import { Pipeline } from '../tuples/pipeline-types';
import { Topic } from '../tuples/topic-types';

export interface PipelinesSettings {
	pipelines: Array<Pipeline>;
	topics: Array<Topic>;
}