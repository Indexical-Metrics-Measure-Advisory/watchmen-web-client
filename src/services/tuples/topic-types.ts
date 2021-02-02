import { Factor } from './factor-types';
import { Tuple } from './tuple-types';

export enum TopicType {
	SYSTEM = 'system',
	RAW = 'raw',
	DISTINCT = 'distinct',
	AGGREGATE = 'aggregate',
	TIME = 'time',
	RATIO = 'ratio'
}

export interface Topic extends Tuple {
	topicId: string;
	name: string;
	type: TopicType;
	description?: string;
	factors: Array<Factor>;
}
