import {ReportFunnelType} from '@/services/data/tuples/report-types';
import {Lang} from '../langs';

export const ReportFunnelLabels: Record<ReportFunnelType, string> = {
	[ReportFunnelType.NUMERIC]: Lang.FUNNEL.NUMERIC,
	[ReportFunnelType.DATE]: Lang.FUNNEL.DATE,
	[ReportFunnelType.YEAR]: Lang.FUNNEL.YEAR,
	[ReportFunnelType.HALF_YEAR]: Lang.FUNNEL.HALF_YEAR,
	[ReportFunnelType.QUARTER]: Lang.FUNNEL.QUARTER,
	[ReportFunnelType.MONTH]: Lang.FUNNEL.MONTH,
	[ReportFunnelType.HALF_MONTH]: Lang.FUNNEL.HALF_MONTH,
	[ReportFunnelType.TEN_DAYS]: Lang.FUNNEL.TEN_DAYS,
	[ReportFunnelType.WEEK_OF_MONTH]: Lang.FUNNEL.WEEK_OF_MONTH,
	[ReportFunnelType.HALF_WEEK]: Lang.FUNNEL.HALF_WEEK,
	[ReportFunnelType.DAY_KIND]: Lang.FUNNEL.DAY_KIND,
	[ReportFunnelType.DAY_OF_WEEK]: Lang.FUNNEL.DAY_OF_WEEK,
	[ReportFunnelType.HOUR]: Lang.FUNNEL.HOUR,
	[ReportFunnelType.HOUR_KIND]: Lang.FUNNEL.HOUR_KIND,
	[ReportFunnelType.AM_PM]: Lang.FUNNEL.AM_PM,
	[ReportFunnelType.ENUM]: Lang.FUNNEL.ENUM
};

export const ReportFunnelHalfYear: Array<string> = [Lang.CALENDAR.HALF_YEAR_1ST, Lang.CALENDAR.HALF_YEAR_2ND];
export const ReportFunnelQuarter: Array<string> = [
	Lang.CALENDAR.QUARTER_1ST, Lang.CALENDAR.QUARTER_2ND, Lang.CALENDAR.QUARTER_3RD, Lang.CALENDAR.QUARTER_4TH
];
export const ReportFunnelMonth: Array<string> = [
	Lang.CALENDAR.JAN, Lang.CALENDAR.FEB, Lang.CALENDAR.MAR, Lang.CALENDAR.APR, Lang.CALENDAR.MAY, Lang.CALENDAR.JUN,
	Lang.CALENDAR.JUL, Lang.CALENDAR.AUG, Lang.CALENDAR.SEP, Lang.CALENDAR.OCT, Lang.CALENDAR.NOV, Lang.CALENDAR.DEC
];
export const ReportFunnelHalfMonth: Array<string> = [Lang.CALENDAR.HALF_MONTH_1ST, Lang.CALENDAR.HALF_MONTH_2ND];
export const ReportFunnelTenDays: Array<string> = [
	Lang.CALENDAR.TEN_DAYS_1ST, Lang.CALENDAR.TEN_DAYS_2ND, Lang.CALENDAR.TEN_DAYS_3RD
];
export const ReportFunnelWeekOfMonth: Array<string> = [
	Lang.CALENDAR.WEEK_0, Lang.CALENDAR.WEEK_1, Lang.CALENDAR.WEEK_2,
	Lang.CALENDAR.WEEK_3, Lang.CALENDAR.WEEK_4, Lang.CALENDAR.WEEK_5
];
export const ReportFunnelHalfWeek: Array<string> = [
	Lang.CALENDAR.HALF_WEEK_1ST, Lang.CALENDAR.HALF_WEEK_2ND
];
export const ReportFunnelDayKind: Array<string> = [
	Lang.CALENDAR.WORKDAY, Lang.CALENDAR.WEEKEND, Lang.CALENDAR.HOLIDAY
];
export const ReportFunnelHourKind: Array<string> = [
	Lang.CALENDAR.WORK_TIME, Lang.CALENDAR.OFF_HOURS, Lang.CALENDAR.SLEEPING_TIME
];
export const ReportFunnelAmPm: Array<string> = [
	Lang.CALENDAR.AM, Lang.CALENDAR.PM
];