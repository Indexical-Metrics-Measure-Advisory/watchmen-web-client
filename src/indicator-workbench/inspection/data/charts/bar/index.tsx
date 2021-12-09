import {InspectMeasureOn} from '@/services/data/tuples/inspection-types';
import {buildLegend, buildXAxis} from '../chart-utils';
import {createChartComponent} from '../widgets/chart';

interface ColumnIndexMap {
	timeGrouping: number;
	bucketOn: number;
	value: number;
	timeRange: number;
}

export const Bar = createChartComponent(params => {
	const {inspection, data} = params;

	const columnIndexMap: ColumnIndexMap = {timeGrouping: -1, bucketOn: -1, timeRange: -1, value: -1};
	if (inspection.measureOnTimeFactorId != null) {
		// has time measure
		if (inspection.measureOn == null || inspection.measureOn === InspectMeasureOn.NONE) {
			// no bucket measure, time measure is on column index 0
			columnIndexMap.timeGrouping = 0;
		} else {
			// time measure is on column index 1
			columnIndexMap.timeGrouping = 1;
		}
	} else {
		// no time measure, then has bucket measure
		columnIndexMap.bucketOn = 0;
	}
	if (inspection.timeRangeFactorId != null) {
		// time range column is following
		columnIndexMap.timeRange = columnIndexMap.timeGrouping === -1 ? (columnIndexMap.bucketOn + 1) : (columnIndexMap.timeGrouping + 1);
	}
	// value columns follow
	columnIndexMap.value = columnIndexMap.timeRange === -1
		? (columnIndexMap.timeGrouping === -1 ? columnIndexMap.bucketOn : columnIndexMap.timeGrouping) + 1
		: columnIndexMap.timeRange + 1;

	const xAxisColumnIndex = columnIndexMap.timeGrouping === -1 ? columnIndexMap.bucketOn : columnIndexMap.timeGrouping;
	const xAxis = buildXAxis(data, xAxisColumnIndex);
	const legendExisting = columnIndexMap.timeGrouping !== -1 && columnIndexMap.bucketOn !== -1;
	const legendColumnIndex = columnIndexMap.bucketOn;
	const legendData = buildLegend(data, legendColumnIndex);
	const series = legendExisting
		? legendData.map(name => {
			return {
				name, type: 'bar', barGap: 0, emphasis: {focus: 'series'},
				data: xAxis.map(xValue => {
					// eslint-disable-next-line
					const row = data.find(row => row[xAxisColumnIndex] == xValue && row[legendColumnIndex] == name);
					return row == null ? null : row[columnIndexMap.value];
				})
			};
		})
		: [{
			type: 'bar', barGap: 0, emphasis: {focus: 'series'},
			data: xAxis.map(xValue => {
				// eslint-disable-next-line
				const row = data.find(row => row[xAxisColumnIndex] == xValue);
				return row == null ? null : row[columnIndexMap.value];
			})
		}];

	return {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		...(legendExisting ? {legend: {data: legendData}} : {}),
		xAxis: [{
			type: 'category',
			axisTick: {show: false},
			data: xAxis
		}],
		yAxis: [{type: 'value'}],
		series
	};
});