import { BASE_COLORS_24 } from '../../basic-widgets/colors';
import { BAR } from '../../services/tuples/chart-def/chart-bar';
import { ChartDataSet } from '../../services/tuples/chart-types';
import { ECharts } from '../../services/tuples/echarts/echarts-types';
import { Report } from '../../services/tuples/report-types';
import { cleanUselessValues } from './data-utils';
import { DefaultChartUtils } from './default-chart-utils';
import { buildEChartsGrid } from './grid-utils';
import { buildEChartsLegend } from './legend-utils';
import { buildEChartsTitle } from './title-utils';
import { ChartOptions } from './types';
import { buildEChartsXAxis } from './xaxis-utils';
import { buildEChartsYAxis } from './yaxis-utils';

export class ChartBarUtils extends DefaultChartUtils {
	constructor() {
		super(BAR);
	}

	buildOptions(report: Report, dataset: ChartDataSet): ChartOptions {
		const { chart } = report;
		const { indicators } = report;

		const legends = indicators.map((indicator, indicatorIndex) => {
			return { label: indicator.name || `Indicator ${indicatorIndex + 1}`, indicator, index: indicatorIndex };
		});
		const groups = this.buildDescartesByDimensions(report, dataset);

		return cleanUselessValues({
			color: BASE_COLORS_24,
			title: buildEChartsTitle(chart as ECharts),
			tooltip: {
				trigger: 'axis',
				axisPointer: { type: 'shadow' }
			},
			legend: buildEChartsLegend(chart as ECharts, legends.map(item => item.label)),
			grid: buildEChartsGrid(chart as ECharts),
			xAxis: [ buildEChartsXAxis(chart as ECharts, groups.map(({ value }) => value)) ],
			yAxis: [ buildEChartsYAxis(chart as ECharts) ],
			series: legends.map(({ index: indicatorIndex }) => {
				return {
					type: 'bar',
					label: {
						show: true,
						position: 'insideTop',
						distance: 15,
						verticalAlign: 'middle',
						rotate: 0
					},
					data: groups.map(({ row }) => this.formatNumber(row[indicatorIndex]))
				};
			})
		});
	}
}
