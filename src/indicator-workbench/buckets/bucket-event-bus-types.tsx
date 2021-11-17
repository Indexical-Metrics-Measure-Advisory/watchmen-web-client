import {Bucket, NumericValueSegment, NumericSegmentsHolder, BucketSegment} from '@/services/data/tuples/bucket-types';

export enum BucketEventTypes {
	BUCKET_NAME_CHANGED = 'bucket-name-changed',
	BUCKET_TYPE_CHANGED = 'bucket-type-changed',
	BUCKET_DESCRIPTION_CHANGED = 'bucket-description-changed',

	BUCKET_RANGE_INCLUDE_CHANGED = 'bucket-range-include-changed',

	SEGMENT_NAME_CHANGED = 'segment-name-changed',

	NUMERIC_SEGMENT_ADDED = 'numeric-segment-added',
	NUMERIC_SEGMENT_CHANGED = 'numeric-segment-changed',
	NUMERIC_SEGMENT_REMOVED = 'numeric-segment-removed',
	NUMERIC_SEGMENT_SORTED = 'numeric-segment-sorted',

	BUCKET_MEASURE_METHOD_CHANGED = 'bucket-measure-method-changed'
}

export interface BucketEventBus {
	fire(type: BucketEventTypes.BUCKET_NAME_CHANGED, bucket: Bucket): this;
	on(type: BucketEventTypes.BUCKET_NAME_CHANGED, listener: (bucket: Bucket) => void): this;
	off(type: BucketEventTypes.BUCKET_NAME_CHANGED, listener: (bucket: Bucket) => void): this;

	fire(type: BucketEventTypes.BUCKET_TYPE_CHANGED, bucket: Bucket): this;
	on(type: BucketEventTypes.BUCKET_TYPE_CHANGED, listener: (bucket: Bucket) => void): this;
	off(type: BucketEventTypes.BUCKET_TYPE_CHANGED, listener: (bucket: Bucket) => void): this;

	fire(type: BucketEventTypes.BUCKET_DESCRIPTION_CHANGED, bucket: Bucket): this;
	on(type: BucketEventTypes.BUCKET_DESCRIPTION_CHANGED, listener: (bucket: Bucket) => void): this;
	off(type: BucketEventTypes.BUCKET_DESCRIPTION_CHANGED, listener: (bucket: Bucket) => void): this;

	fire(type: BucketEventTypes.BUCKET_RANGE_INCLUDE_CHANGED, bucket: Bucket): this;
	on(type: BucketEventTypes.BUCKET_RANGE_INCLUDE_CHANGED, listener: (bucket: Bucket) => void): this;
	off(type: BucketEventTypes.BUCKET_RANGE_INCLUDE_CHANGED, listener: (bucket: Bucket) => void): this;

	fire(type: BucketEventTypes.SEGMENT_NAME_CHANGED, bucket: Bucket, segment: BucketSegment): this;
	on(type: BucketEventTypes.SEGMENT_NAME_CHANGED, listener: (bucket: Bucket, segment: BucketSegment) => void): this;
	off(type: BucketEventTypes.SEGMENT_NAME_CHANGED, listener: (bucket: Bucket, segment: BucketSegment) => void): this;

	fire(type: BucketEventTypes.NUMERIC_SEGMENT_ADDED, holder: NumericSegmentsHolder, segment: NumericValueSegment): this;
	on(type: BucketEventTypes.NUMERIC_SEGMENT_ADDED, listener: (holder: NumericSegmentsHolder, segment: NumericValueSegment) => void): this;
	off(type: BucketEventTypes.NUMERIC_SEGMENT_ADDED, listener: (holder: NumericSegmentsHolder, segment: NumericValueSegment) => void): this;

	fire(type: BucketEventTypes.NUMERIC_SEGMENT_CHANGED, holder: NumericSegmentsHolder, segment: NumericValueSegment): this;
	on(type: BucketEventTypes.NUMERIC_SEGMENT_CHANGED, listener: (holder: NumericSegmentsHolder, segment: NumericValueSegment) => void): this;
	off(type: BucketEventTypes.NUMERIC_SEGMENT_CHANGED, listener: (holder: NumericSegmentsHolder, segment: NumericValueSegment) => void): this;

	fire(type: BucketEventTypes.NUMERIC_SEGMENT_REMOVED, holder: NumericSegmentsHolder, segment: NumericValueSegment): this;
	on(type: BucketEventTypes.NUMERIC_SEGMENT_REMOVED, listener: (holder: NumericSegmentsHolder, segment: NumericValueSegment) => void): this;
	off(type: BucketEventTypes.NUMERIC_SEGMENT_REMOVED, listener: (holder: NumericSegmentsHolder, segment: NumericValueSegment) => void): this;

	fire(type: BucketEventTypes.NUMERIC_SEGMENT_SORTED, holder: NumericSegmentsHolder): this;
	on(type: BucketEventTypes.NUMERIC_SEGMENT_SORTED, listener: (holder: NumericSegmentsHolder) => void): this;
	off(type: BucketEventTypes.NUMERIC_SEGMENT_SORTED, listener: (holder: NumericSegmentsHolder) => void): this;

	fire(type: BucketEventTypes.BUCKET_MEASURE_METHOD_CHANGED, bucket: Bucket): this;
	on(type: BucketEventTypes.BUCKET_MEASURE_METHOD_CHANGED, listener: (bucket: Bucket) => void): this;
	off(type: BucketEventTypes.BUCKET_MEASURE_METHOD_CHANGED, listener: (bucket: Bucket) => void): this;
}