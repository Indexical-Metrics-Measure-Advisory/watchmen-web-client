import {IndicatorAggregateArithmetic} from '@/services/data/tuples/indicator-types';
import {Inspection} from '@/services/data/tuples/inspection-types';
import {buildColumnIndexMap, isColumnIndexAssigned} from './chart-utils';
import {ChartUsage} from './types';

export const buildChartUsages = (inspection: Inspection, arithmetic: IndicatorAggregateArithmetic): Array<ChartUsage> => {
	const columnIndexMap = buildColumnIndexMap(inspection, arithmetic);
	if (isColumnIndexAssigned(columnIndexMap.timeGrouping) && isColumnIndexAssigned(columnIndexMap.bucketOn)) {
		return [ChartUsage.BOTH, ChartUsage.TIME_GROUPING, ChartUsage.BUCKET_ON];
	}

	if (isColumnIndexAssigned(columnIndexMap.timeGrouping)) {
		return [ChartUsage.TIME_GROUPING];
	}

	if (isColumnIndexAssigned(columnIndexMap.bucketOn)) {
		return [ChartUsage.BUCKET_ON];
	}

	return [];
};