import {Factor, FactorType} from '@/services/data/tuples/factor-types';
import styled from 'styled-components';
import {Lang} from '../langs';

const FactorTypeContainer = styled.span.attrs({'data-widget': 'factor-type'})`
	display     : flex;
	position    : relative;
	align-items : center;
`;

const Labels: Record<FactorType, string> = {
	[FactorType.SEQUENCE]: Lang.FACTOR.SEQUENCE,

	[FactorType.NUMBER]: Lang.FACTOR.NUMBER,
	[FactorType.UNSIGNED]: Lang.FACTOR.UNSIGNED,

	[FactorType.TEXT]: Lang.FACTOR.TEXT,

	[FactorType.ADDRESS]: Lang.FACTOR.ADDRESS,
	[FactorType.CONTINENT]: Lang.FACTOR.CONTINENT,
	[FactorType.REGION]: Lang.FACTOR.REGION,
	[FactorType.COUNTRY]: Lang.FACTOR.COUNTRY,
	[FactorType.PROVINCE]: Lang.FACTOR.PROVINCE,
	[FactorType.CITY]: Lang.FACTOR.CITY,
	[FactorType.DISTRICT]: Lang.FACTOR.DISTRICT,
	[FactorType.ROAD]: Lang.FACTOR.ROAD,
	[FactorType.COMMUNITY]: Lang.FACTOR.COMMUNITY,
	[FactorType.FLOOR]: Lang.FACTOR.FLOOR,
	[FactorType.RESIDENCE_TYPE]: Lang.FACTOR.RESIDENCE_TYPE,
	[FactorType.RESIDENTIAL_AREA]: Lang.FACTOR.RESIDENTIAL_AREA,

	[FactorType.EMAIL]: Lang.FACTOR.EMAIL,
	[FactorType.PHONE]: Lang.FACTOR.PHONE,
	[FactorType.MOBILE]: Lang.FACTOR.MOBILE,
	[FactorType.FAX]: Lang.FACTOR.FAX,

	[FactorType.DATETIME]: Lang.FACTOR.DATETIME,
	[FactorType.FULL_DATETIME]: Lang.FACTOR.FULL_DATETIME,
	[FactorType.DATE]: Lang.FACTOR.DATE,
	[FactorType.TIME]: Lang.FACTOR.TIME,
	[FactorType.YEAR]: Lang.FACTOR.YEAR,
	[FactorType.HALF_YEAR]: Lang.FACTOR.HALF_YEAR,
	[FactorType.QUARTER]: Lang.FACTOR.QUARTER,
	[FactorType.MONTH]: Lang.FACTOR.MONTH,
	[FactorType.HALF_MONTH]: Lang.FACTOR.HALF_MONTH,
	[FactorType.TEN_DAYS]: Lang.FACTOR.TEN_DAYS,
	[FactorType.WEEK_OF_YEAR]: Lang.FACTOR.WEEK_OF_YEAR,
	[FactorType.WEEK_OF_MONTH]: Lang.FACTOR.WEEK_OF_MONTH,
	[FactorType.HALF_WEEK]: Lang.FACTOR.HALF_WEEK,
	[FactorType.DAY_OF_MONTH]: Lang.FACTOR.DAY_OF_MONTH,
	[FactorType.DAY_OF_WEEK]: Lang.FACTOR.DAY_OF_WEEK,
	[FactorType.DAY_KIND]: Lang.FACTOR.DAY_KIND,
	[FactorType.HOUR]: Lang.FACTOR.HOUR,
	[FactorType.HOUR_KIND]: Lang.FACTOR.HOUR_KIND,
	[FactorType.MINUTE]: Lang.FACTOR.MINUTE,
	[FactorType.SECOND]: Lang.FACTOR.SECOND,
	[FactorType.MILLISECOND]: Lang.FACTOR.MILLISECOND,
	[FactorType.AM_PM]: Lang.FACTOR.AM_PM,

	[FactorType.GENDER]: Lang.FACTOR.GENDER,
	[FactorType.OCCUPATION]: Lang.FACTOR.OCCUPATION,
	[FactorType.DATE_OF_BIRTH]: Lang.FACTOR.DATE_OF_BIRTH,
	[FactorType.AGE]: Lang.FACTOR.AGE,
	[FactorType.ID_NO]: Lang.FACTOR.ID_NO,
	[FactorType.RELIGION]: Lang.FACTOR.RELIGION,
	[FactorType.NATIONALITY]: Lang.FACTOR.NATIONALITY,

	[FactorType.BIZ_TRADE]: Lang.FACTOR.BIZ_TRADE,
	[FactorType.BIZ_SCALE]: Lang.FACTOR.BIZ_SCALE,

	[FactorType.BOOLEAN]: Lang.FACTOR.BOOLEAN,

	[FactorType.ENUM]: Lang.FACTOR.ENUM,

	[FactorType.OBJECT]: Lang.FACTOR.OBJECT,
	[FactorType.ARRAY]: Lang.FACTOR.ARRAY
};

export const FactorTypeLabel = (props: { factor: Factor }) => {
	const {factor, ...rest} = props;
	const {type} = factor;

	return <FactorTypeContainer {...rest}>
		{Labels[type] || ''}
	</FactorTypeContainer>;
};