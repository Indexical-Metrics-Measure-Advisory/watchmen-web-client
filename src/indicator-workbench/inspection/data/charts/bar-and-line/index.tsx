import {isNotNull} from '@/services/data/utils';
import {buildAriaOptions, buildColumnIndexMap} from '../chart-utils';
import {ChartParams} from '../types';
import {
	buildDataSeriesOptionsUseTimeRangeGrowth,
	buildLegend,
	buildLegendOptions,
	buildSeriesOptions,
	buildSeriesOptionsUseTimeGroupingGrowth,
	buildSeriesOptionsUseTimeRangeGrowth,
	buildXAxis,
	buildYAxisOptions,
	buildYAxisUseTimeGroupingGrowth,
	buildYAxisUseTimeRangeGrowth
} from './utils';

const build = (type: 'bar' | 'line') => (params: ChartParams) => {
	const {inspection, data, arithmetic} = params;

	const columnIndexMap = buildColumnIndexMap(inspection, arithmetic);
	const xAxis = buildXAxis(data, columnIndexMap);
	const legend = buildLegend(data, columnIndexMap);

	return {
		tooltip: {trigger: 'axis', axisPointer: {type: 'shadow'}},
		...buildLegendOptions(legend),
		xAxis: [{
			type: 'category', axisTick: {show: false}, data: xAxis.data
		}],
		...buildYAxisOptions(),
		series: buildSeriesOptions({data, legend, xAxis, columnIndexMap, type}),
		...buildAriaOptions()
	};
};

const buildWithTimeGroupingGrowth = (params: ChartParams) => {
	const {inspection, data, arithmetic} = params;

	const columnIndexMap = buildColumnIndexMap(inspection, arithmetic);
	const xAxis = buildXAxis(data, columnIndexMap);
	const legend = buildLegend(data, columnIndexMap);

	return {
		tooltip: {trigger: 'axis', axisPointer: {type: 'shadow'}},
		...buildLegendOptions(legend),
		grid: [
			{top: '15%', bottom: '35%', containLabel: true},
			{top: '68%', bottom: '5%', containLabel: true}
		],
		xAxis: [
			{type: 'category', gridIndex: 0, axisTick: {show: false}, data: xAxis.data},
			{type: 'category', gridIndex: 1, axisTick: {show: false}, data: xAxis.data}
		],
		...buildYAxisUseTimeGroupingGrowth(),
		series: buildSeriesOptionsUseTimeGroupingGrowth({data, legend, xAxis, columnIndexMap}),
		...buildAriaOptions()
	};
};

export const barWithTimeRangeGrowthBuild = (params: ChartParams) => {
	const {inspection, data, arithmetic} = params;

	const columnIndexMap = buildColumnIndexMap(inspection, arithmetic);
	const xAxis = buildXAxis(data, columnIndexMap);
	const legend = buildLegend(data, columnIndexMap);

	const timelineData = [
		...new Set(data.map(row => row[columnIndexMap.timeRange]).filter(isNotNull))
	].sort((r1, r2) => `${r1}`.localeCompare(`${r2}`, void 0, {numeric: true}));
	const [, ...restRanges] = timelineData;

	const x = {
		timeline: {
			axisType: 'category',
			data: restRanges,
			label: {formatter: (value: any) => `${value}`}
		},
		tooltip: {trigger: 'axis', axisPointer: {type: 'shadow'}},
		...buildLegendOptions(legend),
		grid: [
			{top: '15%', bottom: '45%', containLabel: true},
			{top: '58%', bottom: '20%', containLabel: true}
		],
		xAxis: [
			{type: 'category', gridIndex: 0, axisTick: {show: false}, data: xAxis.data},
			{type: 'category', gridIndex: 1, axisTick: {show: false}, data: xAxis.data}
		],
		...buildYAxisUseTimeRangeGrowth(),
		series: buildSeriesOptionsUseTimeRangeGrowth({data, legend, xAxis, columnIndexMap}),
		options: timelineData.map((range, index, array) => {
			if (index === 0) {
				return null;
			}
			return {
				series: buildDataSeriesOptionsUseTimeRangeGrowth({
					data,
					legend,
					xAxis,
					columnIndexMap,
					previousRangeValue: array[index - 1],
					currentRangeValue: range
				})
			};
		}).filter(isNotNull),
		...buildAriaOptions()
	};

	console.log(JSON.stringify(x));
	return x;
};

export const barBuild = build('bar');
export const barWithTimeGroupingGrowthBuild = buildWithTimeGroupingGrowth;
export const lineBuild = build('line');