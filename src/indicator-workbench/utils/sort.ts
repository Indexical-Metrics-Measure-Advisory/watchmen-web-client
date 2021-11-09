import {MeasureMethod} from '@/services/data/tuples/indicator-types';

export const MeasureMethodSort: Record<MeasureMethod, number> = {
	// address related
	[MeasureMethod.CONTINENT]: 1,
	[MeasureMethod.REGION]: 2,
	[MeasureMethod.COUNTRY]: 3,
	[MeasureMethod.PROVINCE]: 4,
	[MeasureMethod.CITY]: 5,
	[MeasureMethod.DISTRICT]: 6,
	[MeasureMethod.FLOOR]: 7,
	[MeasureMethod.RESIDENCE_TYPE]: 8,
	[MeasureMethod.RESIDENTIAL_AREA]: 9,

	// time related
	[MeasureMethod.YEAR]: 1,
	[MeasureMethod.HALF_YEAR]: 2,
	[MeasureMethod.QUARTER]: 3,
	[MeasureMethod.MONTH]: 4,
	[MeasureMethod.HALF_MONTH]: 5,
	[MeasureMethod.TEN_DAYS]: 6,
	[MeasureMethod.WEEK_OF_YEAR]: 7,
	[MeasureMethod.WEEK_OF_MONTH]: 8,
	[MeasureMethod.HALF_WEEK]: 9,
	[MeasureMethod.DAY_OF_MONTH]: 10,
	[MeasureMethod.DAY_OF_WEEK]: 11,
	[MeasureMethod.DAY_KIND]: 12,
	[MeasureMethod.HOUR]: 13,
	[MeasureMethod.HOUR_KIND]: 14,
	[MeasureMethod.AM_PM]: 15,

	// individual related
	[MeasureMethod.GENDER]: 1,
	[MeasureMethod.OCCUPATION]: 2,
	[MeasureMethod.AGE]: 3,
	[MeasureMethod.RELIGION]: 4,
	[MeasureMethod.NATIONALITY]: 5,

	// organization related
	[MeasureMethod.BIZ_TRADE]: 1,
	[MeasureMethod.BIZ_SCALE]: 2,

	// boolean
	[MeasureMethod.BOOLEAN]: 1,

	// enumeration
	[MeasureMethod.ENUM]: 2
};