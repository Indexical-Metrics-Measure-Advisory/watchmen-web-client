import {
	Bucket,
	BucketType,
	CategoryMeasureBucket,
	EnumMeasureBucket,
	MeasureBucket,
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

export const isCategoryMeasureBucket = (bucket: Bucket): bucket is CategoryMeasureBucket => {
	return bucket.type === BucketType.CATEGORY_MEASURE;
};

export const isEnumMeasureBucket = (bucket: Bucket): bucket is EnumMeasureBucket => {
	return bucket.type === BucketType.ENUM_MEASURE;
};

export const isMeasureBucket = (bucket: Bucket): bucket is MeasureBucket => {
	return isNumericValueMeasureBucket(bucket) || isCategoryMeasureBucket(bucket) || isEnumMeasureBucket(bucket);
};

export const defendNumericValueSegmentsHolder = (holder: NumericSegmentsHolder) => {
	holder.include = holder.include ?? RangeBucketValueIncluding.INCLUDE_MIN;
	holder.segments = holder.segments ?? [];
};
