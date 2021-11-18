import {
	Bucket,
	BucketType,
	CategoryMeasureBucket,
	CategorySegmentsHolder,
	EnumMeasureBucket,
	MeasureBucket,
	NumericSegmentsHolder,
	NumericValueBucket,
	NumericValueMeasureBucket,
	RangeBucketValueIncluding
} from './bucket-types';
import {MeasureMethod} from './indicator-types';

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

export const isNumericSegmentsHolder = (bucket: Bucket): bucket is NumericSegmentsHolder => {
	return isNumericValueBucket(bucket) || isNumericValueMeasureBucket(bucket);
};

export const isCategorySegmentsHolder = (bucket: Bucket): bucket is CategorySegmentsHolder => {
	return isCategoryMeasureBucket(bucket) || isEnumMeasureBucket(bucket);
};

export const defendNumericValueSegmentsHolder = (holder: NumericSegmentsHolder) => {
	holder.include = holder.include ?? RangeBucketValueIncluding.INCLUDE_MIN;
	holder.segments = [
		{name: '', value: {max: '0'}},
		{name: '', value: {min: '0'}}
	];
};

export const defendNumericValueMeasureBucket = (bucket: NumericValueMeasureBucket) => {
	// @ts-ignore
	delete bucket.measure;
	defendNumericValueSegmentsHolder(bucket);
};

export const defendCategoryMeasureBucket = (bucket: CategoryMeasureBucket) => {
	// @ts-ignore
	delete bucket.measure;
	bucket.segments = [];
};

export const defendEnumMeasureBucket = (bucket: EnumMeasureBucket) => {
	bucket.measure = MeasureMethod.ENUM;
	bucket.segments = [];
};
