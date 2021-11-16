import {EnumId} from '@/services/data/tuples/enum-types';
import {MeasureMethod} from '@/services/data/tuples/indicator-types';
import {TenantId} from '@/services/data/tuples/tenant-types';
import {Tuple} from '@/services/data/tuples/tuple-types';

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

export interface NumericValueBucket extends Bucket {
	type: BucketType.VALUE;
	include: RangeBucketValueIncluding;
	segments: Array<[null | undefined, number] | [number, number] | [number, null | undefined]>;
}

export interface MeasureBucket extends Bucket {
	type: BucketType.MEASURE;
	measure: MeasureMethod;
}

export interface NumericValueMeasureBucket extends MeasureBucket {
	include: RangeBucketValueIncluding;
	segments: Array<[null | undefined, number] | [number, number] | [number, null | undefined]>;
}

export interface CategoryMeasureBucket extends MeasureBucket {
	segments: Array<Array<string> | 'other'>;
}

export interface EnumMeasureBucket extends MeasureBucket {
	enumId: EnumId;
	segments: Array<Array<string> | 'other'>;
}