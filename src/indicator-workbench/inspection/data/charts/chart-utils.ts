import {IndicatorAggregateArithmetic} from '@/services/data/tuples/indicator-types';
import {Inspection, InspectMeasureOn} from '@/services/data/tuples/inspection-types';

const COLUMN_INDEX_NOT_EXISTS = -1;

export interface ColumnIndexMap {
	timeGrouping: number;
	bucketOn: number;
	value: number;
	timeRange: number;
}

export const buildAriaOptions = () => {
	return {aria: {enabled: true, decal: {show: true}}};
};

const createInitialColumnIndexMap = () => {
	return {
		timeGrouping: COLUMN_INDEX_NOT_EXISTS,
		bucketOn: COLUMN_INDEX_NOT_EXISTS,
		timeRange: COLUMN_INDEX_NOT_EXISTS,
		value: COLUMN_INDEX_NOT_EXISTS
	};
};

export const isColumnIndexAssigned = (columnIndex: number) => {
	return columnIndex !== COLUMN_INDEX_NOT_EXISTS;
};

export const buildColumnIndexMap = (inspection: Inspection, arithmetic: IndicatorAggregateArithmetic) => {
	const columnIndexMap: ColumnIndexMap = createInitialColumnIndexMap();
	if (inspection.measureOnTimeFactorId != null) {
		// has time measure
		if (inspection.measureOn == null || inspection.measureOn === InspectMeasureOn.NONE) {
			// no bucket measure, time measure is on column index 0
			columnIndexMap.timeGrouping = 0;
		} else {
			// time measure is on column index 1
			columnIndexMap.bucketOn = 0;
			columnIndexMap.timeGrouping = 1;
		}
	} else {
		// no time measure, then has bucket measure
		columnIndexMap.bucketOn = 0;
	}
	if (inspection.timeRangeFactorId != null) {
		// time range column is following
		columnIndexMap.timeRange = isColumnIndexAssigned(columnIndexMap.timeGrouping) ? (columnIndexMap.timeGrouping + 1) : (columnIndexMap.bucketOn + 1);
	}
	// value columns follow
	const firstValueColumnIndex = isColumnIndexAssigned(columnIndexMap.timeRange)
		? (columnIndexMap.timeRange + 1)
		: (isColumnIndexAssigned(columnIndexMap.timeGrouping) ? (columnIndexMap.timeGrouping + 1) : (columnIndexMap.bucketOn + 1));
	columnIndexMap.value = firstValueColumnIndex + (inspection.aggregateArithmetics || []).indexOf(arithmetic);

	return columnIndexMap;
};
