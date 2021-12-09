import {
	buildAriaOptions,
	buildColumnIndexMap,
	buildLegend,
	buildLegendOptions,
	buildSeriesOptions,
	buildXAxis,
	buildYAxisOptions
} from '../chart-utils';
import {createChartComponent} from '../widgets/chart';

export const Line = createChartComponent(params => {
	const {inspection, data} = params;

	const columnIndexMap = buildColumnIndexMap(inspection);
	const xAxis = buildXAxis(data, columnIndexMap);
	const legend = buildLegend(data, columnIndexMap);

	return {
		tooltip: {trigger: 'axis', axisPointer: {type: 'shadow'}},
		...buildLegendOptions(legend),
		xAxis: [{
			type: 'category', axisTick: {show: false}, data: xAxis.data
		}],
		...buildYAxisOptions(),
		series: buildSeriesOptions({data, legend, xAxis, columnIndexMap, type: 'line'}),
		...buildAriaOptions()
	};
});