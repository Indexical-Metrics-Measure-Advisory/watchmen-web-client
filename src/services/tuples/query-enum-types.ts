import {Enum} from './enum-types';
import {QueryTuple, QueryTupleForHolder} from './tuple-types';

export interface QueryEnum extends Pick<Enum, 'enumId' | 'name' | 'description'>, QueryTuple {
	topicCount: number;
	enumCount: number;
}

export interface QueryEnumForHolder extends Pick<Enum, 'enumId' | 'name'>, QueryTupleForHolder {
}