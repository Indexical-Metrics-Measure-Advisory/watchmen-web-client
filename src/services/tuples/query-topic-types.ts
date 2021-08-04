import {Topic} from './topic-types';
import {QueryTuple, QueryTupleForHolder} from './tuple-types';

export interface QueryTopic extends Pick<Topic, 'topicId' | 'name' | 'type' | 'description' | 'createTime' | 'lastModifyTime'>, QueryTuple {
}

export interface QueryTopicForHolder extends Pick<Topic, 'topicId' | 'name'>, QueryTupleForHolder {
}