import { Chart } from '../chart-types';
import {
	isBarChart,
	isDoughnutChart,
	isLineChart,
	isNightingaleChart,
	isPieChart,
	isScatterChart
} from '../chart-utils';
import { EChart } from './echarts-types';

/**
 * any chart is echart now. 2020/02/25
 */
export const isEChart = (chart: Chart): chart is EChart => {
	return true;
};

export const canHoldTitle = (chart: Chart): boolean => {
	return isEChart(chart);
};
export const canHoldLegend = (chart: Chart): boolean => {
	return isBarChart(chart)
		|| isDoughnutChart(chart)
		|| isLineChart(chart)
		|| isNightingaleChart(chart)
		|| isPieChart(chart)
		|| isScatterChart(chart);
};