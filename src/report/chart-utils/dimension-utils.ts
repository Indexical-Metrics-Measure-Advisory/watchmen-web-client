import {Report} from '@/services/tuples/report-types';

export const getDimensionColumnIndexOffset = (report: Report) => {
	return report.indicators.length || 0;
};
