import { BASE_COLORS_24 } from '../../basic-widgets/colors';
import { BAR, BarChartSettings } from '../../services/tuples/chart-def/chart-bar';
import { ChartDataSet } from '../../services/tuples/chart-types';
import { ECharts } from '../../services/tuples/echarts/echarts-types';
import { Report } from '../../services/tuples/report-types';
import { buildAxis, buildLabel } from './bar-utils';
import { cleanUselessValues } from './data-utils';
import { buildDecal } from './decal-utils';
import { DefaultChartUtils } from './default-chart-utils';
import { buildEChartsGrid } from './grid-utils';
import { buildEChartsLegend } from './legend-utils';
import { buildEChartsTitle } from './title-utils';
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

		const { xAxis, yAxis } = buildAxis(chart, groups);

		return cleanUselessValues({
			color: BASE_COLORS_24,
			title: buildEChartsTitle(chart as ECharts),
			tooltip: {
				trigger: 'axis',
				axisPointer: { type: 'shadow' }
			},
			legend: buildEChartsLegend(chart as ECharts, legends.map(item => item.label)),
			grid: buildEChartsGrid(chart as ECharts),
			xAxis,
			yAxis,
			series: legends.map(({ index: indicatorIndex }) => {
				return {
					type: 'bar',
					label: buildLabel(chart),
					data: groups.map(({ row }) => {
						const def = (chart.settings as BarChartSettings)?.label;
						const value = parseFloat(`${row[indicatorIndex]}`);
						if (!isNaN(value) && def?.valueAsPercentage) {
							return this.formatNumber(value / 100, def.fractionDigits || 0);
						} else {
							return this.formatNumber(row[indicatorIndex]);
						}
					})
				};
			}),
			aria: buildDecal(chart)
		});
	}
}
