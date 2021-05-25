export enum FactorType {
	SEQUENCE = 'sequence',

	NUMBER = 'number',
	UNSIGNED = 'unsigned', // 0 & positive

	TEXT = 'text',

	// address
	ADDRESS = 'address',
	CONTINENT = 'continent',
	REGION = 'region',
	COUNTRY = 'country',
	PROVINCE = 'province',
	CITY = 'city',
	DISTRICT = 'district',
	ROAD = 'road',
	COMMUNITY = 'community',
	FLOOR = 'floor',
	RESIDENCE_TYPE = 'residence-type',
	RESIDENTIAL_AREA = 'residential-area',

	// contact electronic
	EMAIL = 'email',
	PHONE = 'phone',
	MOBILE = 'mobile',
	FAX = 'fax',

	// date time related
	DATETIME = 'datetime', // YYYY-MM-DD HH:mm:ss
	FULL_DATETIME = 'full-datetime', // YYYY-MM-DD HH:mm:ss.SSS
	DATE = 'date', // YYYY-MM-DD
	TIME = 'time', // HH:mm:ss
	YEAR = 'year', // 4 digits
	HALF_YEAR = 'half-year', // 1: first half, 2: second half
	QUARTER = 'quarter', // 1 - 4
	MONTH = 'month', // 1 - 12
	HALF_MONTH = 'half-month', // 1: first half, 2: second half
	TEN_DAYS = 'ten-days', // 1, 2, 3
	WEEK_OF_YEAR = 'week-of-year', // 0 (the partial week that precedes the first Sunday of the year) - 53 (leap year)
	WEEK_OF_MONTH = 'week-of-month', // 0 (the partial week that precedes the first Sunday of the year) - 5
	HALF_WEEK = 'half-week', // 1: first half, 2: second half
	DAY_OF_MONTH = 'day-of-month', // 1 - 31, according to month/year
	DAY_OF_WEEK = 'day-of-week', // 1 (Sunday) - 7 (Saturday)
	DAY_KIND = 'day-kind', // 1: workday, 2: weekend, 3: holiday
	HOUR = 'hour', // 0 - 23
	HOUR_KIND = 'hour-kind', // 1: work time, 2: off hours, 3: sleeping time
	MINUTE = 'minute', // 0 - 59
	SECOND = 'second', // 0 - 59
	MILLISECOND = 'millisecond', // 0 - 999
	AM_PM = 'am-pm', // 1, 2

	// individual
	GENDER = 'gender',
	OCCUPATION = 'occupation',
	DATE_OF_BIRTH = 'date-of-birth', // YYYY-MM-DD
	AGE = 'age',
	ID_NO = 'id-no',
	RELIGION = 'religion',
	NATIONALITY = 'nationality',

	// organization
	BIZ_TRADE = 'biz-trade',
	BIZ_SCALE = 'biz-scale',

	BOOLEAN = 'boolean',

	ENUM = 'enum',

	OBJECT = 'object',
	ARRAY = 'array',
}

export interface SourceTypes {
	includes?: Array<FactorType>;
	excludes?: Array<FactorType>;
}

/**
 * compatible compatible means types in value can be write into type in key
 */
export const CompatibleTypes: { [key in FactorType]: SourceTypes } = {
	[FactorType.SEQUENCE]: {includes: [FactorType.SEQUENCE]},

	[FactorType.NUMBER]: {
		includes: [
			FactorType.TEXT,
			FactorType.NUMBER, FactorType.UNSIGNED, FactorType.SEQUENCE,
			FactorType.FLOOR, FactorType.RESIDENTIAL_AREA,
			FactorType.YEAR, FactorType.HALF_YEAR, FactorType.QUARTER, FactorType.MONTH, FactorType.HALF_MONTH,
			FactorType.TEN_DAYS, FactorType.WEEK_OF_YEAR, FactorType.WEEK_OF_MONTH, FactorType.HALF_WEEK,
			FactorType.DAY_OF_MONTH, FactorType.DAY_OF_WEEK, FactorType.DAY_KIND, FactorType.HOUR, FactorType.HOUR_KIND,
			FactorType.MINUTE, FactorType.SECOND, FactorType.MILLISECOND, FactorType.AM_PM
		]
	},
	[FactorType.UNSIGNED]: {
		includes: [
			FactorType.TEXT,
			FactorType.NUMBER, FactorType.UNSIGNED, FactorType.SEQUENCE,
			FactorType.FLOOR, FactorType.RESIDENTIAL_AREA,
			FactorType.YEAR, FactorType.HALF_YEAR, FactorType.QUARTER, FactorType.MONTH, FactorType.HALF_MONTH,
			FactorType.TEN_DAYS, FactorType.WEEK_OF_YEAR, FactorType.WEEK_OF_MONTH, FactorType.HALF_WEEK,
			FactorType.DAY_OF_MONTH, FactorType.DAY_OF_WEEK, FactorType.DAY_KIND, FactorType.HOUR, FactorType.HOUR_KIND,
			FactorType.MINUTE, FactorType.SECOND, FactorType.MILLISECOND, FactorType.AM_PM
		]
	},

	[FactorType.TEXT]: {excludes: [FactorType.OBJECT, FactorType.ARRAY]},

	// address
	[FactorType.ADDRESS]: {includes: [FactorType.ADDRESS, FactorType.TEXT]},
	[FactorType.CONTINENT]: {includes: [FactorType.CONTINENT, FactorType.TEXT]},
	[FactorType.REGION]: {includes: [FactorType.REGION, FactorType.TEXT]},
	[FactorType.COUNTRY]: {includes: [FactorType.COUNTRY, FactorType.TEXT]},
	[FactorType.PROVINCE]: {includes: [FactorType.PROVINCE, FactorType.TEXT]},
	[FactorType.CITY]: {includes: [FactorType.CITY, FactorType.TEXT]},
	[FactorType.DISTRICT]: {includes: [FactorType.DISTRICT, FactorType.TEXT]},
	[FactorType.ROAD]: {includes: [FactorType.ROAD, FactorType.TEXT]},
	[FactorType.COMMUNITY]: {includes: [FactorType.COMMUNITY, FactorType.TEXT]},
	[FactorType.FLOOR]: {includes: [FactorType.FLOOR, FactorType.NUMBER, FactorType.UNSIGNED, FactorType.TEXT]},
	[FactorType.RESIDENCE_TYPE]: {includes: [FactorType.RESIDENCE_TYPE, FactorType.TEXT]},
	[FactorType.RESIDENTIAL_AREA]: {includes: [FactorType.RESIDENTIAL_AREA, FactorType.NUMBER, FactorType.UNSIGNED, FactorType.TEXT]},

	// contact electronic
	[FactorType.EMAIL]: {includes: [FactorType.EMAIL, FactorType.TEXT]},
	[FactorType.PHONE]: {includes: [FactorType.PHONE, FactorType.MOBILE, FactorType.FAX, FactorType.TEXT]},
	[FactorType.MOBILE]: {includes: [FactorType.PHONE, FactorType.MOBILE, FactorType.FAX, FactorType.TEXT]},
	[FactorType.FAX]: {includes: [FactorType.PHONE, FactorType.MOBILE, FactorType.FAX, FactorType.TEXT]},

	// date time related
	[FactorType.DATETIME]: {includes: [FactorType.DATE, FactorType.DATETIME, FactorType.FULL_DATETIME, FactorType.TEXT]},
	[FactorType.FULL_DATETIME]: {includes: [FactorType.DATE, FactorType.DATETIME, FactorType.FULL_DATETIME, FactorType.TEXT]},
	[FactorType.DATE]: {includes: [FactorType.DATE, FactorType.DATETIME, FactorType.FULL_DATETIME, FactorType.TEXT]},
	[FactorType.TIME]: {includes: [FactorType.TIME, FactorType.DATETIME, FactorType.FULL_DATETIME, FactorType.TEXT]},
	[FactorType.YEAR]: {includes: [FactorType.YEAR, FactorType.NUMBER, FactorType.UNSIGNED, FactorType.TEXT]},
	[FactorType.HALF_YEAR]: {includes: [FactorType.HALF_YEAR, FactorType.NUMBER, FactorType.UNSIGNED, FactorType.TEXT]},
	[FactorType.QUARTER]: {includes: [FactorType.QUARTER, FactorType.NUMBER, FactorType.UNSIGNED, FactorType.TEXT]},
	[FactorType.MONTH]: {includes: [FactorType.MONTH, FactorType.NUMBER, FactorType.UNSIGNED, FactorType.TEXT]},
	[FactorType.HALF_MONTH]: {includes: [FactorType.HALF_MONTH, FactorType.NUMBER, FactorType.UNSIGNED, FactorType.TEXT]},
	[FactorType.TEN_DAYS]: {includes: [FactorType.TEN_DAYS, FactorType.NUMBER, FactorType.UNSIGNED, FactorType.TEXT]},
	[FactorType.WEEK_OF_YEAR]: {includes: [FactorType.WEEK_OF_YEAR, FactorType.NUMBER, FactorType.UNSIGNED, FactorType.TEXT]},
	[FactorType.WEEK_OF_MONTH]: {includes: [FactorType.WEEK_OF_MONTH, FactorType.NUMBER, FactorType.UNSIGNED, FactorType.TEXT]},
	[FactorType.HALF_WEEK]: {includes: [FactorType.HALF_WEEK, FactorType.NUMBER, FactorType.UNSIGNED, FactorType.TEXT]},
	[FactorType.DAY_OF_MONTH]: {includes: [FactorType.DAY_OF_MONTH, FactorType.NUMBER, FactorType.UNSIGNED, FactorType.TEXT]},
	[FactorType.DAY_OF_WEEK]: {includes: [FactorType.DAY_OF_WEEK, FactorType.NUMBER, FactorType.UNSIGNED, FactorType.TEXT]},
	[FactorType.DAY_KIND]: {includes: [FactorType.DAY_KIND, FactorType.NUMBER, FactorType.UNSIGNED, FactorType.TEXT]},
	[FactorType.HOUR]: {includes: [FactorType.HOUR, FactorType.NUMBER, FactorType.UNSIGNED, FactorType.TEXT]},
	[FactorType.HOUR_KIND]: {includes: [FactorType.HOUR_KIND, FactorType.NUMBER, FactorType.UNSIGNED, FactorType.TEXT]},
	[FactorType.MINUTE]: {includes: [FactorType.MINUTE, FactorType.NUMBER, FactorType.UNSIGNED, FactorType.TEXT]},
	[FactorType.SECOND]: {includes: [FactorType.SECOND, FactorType.NUMBER, FactorType.UNSIGNED, FactorType.TEXT]},
	[FactorType.MILLISECOND]: {includes: [FactorType.MILLISECOND, FactorType.NUMBER, FactorType.UNSIGNED, FactorType.TEXT]},
	[FactorType.AM_PM]: {includes: [FactorType.AM_PM, FactorType.NUMBER, FactorType.UNSIGNED, FactorType.TEXT]},

	// individual
	[FactorType.GENDER]: {includes: [FactorType.GENDER, FactorType.TEXT]},
	[FactorType.OCCUPATION]: {includes: [FactorType.OCCUPATION, FactorType.TEXT]},
	[FactorType.DATE_OF_BIRTH]: {includes: [FactorType.DATE_OF_BIRTH, FactorType.DATE, FactorType.DATETIME, FactorType.FULL_DATETIME, FactorType.TEXT]},
	[FactorType.AGE]: {includes: [FactorType.AGE, FactorType.NUMBER, FactorType.UNSIGNED, FactorType.TEXT]},
	[FactorType.ID_NO]: {includes: [FactorType.ID_NO, FactorType.TEXT]},
	[FactorType.RELIGION]: {includes: [FactorType.RELIGION, FactorType.TEXT]},
	[FactorType.NATIONALITY]: {includes: [FactorType.NATIONALITY, FactorType.TEXT]},

	// organization
	[FactorType.BIZ_TRADE]: {includes: [FactorType.BIZ_TRADE, FactorType.TEXT]},
	[FactorType.BIZ_SCALE]: {includes: [FactorType.BIZ_SCALE, FactorType.NUMBER, FactorType.UNSIGNED, FactorType.TEXT]},

	[FactorType.BOOLEAN]: {includes: [FactorType.BOOLEAN, FactorType.TEXT]},

	[FactorType.ENUM]: {includes: [FactorType.ENUM, FactorType.TEXT]},

	[FactorType.OBJECT]: {includes: [FactorType.OBJECT]},
	[FactorType.ARRAY]: {includes: [FactorType.ARRAY]}
};

export interface Factor {
	factorId: string;
	name: string;
	label: string;
	type: FactorType;
	enumId?: string;
	defaultValue?: string;
	indexGroup?: string;
	description?: string;
	createTime: string;
	lastModifyTime: string;
}
