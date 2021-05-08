import {Factor} from './factor-types';
import {Tuple} from './tuple-types';

export enum TopicKind {
    SYSTEM = 'system',
    BUSINESS = 'business'
}

export enum TopicType {
    RAW = 'raw',
    DISTINCT = 'distinct',
    AGGREGATE = 'aggregate',
    TIME = 'time',
    RATIO = 'ratio'
}

export interface Topic extends Tuple {
    topicId: string;
    name: string;
    kind: TopicKind;
    type: TopicType;
    description?: string;
    factors: Array<Factor>;
}
