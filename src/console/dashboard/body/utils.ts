import {Report, ReportFunnelType} from '@/services/data/tuples/report-types';
import {CALENDAR_DATE_FORMAT} from '@/widgets/basic/calendar';
import dayjs, {Dayjs} from 'dayjs';

export const cloneReport = (report: Report): Report => {
	const clone: Report = (JSON.parse(JSON.stringify(report)));

	const now: Dayjs = dayjs();
	const values = (value: any, range: boolean) => {
		return range ? [value, value] : [value];
	};

	(clone.funnels || []).forEach(funnel => {
		const type = funnel.type;
		switch (type) {
			case ReportFunnelType.NUMERIC:
			case ReportFunnelType.ENUM:
				// do nothing
				break;
			case ReportFunnelType.DATE:
				funnel.values = values(now.format(CALENDAR_DATE_FORMAT), funnel.range);
				break;
			case ReportFunnelType.YEAR:
				funnel.values = values(`${now.year()}`, funnel.range);
				break;
			case ReportFunnelType.HALF_YEAR:
			case ReportFunnelType.QUARTER:
				break;
			case ReportFunnelType.MONTH:
				funnel.values = values(`${now.month()} + 1`, funnel.range);
				break;
			case ReportFunnelType.HALF_MONTH:
			case ReportFunnelType.TEN_DAYS:
			case ReportFunnelType.WEEK_OF_MONTH:
			case ReportFunnelType.HALF_WEEK:
			case ReportFunnelType.DAY_KIND:
			case ReportFunnelType.DAY_OF_WEEK:
			case ReportFunnelType.HOUR:
			case ReportFunnelType.HOUR_KIND:
			case ReportFunnelType.AM_PM:
				break;
		}
	});
	return clone;
};