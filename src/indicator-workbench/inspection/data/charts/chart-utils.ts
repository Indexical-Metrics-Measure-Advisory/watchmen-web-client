import {IndicatorAggregateArithmetic} from '@/services/data/tuples/indicator-types';
import {Inspection, InspectMeasureOn} from '@/services/data/tuples/inspection-types';
import {ChartParams, ChartUsage} from './types';

const COLUMN_INDEX_NOT_EXISTS = -1;

export interface ColumnIndexMap {
	timeGrouping: number;
	bucketOn: number;
	value: number;
	timeRange: number;
}

export const buildAriaOptions = () => {
	return {aria: {enabled: false, decal: {show: true}}};
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

const rebuildOnIgnoreOneColumn = (params: ChartParams, columnIndex: number): Pick<ChartParams, 'data' | 'columns'> => {
	const {data, columns} = params;
	return {
		data: data.map(row => row.filter((_, index) => index !== columnIndex)),
		columns: columns.filter((_, index) => index !== columnIndex)
	};
};

/** remove time grouping column, which is column index 1 */
const rebuildParamsForBucketOn = (params: ChartParams): ChartParams => {
	const {data, columns} = rebuildOnIgnoreOneColumn(params, 1);
	return {
		data,
		// rebuild inspection, remove time grouping properties
		inspection: (() => {
			const clone = {...params.inspection};
			delete clone.measureOnTime;
			delete clone.measureOnTimeFactorId;
			return clone;
		})(),
		columns,
		arithmetic: params.arithmetic
	};
};

/** remove bucket on column, which is column index 0 */
const rebuildParamsForTimeGrouping = (params: ChartParams): ChartParams => {
	const {data, columns} = rebuildOnIgnoreOneColumn(params, 0);
	return {
		data,
		// rebuild inspection, remove bucket on properties
		inspection: (() => {
			const {inspection} = params;
			const clone = {...inspection};
			delete clone.measureOn;
			delete clone.measureOnFactorId;
			delete clone.measureOnBucketId;
			return clone;
		})(),
		columns,
		arithmetic: params.arithmetic
	};
};

export const rebuildParams = (params: ChartParams, usage: ChartUsage, usages: Array<ChartUsage>): ChartParams => {
	switch (true) {
		case usage === ChartUsage.BOTH:
			return params;
		case usage === ChartUsage.BUCKET_ON && usages.includes(ChartUsage.BOTH):
			return rebuildParamsForBucketOn(params);
		case usage === ChartUsage.BUCKET_ON:
			return params;
		case  usage === ChartUsage.TIME_GROUPING && usages.includes(ChartUsage.BOTH):
			return rebuildParamsForTimeGrouping(params);
		case usage === ChartUsage.TIME_GROUPING:
			return params;
		default:
			return params;
	}
};