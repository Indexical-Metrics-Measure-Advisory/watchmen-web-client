import {BarChart} from './chart-def/chart-bar';
import {CountChart} from './chart-def/chart-count';
import {DoughnutChart} from './chart-def/chart-doughnut';
import {LineChart} from './chart-def/chart-line';
import {MapChart} from './chart-def/chart-map';
import {NightingaleChart} from './chart-def/chart-nightingale';
import {PieChart} from './chart-def/chart-pie';
import {ScatterChart} from './chart-def/chart-scatter';
import {SunburstChart} from './chart-def/chart-sunburst';
import {TreeChart} from './chart-def/chart-tree';
import {TreemapChart} from './chart-def/chart-treemap';
import {Chart, ChartType} from './chart-types';

export const isBarChart = (chart: Chart): chart is BarChart => {
	return chart.type === ChartType.BAR;
};
export const isCountChart = (chart: Chart): chart is CountChart => {
	return chart.type === ChartType.COUNT;
};
export const isDoughnutChart = (chart: Chart): chart is DoughnutChart => {
	return chart.type === ChartType.DOUGHNUT;
};
export const isLineChart = (chart: Chart): chart is LineChart => {
	return chart.type === ChartType.LINE;
};
export const isMapChart = (chart: Chart): chart is MapChart => {
	return chart.type === ChartType.MAP;
};
export const isNightingaleChart = (chart: Chart): chart is NightingaleChart => {
	return chart.type === ChartType.NIGHTINGALE;
};
export const isPieChart = (chart: Chart): chart is PieChart => {
	return chart.type === ChartType.PIE;
};
export const isScatterChart = (chart: Chart): chart is ScatterChart => {
	return chart.type === ChartType.SCATTER;
};
export const isSunburstChart = (chart: Chart): chart is SunburstChart => {
	return chart.type === ChartType.SUNBURST;
};
export const isTreeChart = (chart: Chart): chart is TreeChart => {
	return chart.type === ChartType.TREE;
};
export const isTreemapChart = (chart: Chart): chart is TreemapChart => {
	return chart.type === ChartType.TREEMAP;
};