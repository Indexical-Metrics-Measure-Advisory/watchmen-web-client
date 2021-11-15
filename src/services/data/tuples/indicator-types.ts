import {Enum, EnumId} from './enum-types';
import {FactorId} from './factor-types';
import {TenantId} from './tenant-types';
import {Topic, TopicId} from './topic-types';
import {Tuple} from './tuple-types';

export enum MeasureMethod {
	// address related
	CONTINENT = 'continent',
	REGION = 'region',
	COUNTRY = 'country',
	PROVINCE = 'province',
	CITY = 'city',
	DISTRICT = 'district',
	FLOOR = 'floor',
	RESIDENCE_TYPE = 'residence-type',
	RESIDENTIAL_AREA = 'residential-area',

	// time related
	YEAR = 'year',
	HALF_YEAR = 'half-year',
	QUARTER = 'quarter',
	MONTH = 'month',
	HALF_MONTH = 'half-month',
	TEN_DAYS = 'ten-days',
	WEEK_OF_YEAR = 'week-of-year',
	WEEK_OF_MONTH = 'week-of-month',
	HALF_WEEK = 'half-week',
	DAY_OF_MONTH = 'day-of-month',
	DAY_OF_WEEK = 'day-of-week',
	DAY_KIND = 'day-kind',
	HOUR = 'hour',
	HOUR_KIND = 'hour-kind',
	AM_PM = 'am-pm',

	// individual related
	GENDER = 'gender',
	OCCUPATION = 'occupation',
	AGE = 'age',
	RELIGION = 'religion',
	NATIONALITY = 'nationality',

	// organization related
	BIZ_TRADE = 'biz-trade',
	BIZ_SCALE = 'biz-scale',

	// boolean
	BOOLEAN = 'boolean',

	// enumeration
	ENUM = 'enum',
}

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

/** aggregate, not from factor, for each indicator (numeric type) */
export enum IndicatorAggregateArithmetic {
	COUNT = 'count',
	SUM = 'sum',
	AVG = 'avg',
	MAX = 'max',
	MIN = 'min'
}

export type IndicatorId = string;

export interface IndicatorMeasure {
	factorId: FactorId;
	method: MeasureMethod;
}

export interface Indicator extends Tuple {
	indicatorId: IndicatorId;
	name: string;
	topicId: TopicId;
	/** is a count indicator when factor is not appointed */
	factorId?: FactorId;
	measures: Array<IndicatorMeasure>;
	/** effective only when factorId is appointed */
	valueBuckets?: Array<BucketId>;
	tenantId?: TenantId;
}

export type QueryIndicator = Pick<Indicator, 'indicatorId' | 'name'>;
export type TopicForIndicator = Pick<Topic, 'topicId' | 'name' | 'type' | 'factors'>;
export type EnumForIndicator = Pick<Enum, 'enumId' | 'name'>;