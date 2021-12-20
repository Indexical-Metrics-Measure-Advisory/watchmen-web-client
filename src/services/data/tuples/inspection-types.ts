import {BucketId} from './bucket-types';
import {FactorId} from './factor-types';
import {IndicatorAggregateArithmetic, IndicatorId, MeasureMethod} from './indicator-types';
import {TenantId} from './tenant-types';
import {Tuple} from './tuple-types';

export type InspectionId = string;

export enum InspectMeasureOn {
	NONE = 'none',
	VALUE = 'value',
	OTHER = 'other',
}

export enum InspectionTimeRangeType {
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
}

export interface InspectionTimeRange {
	type: InspectionTimeRangeType;
	value: any;
}

export interface InspectionYearRange extends InspectionTimeRange {
	type: InspectionTimeRangeType.YEAR;
	value: number;
}

export interface InspectionHalfYearRange extends InspectionTimeRange {
	type: InspectionTimeRangeType.HALF_YEAR;
	value: 1 | 2;
}

export interface InspectionQuarterRange extends InspectionTimeRange {
	type: InspectionTimeRangeType.QUARTER;
	value: 1 | 2 | 3 | 4;
}

export interface InspectionMonthRange extends InspectionTimeRange {
	type: InspectionTimeRangeType.MONTH;
	value: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

export interface InspectionHalfMonthRange extends InspectionTimeRange {
	type: InspectionTimeRangeType.HALF_MONTH;
	value: 1 | 2;
}

export interface InspectionTenDaysRange extends InspectionTimeRange {
	type: InspectionTimeRangeType.TEN_DAYS;
	value: 1 | 2 | 3;
}

export interface InspectionWeekOfYearRange extends InspectionTimeRange {
	type: InspectionTimeRangeType.WEEK_OF_YEAR;
	value: number; // 0 - 53
}

export interface InspectionWeekOfMonthRange extends InspectionTimeRange {
	type: InspectionTimeRangeType.WEEK_OF_MONTH;
	value: 0 | 1 | 2 | 3 | 4 | 5;
}

export interface InspectionHalfWeekRange extends InspectionTimeRange {
	type: InspectionTimeRangeType.HALF_WEEK;
	value: 1 | 2;
}

export interface InspectionDayOfMonthRange extends InspectionTimeRange {
	type: InspectionTimeRangeType.DAY_OF_MONTH;
	value: number; // 1 - 31
}

export interface InspectionDayOfWeekRange extends InspectionTimeRange {
	type: InspectionTimeRangeType.DAY_OF_WEEK;
	value: 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

export interface InspectionDayKindRange extends InspectionTimeRange {
	type: InspectionTimeRangeType.DAY_KIND;
	value: 1 | 2 | 3;
}

export interface InspectionHourRange extends InspectionTimeRange {
	type: InspectionTimeRangeType.HOUR;
	value: number; // 0 - 23
}

export interface InspectionHourKindRange extends InspectionTimeRange {
	type: InspectionTimeRangeType.HOUR_KIND;
	value: 1 | 2 | 3;
}

export interface InspectionAmPmRange extends InspectionTimeRange {
	type: InspectionTimeRangeType.AM_PM;
	value: 1 | 2;
}

export interface Inspection extends Tuple {
	inspectionId: InspectionId;
	name: string;
	indicatorId: IndicatorId;
	/** indicator value aggregate arithmetic */
	aggregateArithmetics?: Array<IndicatorAggregateArithmetic>;
	/** none, measure on indicator value or other factor */
	measureOn?: InspectMeasureOn;
	/** if measure on factor, factor id must be given */
	measureOnFactorId?: FactorId;
	/** bucket for any measure on type, or no bucket also allowed if measure on factor rather than indicator value */
	measureOnBucketId?: BucketId;
	/** time range */
	timeRangeMeasure?: MeasureMethod;
	/** time range factor */
	timeRangeFactorId?: FactorId;
	/** ranges on time factor for filter data */
	timeRanges?: Array<InspectionTimeRange>;
	/** time measure on factor. measure can use another factor or just measure on the same time factor */
	measureOnTime?: MeasureMethod;
	/** time measure on factor */
	measureOnTimeFactorId?: FactorId;
	tenantId?: TenantId;
}
