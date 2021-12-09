import {Inspection, InspectMeasureOn} from '@/services/data/tuples/inspection-types';
import {RowOfAny} from '@/services/data/types';
import {formatToKGB} from '@/services/utils';

const COLUMN_INDEX_NOT_EXISTS = -1;

export interface ColumnIndexMap {
	timeGrouping: number;
	bucketOn: number;
	value: number;
	timeRange: number;
}

export interface XAxisData {
	columnIndex: number;
	data: RowOfAny;
}

export interface LegendData {
	existing: boolean;
	columnIndex: number;
	data: RowOfAny;
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

export const buildColumnIndexMap = (inspection: Inspection) => {
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
	columnIndexMap.value = isColumnIndexAssigned(columnIndexMap.timeRange)
		? (columnIndexMap.timeRange + 1)
		: (isColumnIndexAssigned(columnIndexMap.timeGrouping) ? (columnIndexMap.timeGrouping + 1) : (columnIndexMap.bucketOn + 1));

	return columnIndexMap;
};

export const buildXAxis = (data: Array<RowOfAny>, columnIndexMap: ColumnIndexMap): XAxisData => {
	const columnIndex = isColumnIndexAssigned(columnIndexMap.timeGrouping) ? columnIndexMap.timeGrouping : columnIndexMap.bucketOn;
	return {
		columnIndex,
		data: [
			...new Set(data.map(row => row[columnIndex]))].sort((t1, t2) => {
			return `${t1 || ''}`.localeCompare(`${t2 || ''}`, void 0, {numeric: true});
		})
	};
};

export const buildYAxis = () => {
	return {
		yAxis: [{
			type: 'value', axisLabel: {
				formatter: (value: any) => formatToKGB(value)
			}
		}]
	};
};

export const buildLegend = (data: Array<RowOfAny>, columnIndexMap: ColumnIndexMap): LegendData => {
	const existing = isColumnIndexAssigned(columnIndexMap.timeGrouping) && isColumnIndexAssigned(columnIndexMap.bucketOn);
	const columnIndex = columnIndexMap.bucketOn;
	return {existing, columnIndex, data: [...new Set(data.map(row => row[columnIndex]))]};
};

export const buildSeries = (options: {
	data: Array<RowOfAny>;
	xAxis: XAxisData;
	legend: LegendData;
	columnIndexMap: ColumnIndexMap;
	type: 'bar' | 'line';
}) => {
	const {data, xAxis, legend, columnIndexMap, type} = options;

	return legend.existing
		? legend.data.map(name => {
			return {
				name,
				type,
				barGap: 0,
				emphasis: {focus: 'series'},
				data: xAxis.data.map(xValue => {
					// eslint-disable-next-line
					const row = data.find(row => row[xAxis.columnIndex] == xValue && row[legend.columnIndex] == name);
					return row == null ? null : row[columnIndexMap.value];
				})
			};
		})
		: [{
			type,
			barGap: 0,
			emphasis: {focus: 'series'},
			data: xAxis.data.map(xValue => {
				// eslint-disable-next-line
				const row = data.find(row => row[xAxis.columnIndex] == xValue);
				return row == null ? null : row[columnIndexMap.value];
			})
		}];
};