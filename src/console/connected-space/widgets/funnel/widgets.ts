import {ReportFunnelType} from '@/services/data/tuples/report-types';
import {Lang} from '@/widgets/langs';

export const ReportFunnelLabels: { [key in ReportFunnelType]: string } = {
	[ReportFunnelType.NUMERIC]: Lang.FUNNEL.NUMERIC,
	[ReportFunnelType.DATE]: Lang.FUNNEL.DATE,
	[ReportFunnelType.YEAR]: Lang.FUNNEL.YEAR,
	[ReportFunnelType.MONTH]: Lang.FUNNEL.MONTH,
	[ReportFunnelType.WEEK_OF_MONTH]: Lang.FUNNEL.WEEK_OF_MONTH,
	[ReportFunnelType.DAY_OF_WEEK]: Lang.FUNNEL.DAY_OF_WEEK,
	[ReportFunnelType.ENUM]: Lang.FUNNEL.ENUM
};

export const ReportFunnelMonths: Array<string> = [
	Lang.CALENDAR.JAN, Lang.CALENDAR.FEB, Lang.CALENDAR.MAR, Lang.CALENDAR.APR, Lang.CALENDAR.MAY, Lang.CALENDAR.JUN,
	Lang.CALENDAR.JUL, Lang.CALENDAR.AUG, Lang.CALENDAR.SEP, Lang.CALENDAR.OCT, Lang.CALENDAR.NOV, Lang.CALENDAR.DEC
];
export const ReportFunnelWeeks: Array<string> = [
	Lang.CALENDAR.WEEK_0, Lang.CALENDAR.WEEK_1, Lang.CALENDAR.WEEK_2,
	Lang.CALENDAR.WEEK_3, Lang.CALENDAR.WEEK_4, Lang.CALENDAR.WEEK_5
];
