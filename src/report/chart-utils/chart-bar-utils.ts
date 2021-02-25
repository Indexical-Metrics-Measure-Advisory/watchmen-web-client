import { BASE_COLORS_24 } from '../../basic-widgets/colors';
import { BAR } from '../../services/tuples/chart-def/chart-bar';
import { ChartDataSet } from '../../services/tuples/chart-types';
import { EChart } from '../../services/tuples/echarts/echarts-types';
import { Report } from '../../services/tuples/report-types';
import { cleanUselessValues } from './data-utils';
import { DefaultChartUtils } from './default-chart-utils';
import { buildEChartGrid } from './grid-utils';
import { buildEChartLegend } from './legend-utils';
import { buildEChartTitle } from './title-utils';
import { ChartOptions } from './types';

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
			title: buildEChartTitle(chart as EChart),
			tooltip: {
				trigger: 'axis',
				axisPointer: { type: 'shadow' }
			},
			legend: buildEChartLegend(chart as EChart, legends.map(item => item.label)),
			grid: buildEChartGrid(chart as EChart),
			xAxis: [ {
				type: 'category',
				axisTick: { show: false },
				data: groups.map(({ value }) => value)
			} ],
			yAxis: [ { type: 'value' } ],
			series: legends.map(({ label, index: indicatorIndex }) => {
				return {
					name: label,
					type: 'bar',
					barGap: 0,
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
