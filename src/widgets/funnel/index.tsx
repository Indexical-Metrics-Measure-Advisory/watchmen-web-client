import {ReportFunnel} from '@/services/data/tuples/report-types';
import {ReactNode} from 'react';
import {AmPmEditor} from './am-pm';
import {DateEditor} from './date';
import {DayKindEditor} from './day-kind';
import {DayOfWeekEditor} from './day-of-week';
import {EnumEditor} from './enum';
import {HalfMonthEditor} from './half-month';
import {HalfWeekEditor} from './half-week';
import {HalfYearEditor} from './half-year';
import {HourEditor} from './hour';
import {HourKindEditor} from './hour-kind';
import {MonthEditor} from './month';
import {NumericEditor} from './numeric';
import {QuarterEditor} from './quarter';
import {TenDaysEditor} from './ten-days';
import {WeekOfMonthEditor} from './week-of-month';
import {YearEditor} from './year';

export const FunnelEditor = (props: { funnel: ReportFunnel; pairJoint: ReactNode }) => {
	const {funnel, pairJoint} = props;

	return <>
		<NumericEditor funnel={funnel} pairJoint={pairJoint}/>
		<DateEditor funnel={funnel} pairJoint={pairJoint}/>
		<YearEditor funnel={funnel} pairJoint={pairJoint}/>
		<HalfYearEditor funnel={funnel} pairJoint={pairJoint}/>
		<QuarterEditor funnel={funnel} pairJoint={pairJoint}/>
		<MonthEditor funnel={funnel} pairJoint={pairJoint}/>
		<HalfMonthEditor funnel={funnel} pairJoint={pairJoint}/>
		<TenDaysEditor funnel={funnel} pairJoint={pairJoint}/>
		<WeekOfMonthEditor funnel={funnel} pairJoint={pairJoint}/>
		<HalfWeekEditor funnel={funnel} pairJoint={pairJoint}/>
		<DayKindEditor funnel={funnel} pairJoint={pairJoint}/>
		<DayOfWeekEditor funnel={funnel} pairJoint={pairJoint}/>
		<HourEditor funnel={funnel} pairJoint={pairJoint}/>
		<HourKindEditor funnel={funnel} pairJoint={pairJoint}/>
		<AmPmEditor funnel={funnel} pairJoint={pairJoint}/>
		<EnumEditor funnel={funnel}/>
	</>;
};