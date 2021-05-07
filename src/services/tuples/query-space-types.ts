import {Space} from './space-types';
import {QueryTuple, QueryTupleForHolder} from './tuple-types';

export interface QuerySpace extends Pick<Space, 'spaceId' | 'name' | 'description'>, QueryTuple {
    topicCount: number;
    reportCount: number;
    groupCount: number;
    connectionCount: number;
}

export interface QuerySpaceForHolder extends Pick<Space, 'spaceId' | 'name'>, QueryTupleForHolder {
}