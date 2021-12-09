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
		data: [
			...new Set(data.map(row => row[columnIndex]))].sort((t1, t2) => {
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