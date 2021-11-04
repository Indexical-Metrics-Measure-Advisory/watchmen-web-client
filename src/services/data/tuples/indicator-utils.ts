import {getFactorType} from './factor-calculator-utils';
import {Factor, FactorType} from './factor-types';
import {MeasureMethod} from './indicator-types';

export const tryToTransformToMeasure = (factorOrType: Factor | FactorType): Array<MeasureMethod> | MeasureMethod | undefined => {
	switch (getFactorType(factorOrType)) {
		case FactorType.CONTINENT:
			return MeasureMethod.CONTINENT;
		case FactorType.REGION:
			return MeasureMethod.REGION;
		case FactorType.COUNTRY:
			return MeasureMethod.COUNTRY;
		case FactorType.PROVINCE:
			return MeasureMethod.PROVINCE;
		case FactorType.CITY:
			return MeasureMethod.CITY;
		case FactorType.DISTRICT:
			return MeasureMethod.DISTRICT;
		case FactorType.FLOOR:
			return MeasureMethod.FLOOR;
		case FactorType.RESIDENCE_TYPE:
			return MeasureMethod.RESIDENCE_TYPE;
		case FactorType.RESIDENTIAL_AREA:
			return MeasureMethod.RESIDENTIAL_AREA;

		case FactorType.DATETIME:
			return [MeasureMethod.YEAR, MeasureMethod.MONTH];
		case FactorType.FULL_DATETIME:
			return [MeasureMethod.YEAR, MeasureMethod.MONTH];
		case FactorType.DATE:
			return [MeasureMethod.YEAR, MeasureMethod.MONTH];
		case FactorType.TIME:
			return MeasureMethod.HOUR;
		case FactorType.YEAR:
			return MeasureMethod.YEAR;
		case FactorType.HALF_YEAR:
			return MeasureMethod.HALF_YEAR;
		case FactorType.QUARTER:
			return MeasureMethod.QUARTER;
		case FactorType.MONTH:
			return MeasureMethod.MONTH;
		case FactorType.HALF_MONTH:
			return MeasureMethod.HALF_MONTH;
		case FactorType.TEN_DAYS:
			return MeasureMethod.TEN_DAYS;
		case FactorType.WEEK_OF_YEAR:
			return MeasureMethod.WEEK_OF_YEAR;
		case FactorType.WEEK_OF_MONTH:
			return MeasureMethod.WEEK_OF_MONTH;
		case FactorType.HALF_WEEK:
			return MeasureMethod.HALF_WEEK;
		case FactorType.DAY_OF_MONTH:
			return MeasureMethod.DAY_OF_MONTH;
		case FactorType.DAY_OF_WEEK:
			return MeasureMethod.DAY_OF_WEEK;
		case FactorType.DAY_KIND:
			return MeasureMethod.DAY_KIND;
		case FactorType.HOUR:
			return MeasureMethod.HOUR;
		case FactorType.HOUR_KIND:
			return MeasureMethod.HOUR_KIND;
		case FactorType.AM_PM:
			return MeasureMethod.AM_PM;

		case FactorType.GENDER:
			return MeasureMethod.GENDER;
		case FactorType.OCCUPATION:
			return MeasureMethod.OCCUPATION;
		case FactorType.DATE_OF_BIRTH:
			return [MeasureMethod.YEAR, MeasureMethod.MONTH];
		case FactorType.AGE:
			return MeasureMethod.AGE;
		case FactorType.RELIGION:
			return MeasureMethod.RELIGION;
		case FactorType.NATIONALITY:
			return MeasureMethod.NATIONALITY;
		case FactorType.BIZ_TRADE:
			return MeasureMethod.BIZ_TRADE;
		case FactorType.BIZ_SCALE:
			return MeasureMethod.BIZ_SCALE;
		case FactorType.BOOLEAN:
			return MeasureMethod.BOOLEAN;
		case FactorType.ENUM:
			return MeasureMethod.ENUM;

		case FactorType.SEQUENCE:
		case FactorType.NUMBER:
		case FactorType.UNSIGNED:
		case FactorType.TEXT:
		case FactorType.ADDRESS:
		case FactorType.ROAD:
		case FactorType.COMMUNITY:
		case FactorType.EMAIL:
		case FactorType.PHONE:
		case FactorType.MOBILE:
		case FactorType.FAX:
		case FactorType.MINUTE:
		case FactorType.SECOND:
		case FactorType.MILLISECOND:
		case FactorType.ID_NO:
		case FactorType.OBJECT:
		case FactorType.ARRAY:
			return (void 0);
	}
};