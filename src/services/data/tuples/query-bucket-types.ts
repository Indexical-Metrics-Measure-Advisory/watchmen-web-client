import {Bucket, EnumMeasureBucket, MeasureBucket} from './bucket-types';
import {EnumId} from './enum-types';
import {MeasureMethod} from './indicator-types';
import {QueryTuple} from './tuple-types';

type BucketProperties = 'bucketId' | 'name' | 'type' | 'description' | 'createTime' | 'lastModified';
type MeasureBucketProperties = BucketProperties | 'measure';
type EnumBucketProperties = MeasureBucketProperties | 'enumId';

export type QueryMeasureBucket = Pick<MeasureBucket, MeasureBucketProperties>;
export type QueryEnumMeasureBucket = Pick<EnumMeasureBucket, EnumBucketProperties>
export type QueryBucket = (Pick<Bucket, BucketProperties> | QueryMeasureBucket | QueryEnumMeasureBucket) & QueryTuple

export type QueryByMeasureMethod = { method: Omit<MeasureMethod, MeasureMethod.ENUM> };
export type QueryByEnumMethod = { method: MeasureMethod.ENUM, enumId: EnumId };

export type QueryByBucketMethod = QueryByMeasureMethod | QueryByEnumMethod;
    