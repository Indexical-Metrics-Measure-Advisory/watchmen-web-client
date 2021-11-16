import {Bucket} from '@/services/data/tuples/bucket-types';
import {QueryTuple} from '@/services/data/tuples/tuple-types';

export interface QueryBucket extends Pick<Bucket, 'bucketId' | 'name' | 'type' | 'description' | 'createTime' | 'lastModified'>, QueryTuple {
}