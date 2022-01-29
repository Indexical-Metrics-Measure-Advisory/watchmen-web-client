import {DateTime} from '../types';
import {EnumId} from './enum-types';

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
export const CompatibleTypes: Record<FactorType, SourceTypes> = {
	[FactorType.SEQUENCE]: {includes: [FactorType.SEQUENCE, FactorType.NUMBER, FactorType.UNSIGNED]},

	[FactorType.NUMBER]: {
		includes: [
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
			FactorType.NUMBER, FactorType.UNSIGNED, FactorType.SEQUENCE,
			FactorType.FLOOR, FactorType.RESIDENTIAL_AREA,
			FactorType.YEAR, FactorType.HALF_YEAR, FactorType.QUARTER, FactorType.MONTH, FactorType.HALF_MONTH,
			FactorType.TEN_DAYS, FactorType.WEEK_OF_YEAR, FactorType.WEEK_OF_MONTH, FactorType.HALF_WEEK,
			FactorType.DAY_OF_MONTH, FactorType.DAY_OF_WEEK, FactorType.DAY_KIND, FactorType.HOUR, FactorType.HOUR_KIND,
			FactorType.MINUTE, FactorType.SECOND, FactorType.MILLISECOND, FactorType.AM_PM
		]
	},

	// any type can be written to text except object and array
	[FactorType.TEXT]: {excludes: [FactorType.OBJECT, FactorType.ARRAY]},

	// address
	[FactorType.ADDRESS]: {includes: [FactorType.ADDRESS, FactorType.TEXT]},
	[FactorType.CONTINENT]: {includes: [FactorType.CONTINENT]},
	[FactorType.REGION]: {includes: [FactorType.REGION]},
	[FactorType.COUNTRY]: {includes: [FactorType.COUNTRY]},
	[FactorType.PROVINCE]: {includes: [FactorType.PROVINCE]},
	[FactorType.CITY]: {includes: [FactorType.CITY]},
	[FactorType.DISTRICT]: {includes: [FactorType.DISTRICT]},
	[FactorType.ROAD]: {includes: [FactorType.ROAD]},
	[FactorType.COMMUNITY]: {includes: [FactorType.COMMUNITY]},
	[FactorType.FLOOR]: {includes: [FactorType.FLOOR, FactorType.NUMBER, FactorType.UNSIGNED]},
	[FactorType.RESIDENCE_TYPE]: {includes: [FactorType.RESIDENCE_TYPE]},
	[FactorType.RESIDENTIAL_AREA]: {includes: [FactorType.RESIDENTIAL_AREA, FactorType.NUMBER, FactorType.UNSIGNED]},

	// contact electronic
	[FactorType.EMAIL]: {includes: [FactorType.EMAIL]},
	[FactorType.PHONE]: {includes: [FactorType.PHONE, FactorType.MOBILE, FactorType.FAX]},
	[FactorType.MOBILE]: {includes: [FactorType.PHONE, FactorType.MOBILE, FactorType.FAX]},
	[FactorType.FAX]: {includes: [FactorType.PHONE, FactorType.MOBILE, FactorType.FAX]},

	// date time related
	[FactorType.DATETIME]: {includes: [FactorType.DATE, FactorType.DATETIME, FactorType.FULL_DATETIME]},
	[FactorType.FULL_DATETIME]: {includes: [FactorType.DATE, FactorType.DATETIME, FactorType.FULL_DATETIME]},
	[FactorType.DATE]: {includes: [FactorType.DATE, FactorType.DATETIME, FactorType.FULL_DATETIME]},
	[FactorType.TIME]: {includes: [FactorType.TIME, FactorType.DATETIME, FactorType.FULL_DATETIME]},
	[FactorType.YEAR]: {includes: [FactorType.YEAR, FactorType.NUMBER, FactorType.UNSIGNED]},
	[FactorType.HALF_YEAR]: {includes: [FactorType.HALF_YEAR, FactorType.NUMBER, FactorType.UNSIGNED]},
	[FactorType.QUARTER]: {includes: [FactorType.QUARTER, FactorType.NUMBER, FactorType.UNSIGNED]},
	[FactorType.MONTH]: {includes: [FactorType.MONTH, FactorType.NUMBER, FactorType.UNSIGNED]},
	[FactorType.HALF_MONTH]: {includes: [FactorType.HALF_MONTH, FactorType.NUMBER, FactorType.UNSIGNED]},
	[FactorType.TEN_DAYS]: {includes: [FactorType.TEN_DAYS, FactorType.NUMBER, FactorType.UNSIGNED]},
	[FactorType.WEEK_OF_YEAR]: {includes: [FactorType.WEEK_OF_YEAR, FactorType.NUMBER, FactorType.UNSIGNED]},
	[FactorType.WEEK_OF_MONTH]: {includes: [FactorType.WEEK_OF_MONTH, FactorType.NUMBER, FactorType.UNSIGNED]},
	[FactorType.HALF_WEEK]: {includes: [FactorType.HALF_WEEK, FactorType.NUMBER, FactorType.UNSIGNED]},
	[FactorType.DAY_OF_MONTH]: {includes: [FactorType.DAY_OF_MONTH, FactorType.NUMBER, FactorType.UNSIGNED]},
	[FactorType.DAY_OF_WEEK]: {includes: [FactorType.DAY_OF_WEEK, FactorType.NUMBER, FactorType.UNSIGNED]},
	[FactorType.DAY_KIND]: {includes: [FactorType.DAY_KIND, FactorType.NUMBER, FactorType.UNSIGNED]},
	[FactorType.HOUR]: {includes: [FactorType.HOUR, FactorType.NUMBER, FactorType.UNSIGNED]},
	[FactorType.HOUR_KIND]: {includes: [FactorType.HOUR_KIND, FactorType.NUMBER, FactorType.UNSIGNED]},
	[FactorType.MINUTE]: {includes: [FactorType.MINUTE, FactorType.NUMBER, FactorType.UNSIGNED]},
	[FactorType.SECOND]: {includes: [FactorType.SECOND, FactorType.NUMBER, FactorType.UNSIGNED]},
	[FactorType.MILLISECOND]: {includes: [FactorType.MILLISECOND, FactorType.NUMBER, FactorType.UNSIGNED]},
	[FactorType.AM_PM]: {includes: [FactorType.AM_PM, FactorType.NUMBER, FactorType.UNSIGNED]},

	// individual
	[FactorType.GENDER]: {includes: [FactorType.GENDER]},
	[FactorType.OCCUPATION]: {includes: [FactorType.OCCUPATION]},
	[FactorType.DATE_OF_BIRTH]: {includes: [FactorType.DATE_OF_BIRTH, FactorType.DATE, FactorType.DATETIME, FactorType.FULL_DATETIME]},
	[FactorType.AGE]: {includes: [FactorType.AGE, FactorType.NUMBER, FactorType.UNSIGNED]},
	[FactorType.ID_NO]: {includes: [FactorType.ID_NO]},
	[FactorType.RELIGION]: {includes: [FactorType.RELIGION]},
	[FactorType.NATIONALITY]: {includes: [FactorType.NATIONALITY]},

	// organization
	[FactorType.BIZ_TRADE]: {includes: [FactorType.BIZ_TRADE]},
	[FactorType.BIZ_SCALE]: {includes: [FactorType.BIZ_SCALE, FactorType.NUMBER, FactorType.UNSIGNED]},

	[FactorType.BOOLEAN]: {includes: [FactorType.BOOLEAN]},

	[FactorType.ENUM]: {includes: [FactorType.ENUM]},

	[FactorType.OBJECT]: {includes: [FactorType.OBJECT]},
	[FactorType.ARRAY]: {includes: [FactorType.ARRAY]}
};

export enum FactorEncryptMethod {
	NONE = 'none',
	AES256_PKCS5_PADDING = 'AES256-PKCS5-PADDING',
	MD5 = 'MD5',
	SHA256 = 'SHA256',
	MASK_MAIL = 'MASK-MAIL',
	MASK_CENTER_3 = 'MASK-CENTER-3',
	MASK_CENTER_5 = 'MASK-CENTER-5',
	MASK_LAST_3 = 'MASK-LAST-3',
	MASK_LAST_6 = 'MASK-LAST-6',
	MASK_DAY = 'MASK-DAY',
	MASK_MONTH = 'MASK-MONTH',
	MASK_MONTH_DAY = 'MASK-MONTH-DAY'
}

export const CompatibleEncryptMethods: Record<FactorType, Array<FactorEncryptMethod>> = {
	[FactorType.SEQUENCE]: [],

	[FactorType.NUMBER]: [],
	[FactorType.UNSIGNED]: [],

	// any type can be written to text except object and array
	[FactorType.TEXT]: [],

	// address
	[FactorType.ADDRESS]: [],
	[FactorType.CONTINENT]: [],
	[FactorType.REGION]: [],
	[FactorType.COUNTRY]: [],
	[FactorType.PROVINCE]: [],
	[FactorType.CITY]: [],
	[FactorType.DISTRICT]: [],
	[FactorType.ROAD]: [],
	[FactorType.COMMUNITY]: [],
	[FactorType.FLOOR]: [],
	[FactorType.RESIDENCE_TYPE]: [],
	[FactorType.RESIDENTIAL_AREA]: [],

	// contact electronic
	[FactorType.EMAIL]: [FactorEncryptMethod.MASK_MAIL, FactorEncryptMethod.AES256_PKCS5_PADDING],
	[FactorType.PHONE]: [
		FactorEncryptMethod.MASK_CENTER_3, FactorEncryptMethod.MASK_CENTER_5,
		FactorEncryptMethod.MASK_LAST_3, FactorEncryptMethod.MASK_LAST_6,
		FactorEncryptMethod.AES256_PKCS5_PADDING
	],
	[FactorType.MOBILE]: [
		FactorEncryptMethod.MASK_CENTER_3, FactorEncryptMethod.MASK_CENTER_5,
		FactorEncryptMethod.MASK_LAST_3, FactorEncryptMethod.MASK_LAST_6,
		FactorEncryptMethod.AES256_PKCS5_PADDING
	],
	[FactorType.FAX]: [
		FactorEncryptMethod.MASK_CENTER_3, FactorEncryptMethod.MASK_CENTER_5,
		FactorEncryptMethod.MASK_LAST_3, FactorEncryptMethod.MASK_LAST_6,
		FactorEncryptMethod.AES256_PKCS5_PADDING
	],

	// date time related
	[FactorType.DATETIME]: [],
	[FactorType.FULL_DATETIME]: [],
	[FactorType.DATE]: [],
	[FactorType.TIME]: [],
	[FactorType.YEAR]: [],
	[FactorType.HALF_YEAR]: [],
	[FactorType.QUARTER]: [],
	[FactorType.MONTH]: [],
	[FactorType.HALF_MONTH]: [],
	[FactorType.TEN_DAYS]: [],
	[FactorType.WEEK_OF_YEAR]: [],
	[FactorType.WEEK_OF_MONTH]: [],
	[FactorType.HALF_WEEK]: [],
	[FactorType.DAY_OF_MONTH]: [],
	[FactorType.DAY_OF_WEEK]: [],
	[FactorType.DAY_KIND]: [],
	[FactorType.HOUR]: [],
	[FactorType.HOUR_KIND]: [],
	[FactorType.MINUTE]: [],
	[FactorType.SECOND]: [],
	[FactorType.MILLISECOND]: [],
	[FactorType.AM_PM]: [],

	// individual
	[FactorType.GENDER]: [],
	[FactorType.OCCUPATION]: [],
	[FactorType.DATE_OF_BIRTH]: [FactorEncryptMethod.MASK_DAY, FactorEncryptMethod.MASK_MONTH, FactorEncryptMethod.MASK_MONTH_DAY],
	[FactorType.AGE]: [],
	[FactorType.ID_NO]: [
		FactorEncryptMethod.MASK_CENTER_5,
		FactorEncryptMethod.MASK_LAST_3, FactorEncryptMethod.MASK_LAST_6,
		FactorEncryptMethod.MD5, FactorEncryptMethod.SHA256,
		FactorEncryptMethod.AES256_PKCS5_PADDING
	],
	[FactorType.RELIGION]: [],
	[FactorType.NATIONALITY]: [],

	// organization
	[FactorType.BIZ_TRADE]: [],
	[FactorType.BIZ_SCALE]: [],

	[FactorType.BOOLEAN]: [],

	[FactorType.ENUM]: [],

	[FactorType.OBJECT]: [],
	[FactorType.ARRAY]: []
};

export const MathFactorTypes = [
	FactorType.NUMBER, FactorType.UNSIGNED,
	FactorType.AGE, FactorType.RESIDENTIAL_AREA, FactorType.BIZ_SCALE
];

export const FactorEncryptMethodLabels = {
	[FactorEncryptMethod.NONE]: 'None',
	[FactorEncryptMethod.AES256_PKCS5_PADDING]: 'AES256 PKCS5 Padding',
	[FactorEncryptMethod.MD5]: 'Md5',
	[FactorEncryptMethod.SHA256]: 'SHA256',
	[FactorEncryptMethod.MASK_MAIL]: 'Mask Mail',
	[FactorEncryptMethod.MASK_CENTER_3]: 'Mask Center 3 Digits',
	[FactorEncryptMethod.MASK_CENTER_5]: 'Mask Center 5 Digits',
	[FactorEncryptMethod.MASK_LAST_3]: 'Mask Last 3 Digits',
	[FactorEncryptMethod.MASK_LAST_6]: 'Mask Last 6 Digits',
	[FactorEncryptMethod.MASK_DAY]: 'Mask Day',
	[FactorEncryptMethod.MASK_MONTH]: 'Mask Month',
	[FactorEncryptMethod.MASK_MONTH_DAY]: 'Mask Month & Day'
};

export type FactorId = string;

export type FactorIndexGroup =
	'i-1' | 'i-2' | 'i-3' | 'i-4' | 'i-5' | 'i-6' | 'i-7' | 'i-8' | 'i-9' | 'i-10'
	| 'u-1' | 'u-2' | 'u-3' | 'u-4' | 'u-5' | 'u-6' | 'u-7' | 'u-8' | 'u-9' | 'u-10';

export interface Factor {
	factorId: FactorId;
	name: string;
	label: string;
	type: FactorType;
	enumId?: EnumId;
	defaultValue?: string;
	indexGroup?: FactorIndexGroup;
	// will be flatten to table column or not, only used in raw topic, and must be top level factor
	flatten?: boolean;
	encrypt?: FactorEncryptMethod;
	description?: string;
	createTime: DateTime;
	lastModified: DateTime;
}
