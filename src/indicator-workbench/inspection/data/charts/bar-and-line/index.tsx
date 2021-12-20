import {buildAriaOptions, buildColumnIndexMap} from '../chart-utils';
import {ChartParams} from '../types';
import {
	buildLegend,
	buildLegendOptions,
	buildSeriesOptions,
	buildSeriesOptionsUseTimeGroupingGrowth,
	buildXAxis,
	buildYAxisOptions,
	buildYAxisUseTimeGroupingGrowth
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
			{
				top: '68%', bottom: '5%', containLabel: true,
				tooltip: {
					trigger: 'item', formatter: ({name, seriesName, value, marker = ''}: any) => {
						seriesName = legend.existing ? `, ${seriesName}` : '';
						return `${marker}${name}${seriesName} <b>${value}%</b>`;
					}
				}
			}
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

export const barBuild = build('bar');
export const barWithTimeGroupingGrowthBuild = buildWithTimeGroupingGrowth;
export const lineBuild = build('line');