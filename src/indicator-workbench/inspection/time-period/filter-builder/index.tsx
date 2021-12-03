import {MeasureMethod} from '@/services/data/tuples/indicator-types';
import {TimePeriodMeasure} from '@/services/data/tuples/indicator-utils';
import {
	buildAmPmFilter,
	buildDayKindsFilter,
	buildDaysOfMonthFilter,
	buildDaysOfWeekFilter,
	buildHalfMonthsFilter,
	buildHalfWeeksFilter,
	buildHalfYearsFilter,
	buildHourKindsFilter,
	buildHoursFilter,
	buildMonthsFilter,
	buildQuartersFilter,
	buildTenDaysFilter,
	buildWeeksOfMonthFilter,
	buildWeeksOfYearFilter,
	buildYearsFilter
} from './builder';
import {TimePeriodFilterBuilder} from './types';

export const FilterBuilders: Record<TimePeriodMeasure, TimePeriodFilterBuilder> = {
	[MeasureMethod.YEAR]: buildYearsFilter,
	[MeasureMethod.HALF_YEAR]: buildHalfYearsFilter,
	[MeasureMethod.QUARTER]: buildQuartersFilter,
	[MeasureMethod.MONTH]: buildMonthsFilter,
	[MeasureMethod.HALF_MONTH]: buildHalfMonthsFilter,
	[MeasureMethod.TEN_DAYS]: buildTenDaysFilter,
	[MeasureMethod.WEEK_OF_YEAR]: buildWeeksOfYearFilter,
	[MeasureMethod.WEEK_OF_MONTH]: buildWeeksOfMonthFilter,
	[MeasureMethod.HALF_WEEK]: buildHalfWeeksFilter,
	[MeasureMethod.DAY_OF_MONTH]: buildDaysOfMonthFilter,
	[MeasureMethod.DAY_OF_WEEK]: buildDaysOfWeekFilter,
	[MeasureMethod.DAY_KIND]: buildDayKindsFilter,
	[MeasureMethod.HOUR]: buildHoursFilter,
	[MeasureMethod.HOUR_KIND]: buildHourKindsFilter,
	[MeasureMethod.AM_PM]: buildAmPmFilter
};
