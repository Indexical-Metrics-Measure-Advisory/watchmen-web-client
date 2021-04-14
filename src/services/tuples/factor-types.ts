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
	SEASON = 'season', // 1: spring, 2: summer, 3: autumn, 4: winter
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
