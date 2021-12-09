import {buildAriaOptions, buildColumnIndexMap, buildLegend, buildSeries, buildXAxis, buildYAxis} from '../chart-utils';
import {createChartComponent} from '../widgets/chart';

export const Line = createChartComponent(params => {
	const {inspection, data} = params;

	const columnIndexMap = buildColumnIndexMap(inspection);
	const xAxis = buildXAxis(data, columnIndexMap);
	const legend = buildLegend(data, columnIndexMap);

	return {
		tooltip: {trigger: 'axis', axisPointer: {type: 'shadow'}},
		...(legend.existing ? {legend: {data: legend.data}} : {}),
		xAxis: [{
			type: 'category', axisTick: {show: false}, data: xAxis.data
		}],
		...buildYAxis(),
		series: buildSeries({data, legend, xAxis, columnIndexMap, type: 'line'}),
		...buildAriaOptions()
	};
});