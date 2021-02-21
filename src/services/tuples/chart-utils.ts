import { CountChart } from './chart-def/chart-count';
import { Chart, ChartType } from './chart-types';

export const isCountChart = (chart: Chart): chart is CountChart => {
	return chart.type === ChartType.COUNT;
};