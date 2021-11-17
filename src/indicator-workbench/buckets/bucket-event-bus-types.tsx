import {Bucket, BucketSegment} from '@/services/data/tuples/bucket-types';

export enum BucketEventTypes {
	BUCKET_NAME_CHANGED = 'bucket-name-changed',
	BUCKET_TYPE_CHANGED = 'bucket-type-changed',
	BUCKET_DESCRIPTION_CHANGED = 'bucket-description-changed',

	BUCKET_RANGE_INCLUDE_CHANGED = 'bucket-range-include-changed',

	SEGMENT_NAME_CHANGED = 'segment-name-changed',

	SEGMENT_ADDED = 'segment-added',
	SEGMENT_CHANGED = 'segment-changed',
	SEGMENT_REMOVED = 'segment-removed',
	SEGMENT_SORTED = 'segment-sorted',

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

	fire(type: BucketEventTypes.SEGMENT_ADDED, bucket: Bucket, segment: BucketSegment): this;
	on(type: BucketEventTypes.SEGMENT_ADDED, listener: (bucket: Bucket, segment: BucketSegment) => void): this;
	off(type: BucketEventTypes.SEGMENT_ADDED, listener: (bucket: Bucket, segment: BucketSegment) => void): this;

	fire(type: BucketEventTypes.SEGMENT_CHANGED, bucket: Bucket, segment: BucketSegment): this;
	on(type: BucketEventTypes.SEGMENT_CHANGED, listener: (bucket: Bucket, segment: BucketSegment) => void): this;
	off(type: BucketEventTypes.SEGMENT_CHANGED, listener: (bucket: Bucket, segment: BucketSegment) => void): this;

	fire(type: BucketEventTypes.SEGMENT_REMOVED, bucket: Bucket, segment: BucketSegment): this;
	on(type: BucketEventTypes.SEGMENT_REMOVED, listener: (bucket: Bucket, segment: BucketSegment) => void): this;
	off(type: BucketEventTypes.SEGMENT_REMOVED, listener: (bucket: Bucket, segment: BucketSegment) => void): this;

	fire(type: BucketEventTypes.SEGMENT_SORTED, bucket: Bucket): this;
	on(type: BucketEventTypes.SEGMENT_SORTED, listener: (bucket: Bucket) => void): this;
	off(type: BucketEventTypes.SEGMENT_SORTED, listener: (bucket: Bucket) => void): this;

	fire(type: BucketEventTypes.BUCKET_MEASURE_METHOD_CHANGED, bucket: Bucket): this;
	on(type: BucketEventTypes.BUCKET_MEASURE_METHOD_CHANGED, listener: (bucket: Bucket) => void): this;
	off(type: BucketEventTypes.BUCKET_MEASURE_METHOD_CHANGED, listener: (bucket: Bucket) => void): this;
}