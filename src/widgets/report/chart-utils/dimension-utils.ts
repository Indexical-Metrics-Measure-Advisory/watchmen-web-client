import {Report} from '@/services/data/tuples/report-types';

export const getDimensionColumnIndexOffset = (report: Report) => {
	return report.indicators.length || 0;
};
