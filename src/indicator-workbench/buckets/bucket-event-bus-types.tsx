import {Bucket, NumericSegment, NumericSegmentsHolder} from '@/services/data/tuples/bucket-types';

export enum BucketEventTypes {
	BUCKET_NAME_CHANGED = 'bucket-name-changed',
	BUCKET_TYPE_CHANGED = 'bucket-type-changed',
	BUCKET_DESCRIPTION_CHANGED = 'bucket-description-changed',

	BUCKET_RANGE_INCLUDE_CHANGED = 'bucket-range-include-changed',

	NUMERIC_SEGMENT_ADDED = 'numeric-segment-added',
	NUMERIC_SEGMENT_CHANGED = 'numeric-segment-changed',
	NUMERIC_SEGMENT_REMOVED = 'numeric-segment-removed',
	NUMERIC_SEGMENT_SORTED = 'numeric-segment-sorted',
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

	fire(type: BucketEventTypes.NUMERIC_SEGMENT_ADDED, holder: NumericSegmentsHolder, segment: NumericSegment): this;
	on(type: BucketEventTypes.NUMERIC_SEGMENT_ADDED, listener: (holder: NumericSegmentsHolder, segment: NumericSegment) => void): this;
	off(type: BucketEventTypes.NUMERIC_SEGMENT_ADDED, listener: (holder: NumericSegmentsHolder, segment: NumericSegment) => void): this;

	fire(type: BucketEventTypes.NUMERIC_SEGMENT_CHANGED, holder: NumericSegmentsHolder, segment: NumericSegment): this;
	on(type: BucketEventTypes.NUMERIC_SEGMENT_CHANGED, listener: (holder: NumericSegmentsHolder, segment: NumericSegment) => void): this;
	off(type: BucketEventTypes.NUMERIC_SEGMENT_CHANGED, listener: (holder: NumericSegmentsHolder, segment: NumericSegment) => void): this;

	fire(type: BucketEventTypes.NUMERIC_SEGMENT_REMOVED, holder: NumericSegmentsHolder, segment: NumericSegment): this;
	on(type: BucketEventTypes.NUMERIC_SEGMENT_REMOVED, listener: (holder: NumericSegmentsHolder, segment: NumericSegment) => void): this;
	off(type: BucketEventTypes.NUMERIC_SEGMENT_REMOVED, listener: (holder: NumericSegmentsHolder, segment: NumericSegment) => void): this;

	fire(type: BucketEventTypes.NUMERIC_SEGMENT_SORTED, holder: NumericSegmentsHolder): this;
	on(type: BucketEventTypes.NUMERIC_SEGMENT_SORTED, listener: (holder: NumericSegmentsHolder) => void): this;
	off(type: BucketEventTypes.NUMERIC_SEGMENT_SORTED, listener: (holder: NumericSegmentsHolder) => void): this;
}