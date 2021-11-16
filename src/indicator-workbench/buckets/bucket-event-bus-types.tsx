import {Bucket} from '@/services/data/tuples/bucket-types';

export enum BucketEventTypes {
	BUCKET_NAME_CHANGED = 'bucket-name-changed',
	BUCKET_TYPE_CHANGED = 'bucket-type-changed',
	BUCKET_DESCRIPTION_CHANGED = 'bucket-description-changed',
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
}