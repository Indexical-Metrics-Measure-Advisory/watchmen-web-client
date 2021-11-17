import {EnumId} from './enum-types';
import {MeasureMethod} from './indicator-types';
import {TenantId} from './tenant-types';
import {Tuple} from './tuple-types';

export type BucketId = string;

export enum BucketType {
	VALUE = 'value',
	VALUE_MEASURE = 'value-measure',
	CATEGORY_MEASURE = 'category-measure',
	ENUM_MEASURE = 'enum-measure',
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

export interface BucketSegment {
	name: string;
	value: unknown;
}

export type NumericSegmentValue =
	[null | undefined, number]
	| [number, number]
	| [number, null | undefined]
	// intermediate state
	| [null | undefined, null | undefined]

export interface NumericValueSegment extends BucketSegment {
	value: NumericSegmentValue;
}

export interface NumericSegmentsHolder extends Bucket {
	include: RangeBucketValueIncluding;
	segments: Array<NumericValueSegment>;
}

export interface NumericValueBucket extends NumericSegmentsHolder, Bucket {
	type: BucketType.VALUE;
}

export interface MeasureBucket extends Bucket {
	measure: MeasureMethod;
}

export interface NumericValueMeasureBucket extends MeasureBucket, NumericSegmentsHolder {
	type: BucketType.VALUE_MEASURE;
	measure: MeasureMethod.FLOOR | MeasureMethod.RESIDENTIAL_AREA | MeasureMethod.AGE | MeasureMethod.BIZ_SCALE;
}

export type CategorySegmentValue = Array<string>;

export interface CategorySegment extends BucketSegment {
	value: CategorySegmentValue;
}

export interface CategoryMeasureBucket extends MeasureBucket {
	type: BucketType.CATEGORY_MEASURE;
	measure: MeasureMethod.CONTINENT | MeasureMethod.REGION | MeasureMethod.COUNTRY | MeasureMethod.PROVINCE | MeasureMethod.CITY | MeasureMethod.DISTRICT
		| MeasureMethod.RESIDENCE_TYPE
		| MeasureMethod.GENDER | MeasureMethod.OCCUPATION | MeasureMethod.RELIGION | MeasureMethod.NATIONALITY
		| MeasureMethod.BIZ_TRADE
		| MeasureMethod.BOOLEAN;
	segments: Array<CategorySegment>;
}

export interface EnumMeasureBucket extends MeasureBucket {
	type: BucketType.ENUM_MEASURE;
	measure: MeasureMethod.ENUM;
	enumId: EnumId;
	segments: Array<CategorySegment>;
}