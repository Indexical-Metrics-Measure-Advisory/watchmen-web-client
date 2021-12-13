import {IndicatorAggregateArithmetic} from '@/services/data/tuples/indicator-types';
import {Inspection, InspectMeasureOn} from '@/services/data/tuples/inspection-types';
import {RowOfAny} from '@/services/data/types';
import {isNotNull} from '@/services/data/utils';
import {ChartGrowthType, ChartParams, ChartType, ChartUsage} from './types';

const COLUMN_INDEX_NOT_EXISTS = -1;

export interface ColumnIndexMap {
	timeGrouping: number;
	bucketOn: number;
	value: number;
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
	// value columns follow
	const firstValueColumnIndex = isColumnIndexAssigned(columnIndexMap.timeGrouping) ? (columnIndexMap.timeGrouping + 1) : (columnIndexMap.bucketOn + 1);
	columnIndexMap.value = firstValueColumnIndex + (inspection.aggregateArithmetics || []).indexOf(arithmetic);

	return columnIndexMap;
};

const rebuildOnIgnoreOneColumn = (params: ChartParams, ignoreColumnIndex: number): Pick<ChartParams, 'data' | 'columns'> => {
	const {inspection, data, columns} = params;
	// const columnIndexMap = buildColumnIndexMap(inspection, arithmetic);
	// assume one column is already removed
	const firstValueIndex = 1;
	const arithmetics = inspection.aggregateArithmetics || [];
	return {
		data: data
			// remove the given measure on given column index
			// which is bucket on or time grouping
			.map(row => row.filter((_, index) => index !== ignoreColumnIndex))
			// group by first column, which is the measure remained now
			.reduce((rows, row) => {
				const key = row[0];
				// eslint-disable-next-line
				const groupedRow = rows.find(row => row[0] == key) ?? null;
				if (groupedRow == null) {
					rows.push([...row]);
				} else {
					arithmetics.map((arithmetic, index) => {
						return {arithmetic, columnIndex: firstValueIndex + index};
					}).sort(({arithmetic: a1}, {arithmetic: a2}) => {
						// make sure avg is before count
						// since original count value is used in avg calculation
						// and count calculation will replace this value
						if (a1 === IndicatorAggregateArithmetic.AVG) {
							return -1;
						} else if (a2 === IndicatorAggregateArithmetic.AVG) {
							return 1;
						} else {
							return 0;
						}
					}).forEach(({arithmetic, columnIndex}) => {
						switch (arithmetic) {
							case IndicatorAggregateArithmetic.COUNT:
							case IndicatorAggregateArithmetic.SUM:
								groupedRow[columnIndex] = Number(groupedRow[columnIndex] ?? 0) + Number(row[columnIndex] ?? 0);
								break;
							case IndicatorAggregateArithmetic.MAX:
								groupedRow[columnIndex] = Math.max(Number(groupedRow[columnIndex] ?? 0), Number(row[columnIndex] ?? 0));
								break;
							case IndicatorAggregateArithmetic.MIN:
								groupedRow[columnIndex] = Math.min(Number(groupedRow[columnIndex] ?? 0), Number(row[columnIndex] ?? 0));
								break;
							case IndicatorAggregateArithmetic.AVG:
								if (arithmetics.includes(IndicatorAggregateArithmetic.COUNT)) {
									const countValueIndex = firstValueIndex + arithmetics.findIndex(arithmetic => arithmetic === IndicatorAggregateArithmetic.COUNT);
									groupedRow[columnIndex] = (
										Number(groupedRow[countValueIndex] ?? 0) * Number(groupedRow[columnIndex] ?? 0)
										+ Number(row[countValueIndex] ?? 0) * Number(row[columnIndex] ?? 0)
									) / (Number(groupedRow[countValueIndex] ?? 1) + Number(row[countValueIndex] ?? 1));
								} else {
									// let it be zero when no count column in dataset
									groupedRow[columnIndex] = 0;
								}
								break;
							default:
							// do nothing
						}
					});
				}
				return rows;
			}, [] as Array<RowOfAny>),
		columns: columns.filter((_, index) => index !== ignoreColumnIndex)
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

export const rebuildParams = (options: {
	params: ChartParams;
	usage: ChartUsage;
	usages: Array<ChartUsage>;
}): ChartParams => {
	const {params, usage, usages} = options;

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

export const buildChartUsages = (inspection: Inspection, arithmetic: IndicatorAggregateArithmetic): Array<ChartUsage> => {
	const columnIndexMap = buildColumnIndexMap(inspection, arithmetic);
	if (isColumnIndexAssigned(columnIndexMap.timeGrouping) && isColumnIndexAssigned(columnIndexMap.bucketOn)) {
		const arithmetics = inspection.aggregateArithmetics || [];
		if (arithmetic === IndicatorAggregateArithmetic.AVG && !arithmetics.includes(IndicatorAggregateArithmetic.COUNT)) {
			return [ChartUsage.BOTH];
		}

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

export const buildChartGrowthTypes = (inspection: Inspection, chartType: ChartType, usage: ChartUsage): Array<ChartGrowthType> => {
	if (chartType !== ChartType.BAR || usage === ChartUsage.BUCKET_ON) {
		return [];
	}

	// assign an arithmetic, no matter what it is
	const columnIndexMap = buildColumnIndexMap(inspection, IndicatorAggregateArithmetic.COUNT);

	const supportTimeGrouping = isColumnIndexAssigned(columnIndexMap.timeGrouping);

	return [supportTimeGrouping ? ChartGrowthType.TIME_GROUPING : null].filter(isNotNull);
};