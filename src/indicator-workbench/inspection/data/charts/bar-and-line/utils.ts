import {RowOfAny} from '@/services/data/types';
import {formatToKGB} from '@/services/utils';
import {ColumnIndexMap, isColumnIndexAssigned} from '../chart-utils';

export interface XAxisData {
	columnIndex: number;
	data: RowOfAny;
}

export interface LegendData {
	existing: boolean;
	columnIndex: number;
	data: RowOfAny;
}

export const buildXAxis = (data: Array<RowOfAny>, columnIndexMap: ColumnIndexMap): XAxisData => {
	const columnIndex = isColumnIndexAssigned(columnIndexMap.timeGrouping) ? columnIndexMap.timeGrouping : columnIndexMap.bucketOn;
	return {
		columnIndex,
		data: [...new Set(data.map(row => row[columnIndex]))].sort((t1, t2) => {
			return `${t1 || ''}`.localeCompare(`${t2 || ''}`, void 0, {numeric: true});
		})
	};
};

export const buildYAxisOptions = () => {
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

export const buildLegendOptions = (legend: LegendData) => {
	return legend.existing ? {legend: {top: '5%', data: legend.data}} : {};
};

export const buildSeriesOptions = (options: {
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
				emphasis: {focus: 'series'},
				data: xAxis.data.map(xValue => {
					// eslint-disable-next-line
					const row = data.find(row => row[xAxis.columnIndex] == xValue && row[legend.columnIndex] == name);
					return row == null ? null : row[columnIndexMap.value];
				}),
				label: {show: true, position: 'top', formatter: ({value}: any) => formatToKGB(value)}
			};
		})
		: [{
			type,
			emphasis: {focus: 'series'},
			data: xAxis.data.map(xValue => {
				// eslint-disable-next-line
				const row = data.find(row => row[xAxis.columnIndex] == xValue);
				return row == null ? null : row[columnIndexMap.value];
			}),
			label: {show: true, position: 'top', formatter: ({value}: any) => formatToKGB(value)}
		}];
};

export const buildYAxisUseTimeGroupingGrowth = () => {
	return {
		yAxis: [{
			type: 'value', gridIndex: 0, axisLabel: {
				formatter: (value: any) => formatToKGB(value)
			}
		}, {
			type: 'value', gridIndex: 1, axisLabel: {
				formatter: (value: any) => `${value}%`
			}
		}]
	};
};

const computeGrowth = (previous: any, current: any): number | undefined => {
	if (previous == null || current == null) {
		return (void 0);
	}

	const previousValue = Number(previous);
	if (isNaN(previousValue) || previousValue === 0) {
		// cannot compare
		return (void 0);
	}

	const currentValue = Number(current);
	if (isNaN(currentValue)) {
		// cannot compare
		return (void 0);
	}

	return Number(((currentValue - previousValue) / previousValue * 100).toFixed(1));
};

export const buildSeriesOptionsUseTimeGroupingGrowth = (options: {
	data: Array<RowOfAny>;
	xAxis: XAxisData;
	legend: LegendData;
	columnIndexMap: ColumnIndexMap;
}) => {
	const seriesArray = buildSeriesOptions({...options, type: 'bar'});

	const doComputeGrowth = (value: any, index: number, array: RowOfAny): number | undefined => {
		if (index === 0) {
			return (void 0);
		}

		return computeGrowth(array[index - 1], value);
	};

	return [
		...seriesArray,
		...seriesArray.map(({data, ...rest}) => {
			return {
				...rest, xAxisIndex: 1, yAxisIndex: 1, type: 'line',
				data: data.reduce((data, value, index, array) => {
					data.push(doComputeGrowth(value, index, array));
					return data;
				}, [] as RowOfAny),
				label: {show: true, position: 'top', formatter: ({value}: any) => `${value}%`}
			};
		})
	];
};
