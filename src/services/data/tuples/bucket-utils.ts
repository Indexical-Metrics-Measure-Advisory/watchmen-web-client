import {
	Bucket,
	BucketType,
	NumericSegmentsHolder,
	NumericValueBucket,
	NumericValueMeasureBucket,
	RangeBucketValueIncluding
} from './bucket-types';

export const isNumericValueBucket = (bucket: Bucket): bucket is NumericValueBucket => {
	return bucket.type === BucketType.VALUE;
};

export const isNumericValueMeasureBucket = (bucket: Bucket): bucket is NumericValueMeasureBucket => {
	return bucket.type === BucketType.VALUE_MEASURE;
};

export const defendNumericValueSegmentsHolder = (holder: NumericSegmentsHolder) => {
	holder.include = holder.include ?? RangeBucketValueIncluding.INCLUDE_MIN;
	holder.segments = holder.segments ?? [];
};
