import {Space} from './space-types';
import {QueryTuple, QueryTupleForHolder} from './tuple-types';

export interface QuerySpace extends Pick<Space, 'spaceId' | 'name' | 'description' | 'createTime' | 'lastModified'>, QueryTuple {
}

export interface QuerySpaceForHolder extends Pick<Space, 'spaceId' | 'name'>, QueryTupleForHolder {
}