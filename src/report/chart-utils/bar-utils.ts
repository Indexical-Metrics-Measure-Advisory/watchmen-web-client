import { BarChartSettings } from '../../services/tuples/chart-def/chart-bar';
import { LineChartSettings } from '../../services/tuples/chart-def/chart-line';
import { ECharts } from '../../services/tuples/echarts/echarts-types';
import { buildEChartsXAxis } from './xaxis-utils';
import { buildEChartsYAxis } from './yaxis-utils';

export const buildAxis = (chart: ECharts, groups: Array<{ value: any }>) => {
	let { settings } = chart;

	if (!settings) {
		settings = {};
		chart.settings = settings;
	}

	const { series } = settings as (BarChartSettings | LineChartSettings);

	const xAxis = [ buildEChartsXAxis(chart as ECharts, groups.map(({ value }) => value)) ];
	const yAxis = [ buildEChartsYAxis(chart as ECharts) ];

	return (series?.transformAxis || false) ? { xAxis: yAxis, yAxis: xAxis } : { xAxis, yAxis };
};