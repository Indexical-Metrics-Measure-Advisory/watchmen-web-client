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
