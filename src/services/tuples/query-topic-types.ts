import {Topic} from './topic-types';
import {QueryTuple, QueryTupleForHolder} from './tuple-types';

export interface QueryTopic extends Pick<Topic, 'topicId' | 'name' | 'type' | 'description'>, QueryTuple {
	factorCount: number;
	reportCount: number;
	groupCount: number;
	spaceCount: number;
}

export interface QueryTopicForHolder extends Pick<Topic, 'topicId' | 'name'>, QueryTupleForHolder {
}