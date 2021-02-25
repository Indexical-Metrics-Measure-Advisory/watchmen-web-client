import { BASE_COLORS_24 } from '../../basic-widgets/colors';
import { PIE } from '../../services/tuples/chart-def/chart-pie';
import { ChartDataSet } from '../../services/tuples/chart-types';
import { ECharts } from '../../services/tuples/echarts/echarts-types';
import { Report } from '../../services/tuples/report-types';
import { DefaultChartUtils } from './default-chart-utils';
import { buildEChartsLegend } from './legend-utils';
import { buildEChartsTitle } from './title-utils';
import { ChartOptions } from './types';

export class ChartPieUtils extends DefaultChartUtils {
	constructor() {
		super(PIE);
	}

	buildOptions(report: Report, dataset: ChartDataSet): ChartOptions {
		const { chart } = report;
		// only one indicator allowed
		const { indicators: [ indicator ] } = report;

		const groups = this.buildDescartesByDimensions(report, dataset);

		return {
			color: BASE_COLORS_24,
			title: buildEChartsTitle(chart as ECharts),
			tooltip: {
				trigger: 'item'
			},
			legend: buildEChartsLegend(chart as ECharts, groups.map(({ value }) => value)),
			series: [ {
				name: indicator.name,
				type: 'pie',
				center: [ '50%', '50%' ],
				label: { formatter: '{b}: {c}, {d}%' },
				data: groups.map(({ value, row }) => {
					return {
						name: value,
						value: this.formatNumber(row[0] || 0)
					};
				})
			} ]
		};
	}
}