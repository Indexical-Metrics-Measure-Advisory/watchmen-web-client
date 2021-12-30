import {FactorType} from '@/services/data/tuples/factor-types';

export const MySQLFactorTypeMap: Record<FactorType, string> = {
	[FactorType.SEQUENCE]: 'BIGINT',

	[FactorType.NUMBER]: 'DECIMAL(32,6)',
	[FactorType.UNSIGNED]: 'DECIMAL(32,6)',

	[FactorType.TEXT]: 'VARCHAR(255)',

	// address
	[FactorType.ADDRESS]: 'TEXT',
	[FactorType.CONTINENT]: 'VARCHAR(10)',
	[FactorType.REGION]: 'VARCHAR(10)',
	[FactorType.COUNTRY]: 'VARCHAR(10)',
	[FactorType.PROVINCE]: 'VARCHAR(10)',
	[FactorType.CITY]: 'VARCHAR(10)',
	[FactorType.DISTRICT]: 'VARCHAR(255)',
	[FactorType.ROAD]: 'VARCHAR(255)',
	[FactorType.COMMUNITY]: 'VARCHAR(100)',
	[FactorType.FLOOR]: 'SMALLINT',
	[FactorType.RESIDENCE_TYPE]: 'VARCHAR(10)',
	[FactorType.RESIDENTIAL_AREA]: 'DECIMAL(10,2)',

	// contact electronic
	[FactorType.EMAIL]: 'VARCHAR(100)',
	[FactorType.PHONE]: 'VARCHAR(50)',
	[FactorType.MOBILE]: 'VARCHAR(50)',
	[FactorType.FAX]: 'VARCHAR(50)',

	// date time related
	[FactorType.DATETIME]: 'DATETIME',
	[FactorType.FULL_DATETIME]: 'DATETIME',
	[FactorType.DATE]: 'DATE',
	[FactorType.TIME]: 'TIME',
	[FactorType.YEAR]: 'SMALLINT',
	[FactorType.HALF_YEAR]: 'TINYINT',
	[FactorType.QUARTER]: 'TINYINT',
	[FactorType.MONTH]: 'TINYINT',
	[FactorType.HALF_MONTH]: 'TINYINT',
	[FactorType.TEN_DAYS]: 'TINYINT',
	[FactorType.WEEK_OF_YEAR]: 'TINYINT',
	[FactorType.WEEK_OF_MONTH]: 'TINYINT',
	[FactorType.HALF_WEEK]: 'TINYINT',
	[FactorType.DAY_OF_MONTH]: 'TINYINT',
	[FactorType.DAY_OF_WEEK]: 'TINYINT',
	[FactorType.DAY_KIND]: 'TINYINT',
	[FactorType.HOUR]: 'TINYINT',
	[FactorType.HOUR_KIND]: 'TINYINT',
	[FactorType.MINUTE]: 'TINYINT',
	[FactorType.SECOND]: 'TINYINT',
	[FactorType.MILLISECOND]: 'TINYINT',
	[FactorType.AM_PM]: 'TINYINT',

	// individual
	[FactorType.GENDER]: 'VARCHAR(10)',
	[FactorType.OCCUPATION]: 'VARCHAR(10)',
	[FactorType.DATE_OF_BIRTH]: 'DATE',
	[FactorType.AGE]: 'SMALLINT',
	[FactorType.ID_NO]: 'VARCHAR(50)',
	[FactorType.RELIGION]: 'VARCHAR(10)',
	[FactorType.NATIONALITY]: 'VARCHAR(10)',

	// organization
	[FactorType.BIZ_TRADE]: 'VARCHAR(10)',
	[FactorType.BIZ_SCALE]: 'INT',

	[FactorType.BOOLEAN]: 'TINYINT',

	[FactorType.ENUM]: 'VARCHAR(20)',

	[FactorType.OBJECT]: 'JSON',
	[FactorType.ARRAY]: 'JSON'
};
