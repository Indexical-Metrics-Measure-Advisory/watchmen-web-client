import {FactorType} from '@/services/data/tuples/factor-types';

export const OracleFactorTypeMap: Record<FactorType, string> = {
	[FactorType.SEQUENCE]: 'NUMBER(30)',

	[FactorType.NUMBER]: 'NUMBER(32,6)',
	[FactorType.UNSIGNED]: 'NUMBER(32,6)',

	[FactorType.TEXT]: 'VARCHAR2(255)',

	// address
	[FactorType.ADDRESS]: 'VARCHAR2(1024)',
	[FactorType.CONTINENT]: 'VARCHAR2(10)',
	[FactorType.REGION]: 'VARCHAR2(10)',
	[FactorType.COUNTRY]: 'VARCHAR2(10)',
	[FactorType.PROVINCE]: 'VARCHAR2(10)',
	[FactorType.CITY]: 'VARCHAR2(10)',
	[FactorType.DISTRICT]: 'VARCHAR2(255)',
	[FactorType.ROAD]: 'VARCHAR2(255)',
	[FactorType.COMMUNITY]: 'VARCHAR2(100)',
	[FactorType.FLOOR]: 'NUMBER(5)',
	[FactorType.RESIDENCE_TYPE]: 'VARCHAR2(10)',
	[FactorType.RESIDENTIAL_AREA]: 'NUMBER(10,2)',

	// contact electronic
	[FactorType.EMAIL]: 'VARCHAR2(100)',
	[FactorType.PHONE]: 'VARCHAR2(64)',
	[FactorType.MOBILE]: 'VARCHAR2(64)',
	[FactorType.FAX]: 'VARCHAR2(64)',

	// date time related
	[FactorType.DATETIME]: 'DATE',
	[FactorType.FULL_DATETIME]: 'DATE',
	[FactorType.DATE]: 'DATE',
	[FactorType.TIME]: 'DATE',
	[FactorType.YEAR]: 'NUMBER(5)',
	[FactorType.HALF_YEAR]: 'NUMBER(3)',
	[FactorType.QUARTER]: 'NUMBER(3)',
	[FactorType.MONTH]: 'NUMBER(3)',
	[FactorType.HALF_MONTH]: 'NUMBER(3)',
	[FactorType.TEN_DAYS]: 'NUMBER(3)',
	[FactorType.WEEK_OF_YEAR]: 'NUMBER(3)',
	[FactorType.WEEK_OF_MONTH]: 'NUMBER(3)',
	[FactorType.HALF_WEEK]: 'NUMBER(3)',
	[FactorType.DAY_OF_MONTH]: 'NUMBER(3)',
	[FactorType.DAY_OF_WEEK]: 'NUMBER(3)',
	[FactorType.DAY_KIND]: 'NUMBER(3)',
	[FactorType.HOUR]: 'NUMBER(3)',
	[FactorType.HOUR_KIND]: 'NUMBER(3)',
	[FactorType.MINUTE]: 'NUMBER(3)',
	[FactorType.SECOND]: 'NUMBER(3)',
	[FactorType.MILLISECOND]: 'NUMBER(3)',
	[FactorType.AM_PM]: 'NUMBER(3)',

	// individual
	[FactorType.GENDER]: 'VARCHAR2(10)',
	[FactorType.OCCUPATION]: 'VARCHAR2(10)',
	[FactorType.DATE_OF_BIRTH]: 'DATE',
	[FactorType.AGE]: 'NUMBER(5)',
	[FactorType.ID_NO]: 'VARCHAR2(64)',
	[FactorType.RELIGION]: 'VARCHAR2(10)',
	[FactorType.NATIONALITY]: 'VARCHAR2(10)',

	// organization
	[FactorType.BIZ_TRADE]: 'VARCHAR2(10)',
	[FactorType.BIZ_SCALE]: 'NUMBER(9)',

	[FactorType.BOOLEAN]: 'NUMBER(1)',

	[FactorType.ENUM]: 'VARCHAR2(20)',

	[FactorType.OBJECT]: 'CLOB',
	[FactorType.ARRAY]: 'CLOB'
};