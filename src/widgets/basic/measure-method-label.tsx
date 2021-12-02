import {MeasureMethod} from '@/services/data/tuples/indicator-types';
import styled from 'styled-components';
import {Lang} from '../langs';

const MeasureMethodContainer = styled.span.attrs({'data-widget': 'measure-method'})`
	display     : flex;
	position    : relative;
	align-items : center;
`;

export const MeasureMethodLabels: Record<MeasureMethod, string> = {
	// address related
	[MeasureMethod.CONTINENT]: Lang.INDICATOR.MEASURE_METHOD.CONTINENT,
	[MeasureMethod.REGION]: Lang.INDICATOR.MEASURE_METHOD.REGION,
	[MeasureMethod.COUNTRY]: Lang.INDICATOR.MEASURE_METHOD.COUNTRY,
	[MeasureMethod.PROVINCE]: Lang.INDICATOR.MEASURE_METHOD.PROVINCE,
	[MeasureMethod.CITY]: Lang.INDICATOR.MEASURE_METHOD.CITY,
	[MeasureMethod.DISTRICT]: Lang.INDICATOR.MEASURE_METHOD.DISTRICT,
	[MeasureMethod.FLOOR]: Lang.INDICATOR.MEASURE_METHOD.FLOOR,
	[MeasureMethod.RESIDENCE_TYPE]: Lang.INDICATOR.MEASURE_METHOD.RESIDENCE_TYPE,
	[MeasureMethod.RESIDENTIAL_AREA]: Lang.INDICATOR.MEASURE_METHOD.RESIDENTIAL_AREA,

	// time related
	[MeasureMethod.YEAR]: Lang.INDICATOR.MEASURE_METHOD.YEAR,
	[MeasureMethod.HALF_YEAR]: Lang.INDICATOR.MEASURE_METHOD.HALF_YEAR,
	[MeasureMethod.QUARTER]: Lang.INDICATOR.MEASURE_METHOD.QUARTER,
	[MeasureMethod.MONTH]: Lang.INDICATOR.MEASURE_METHOD.MONTH,
	[MeasureMethod.HALF_MONTH]: Lang.INDICATOR.MEASURE_METHOD.HALF_MONTH,
	[MeasureMethod.TEN_DAYS]: Lang.INDICATOR.MEASURE_METHOD.TEN_DAYS,
	[MeasureMethod.WEEK_OF_YEAR]: Lang.INDICATOR.MEASURE_METHOD.WEEK_OF_YEAR,
	[MeasureMethod.WEEK_OF_MONTH]: Lang.INDICATOR.MEASURE_METHOD.WEEK_OF_MONTH,
	[MeasureMethod.HALF_WEEK]: Lang.INDICATOR.MEASURE_METHOD.HALF_WEEK,
	[MeasureMethod.DAY_OF_MONTH]: Lang.INDICATOR.MEASURE_METHOD.DAY_OF_MONTH,
	[MeasureMethod.DAY_OF_WEEK]: Lang.INDICATOR.MEASURE_METHOD.DAY_OF_WEEK,
	[MeasureMethod.DAY_KIND]: Lang.INDICATOR.MEASURE_METHOD.DAY_KIND,
	[MeasureMethod.HOUR]: Lang.INDICATOR.MEASURE_METHOD.HOUR,
	[MeasureMethod.HOUR_KIND]: Lang.INDICATOR.MEASURE_METHOD.HOUR_KIND,
	[MeasureMethod.AM_PM]: Lang.INDICATOR.MEASURE_METHOD.AM_PM,

	// individual related
	[MeasureMethod.GENDER]: Lang.INDICATOR.MEASURE_METHOD.GENDER,
	[MeasureMethod.OCCUPATION]: Lang.INDICATOR.MEASURE_METHOD.OCCUPATION,
	[MeasureMethod.AGE]: Lang.INDICATOR.MEASURE_METHOD.AGE,
	[MeasureMethod.RELIGION]: Lang.INDICATOR.MEASURE_METHOD.RELIGION,
	[MeasureMethod.NATIONALITY]: Lang.INDICATOR.MEASURE_METHOD.NATIONALITY,

	// organization related
	[MeasureMethod.BIZ_TRADE]: Lang.INDICATOR.MEASURE_METHOD.BIZ_TRADE,
	[MeasureMethod.BIZ_SCALE]: Lang.INDICATOR.MEASURE_METHOD.BIZ_SCALE,

	// boolean
	[MeasureMethod.BOOLEAN]: Lang.INDICATOR.MEASURE_METHOD.BOOLEAN,

	// enumeration
	[MeasureMethod.ENUM]: Lang.INDICATOR.MEASURE_METHOD.ENUM
};

export const MeasureMethodLabel = (props: { measureMethod: MeasureMethod }) => {
	const {measureMethod, ...rest} = props;

	return <MeasureMethodContainer {...rest}>
		{MeasureMethodLabels[measureMethod] || ''}
	</MeasureMethodContainer>;
};