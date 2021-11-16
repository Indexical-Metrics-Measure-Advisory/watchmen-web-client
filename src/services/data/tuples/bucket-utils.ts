import {Bucket, BucketType, NumericValueBucket, RangeBucketValueIncluding} from './bucket-types';

export const isNumericValueBucket = (bucket: Bucket): bucket is NumericValueBucket => {
	return bucket.type === BucketType.VALUE;
};

export const defendNumericValueBucket = (bucket: NumericValueBucket) => {
	bucket.include = bucket.include ?? RangeBucketValueIncluding.INCLUDE_MIN;
	bucket.segments = bucket.segments ?? [];
};