import {buildAriaOptions, buildColumnIndexMap} from '../chart-utils';
import {ChartParams} from '../types';
import {createChartComponent} from '../widgets/chart';
import {buildLegend, buildLegendOptions, buildSeriesOptions, buildXAxis, buildYAxisOptions} from './utils';

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
const createComponent = (type: 'bar' | 'line') => createChartComponent(build(type));

export const barBuild = build('bar');
export const Bar = createComponent('bar');

export const lineBuild = build('line');
export const Line = createComponent('line');