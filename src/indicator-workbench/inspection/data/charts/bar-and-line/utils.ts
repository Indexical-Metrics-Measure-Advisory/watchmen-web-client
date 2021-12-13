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
				})
			};
		})
		: [{
			type,
			emphasis: {focus: 'series'},
			data: xAxis.data.map(xValue => {
				// eslint-disable-next-line
				const row = data.find(row => row[xAxis.columnIndex] == xValue);
				return row == null ? null : row[columnIndexMap.value];
			})
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
				}, [] as RowOfAny)
			};
		})
	];
};

export const buildYAxisUseTimeRangeGrowth = () => {
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

export const buildSeriesOptionsUseTimeRangeGrowth = (options: {
	data: Array<RowOfAny>;
	xAxis: XAxisData;
	legend: LegendData;
	columnIndexMap: ColumnIndexMap;
}) => {
	const {legend} = options;

	const seriesArray = legend.existing
		? legend.data.map(name => ({name, type: 'bar', emphasis: {focus: 'series'}}))
		: [{type: 'bar', emphasis: {focus: 'series'}}];

	return [
		...seriesArray,
		...seriesArray.map((options: any) => {
			return {...options, xAxisIndex: 1, yAxisIndex: 1};
		})
	];
};

export const buildDataSeriesOptionsUseTimeRangeGrowth = (options: {
	data: Array<RowOfAny>;
	xAxis: XAxisData;
	legend: LegendData;
	columnIndexMap: ColumnIndexMap;
	previousRangeValue: any;
	currentRangeValue: any;
}) => {
	const {data, xAxis, legend, columnIndexMap, previousRangeValue, currentRangeValue} = options;

	const seriesData = legend.existing
		? legend.data.map(name => {
			return {
				data: xAxis.data.map(xValue => {
					// eslint-disable-next-line
					const currentRow = data.find(row => row[xAxis.columnIndex] == xValue && row[legend.columnIndex] == name && row[columnIndexMap.timeRange] == currentRangeValue);
					// eslint-disable-next-line
					const previousRow = data.find(row => row[xAxis.columnIndex] == xValue && row[legend.columnIndex] == name && row[columnIndexMap.timeRange] == previousRangeValue);
					return [
						currentRow == null ? null : currentRow[columnIndexMap.value],
						previousRow == null ? null : previousRow[columnIndexMap.value]
					];
				})
			};
		})
		: [{
			data: xAxis.data.map(xValue => {
				// eslint-disable-next-line
				const currentRow = data.find(row => row[xAxis.columnIndex] == xValue && row[columnIndexMap.timeRange] == currentRangeValue);
				// eslint-disable-next-line
				const previousRow = data.find(row => row[xAxis.columnIndex] == xValue && row[columnIndexMap.timeRange] == previousRangeValue);
				return [
					currentRow == null ? null : currentRow[columnIndexMap.value],
					previousRow == null ? null : previousRow[columnIndexMap.value]
				];
			})
		}];

	return seriesData.map(({data}) => {
		return {data: data.map(([currentValue, previousValue]) => [currentValue, computeGrowth(currentValue, previousValue)])};
	}).reduce((data, {data: row}, index, array) => {
		const currentRow = row.map(([currentValue]) => currentValue);
		const growthRow = row.map(([, growth]) => growth);
		data[index] = {data: currentRow};
		data[index + array.length] = {data: growthRow};
		return data;
	}, [] as Array<{ data: RowOfAny }>);
};