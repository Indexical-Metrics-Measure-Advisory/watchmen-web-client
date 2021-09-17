import {BarChartSettings} from '@/services/data/tuples/chart-def/chart-bar';
import {PieChartSettings} from '@/services/data/tuples/chart-def/chart-pie';
import {
	isBarChart,
	isDoughnutChart,
	isNightingaleChart,
	isPieChart,
	isSunburstChart
} from '@/services/data/tuples/chart-utils';
import {ECharts} from '@/services/data/tuples/echarts/echarts-types';

export const buildDecal = (chart: ECharts, aria?: any) => {
	if (isBarChart(chart) || isPieChart(chart) || isDoughnutChart(chart) || isNightingaleChart(chart) || isSunburstChart(chart)) {
		let {settings} = chart;

		if (!settings) {
			settings = {};
			chart.settings = settings;
		}

		if ((settings as BarChartSettings | PieChartSettings).decal) {
			if (aria) {
				aria.enabled = true;
				aria.decal = {show: true};
			} else {
				aria = {
					enabled: true,
					decal: {show: true}
				};
			}
		}
	}

	return aria;
};