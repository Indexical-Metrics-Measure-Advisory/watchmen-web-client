import {
	InspectionAmPmRange,
	InspectionDayKindRange,
	InspectionDayOfMonthRange,
	InspectionDayOfWeekRange,
	InspectionHalfMonthRange,
	InspectionHalfWeekRange,
	InspectionHalfYearRange,
	InspectionHourKindRange,
	InspectionHourRange,
	InspectionMonthRange,
	InspectionQuarterRange,
	InspectionTenDaysRange,
	InspectionTimeRange,
	InspectionTimeRangeType,
	InspectionWeekOfMonthRange,
	InspectionWeekOfYearRange,
	InspectionYearRange
} from './inspection-types';

export const isInspectionYearRange = (range: InspectionTimeRange): range is InspectionYearRange => {
	return range.type === InspectionTimeRangeType.YEAR;
};

export const isInspectionHalfYearRange = (range: InspectionTimeRange): range is InspectionHalfYearRange => {
	return range.type === InspectionTimeRangeType.HALF_YEAR;
};

export const isInspectionQuarterRange = (range: InspectionTimeRange): range is InspectionQuarterRange => {
	return range.type === InspectionTimeRangeType.QUARTER;
};

export const isInspectionMonthRange = (range: InspectionTimeRange): range is InspectionMonthRange => {
	return range.type === InspectionTimeRangeType.MONTH;
};

export const isInspectionHalfMonthRange = (range: InspectionTimeRange): range is InspectionHalfMonthRange => {
	return range.type === InspectionTimeRangeType.HALF_MONTH;
};

export const isInspectionTenDaysRange = (range: InspectionTimeRange): range is InspectionTenDaysRange => {
	return range.type === InspectionTimeRangeType.TEN_DAYS;
};

export const isInspectionWeekOfYearRange = (range: InspectionTimeRange): range is InspectionWeekOfYearRange => {
	return range.type === InspectionTimeRangeType.WEEK_OF_YEAR;
};

export const isInspectionWeekOfMonthRange = (range: InspectionTimeRange): range is InspectionWeekOfMonthRange => {
	return range.type === InspectionTimeRangeType.WEEK_OF_MONTH;
};

export const isInspectionHalfWeekRange = (range: InspectionTimeRange): range is InspectionHalfWeekRange => {
	return range.type === InspectionTimeRangeType.HALF_WEEK;
};

export const isInspectionDayOfMonthRange = (range: InspectionTimeRange): range is InspectionDayOfMonthRange => {
	return range.type === InspectionTimeRangeType.DAY_OF_MONTH;
};

export const isInspectionDayOfWeekRange = (range: InspectionTimeRange): range is InspectionDayOfWeekRange => {
	return range.type === InspectionTimeRangeType.DAY_OF_WEEK;
};

export const isInspectionDayKindRange = (range: InspectionTimeRange): range is InspectionDayKindRange => {
	return range.type === InspectionTimeRangeType.DAY_KIND;
};

export const isInspectionHourRange = (range: InspectionTimeRange): range is InspectionHourRange => {
	return range.type === InspectionTimeRangeType.HOUR;
};

export const isInspectionHourKindRange = (range: InspectionTimeRange): range is InspectionHourKindRange => {
	return range.type === InspectionTimeRangeType.HOUR_KIND;
};

export const isInspectionAmPmRange = (range: InspectionTimeRange): range is InspectionAmPmRange => {
	return range.type === InspectionTimeRangeType.AM_PM;
};
