export enum BucketsEventTypes {
	VALUE_BUCKET_DELETED = 'value-bucket-deleted'
}

export interface BucketsEventBus {
	fire(type: BucketsEventTypes.VALUE_BUCKET_DELETED): this;
	on(type: BucketsEventTypes.VALUE_BUCKET_DELETED, listener: () => void): this;
	off(type: BucketsEventTypes.VALUE_BUCKET_DELETED, listener: () => void): this;
}