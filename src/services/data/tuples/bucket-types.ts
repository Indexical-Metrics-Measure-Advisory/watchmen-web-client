import {EnumId} from './enum-types';
import {MeasureMethod} from './indicator-types';
import {TenantId} from './tenant-types';
import {Tuple} from './tuple-types';

export type BucketId = string;

export enum BucketType {
	VALUE = 'value',
	MEASURE = 'measure',
	COMPOSITE = 'composite'
}

export interface Bucket extends Tuple {
	bucketId: BucketId;
	name: string;
	type: BucketType;
	description?: string;
	tenantId?: TenantId;
}

export enum RangeBucketValueIncluding {
	INCLUDE_MIN = 'include-min',
	INCLUDE_MAX = 'include-max'
}

export type NumericSegment =
	[null | undefined, number]
	| [number, number]
	| [number, null | undefined]
	// intermediate state
	| [null | undefined, null | undefined]

export interface NumericSegmentsHolder extends Bucket {
	include: RangeBucketValueIncluding;
	segments: Array<NumericSegment>;
}

export interface NumericValueBucket extends NumericSegmentsHolder, Bucket {
	type: BucketType.VALUE;
}

export interface MeasureBucket extends Bucket {
	type: BucketType.MEASURE;
	measure: MeasureMethod;
}

export interface NumericValueMeasureBucket extends MeasureBucket, NumericSegmentsHolder {
	type: BucketType.MEASURE;
}

export interface CategoryMeasureBucket extends MeasureBucket {
	segments: Array<Array<string> | 'other'>;
}

export interface EnumMeasureBucket extends MeasureBucket {
	enumId: EnumId;
	segments: Array<Array<string> | 'other'>;
}