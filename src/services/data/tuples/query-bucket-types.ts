import {Bucket} from './bucket-types';
import {QueryTuple} from './tuple-types';

export interface QueryBucket extends Pick<Bucket, 'bucketId' | 'name' | 'type' | 'description' | 'createTime' | 'lastModified'>, QueryTuple {
}