import {IndicatorAggregateArithmetic} from '@/services/data/tuples/indicator-types';
import {Inspection} from '@/services/data/tuples/inspection-types';
import {buildColumnIndexMap, isColumnIndexAssigned} from './chart-utils';
import {ChartUsing} from './types';

export const buildChartUsings = (inspection: Inspection, arithmetic: IndicatorAggregateArithmetic): Array<ChartUsing> => {
	const columnIndexMap = buildColumnIndexMap(inspection, arithmetic);
	if (isColumnIndexAssigned(columnIndexMap.timeGrouping) && isColumnIndexAssigned(columnIndexMap.bucketOn)) {
		return [ChartUsing.BOTH, ChartUsing.TIME_GROUPING, ChartUsing.BUCKET_ON];
	}

	if (isColumnIndexAssigned(columnIndexMap.timeGrouping)) {
		return [ChartUsing.TIME_GROUPING];
	}

	if (isColumnIndexAssigned(columnIndexMap.bucketOn)) {
		return [ChartUsing.BUCKET_ON];
	}

	return [];
};