import { CountChart } from './chart-def/chart-count';
import { PieChart } from './chart-def/chart-pie';
import { Chart, ChartType } from './chart-types';
import { EChart } from './echarts-types';

export const isCountChart = (chart: Chart): chart is CountChart => {
	return chart.type === ChartType.COUNT;
};
export const isPieChart = (chart: Chart): chart is PieChart => {
	return chart.type === ChartType.PIE;
};

export const isEChart = (chart: Chart): chart is EChart => {
	return chart.type !== ChartType.COUNT;
};