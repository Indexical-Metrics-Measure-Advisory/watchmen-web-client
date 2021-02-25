import { BASE_COLORS_24 } from '../../basic-widgets/colors';
import { DOUGHNUT } from '../../services/tuples/chart-def/chart-doughnut';
import { ChartDataSet } from '../../services/tuples/chart-types';
import { EChart } from '../../services/tuples/echarts/echarts-types';
import { Report } from '../../services/tuples/report-types';
import { DefaultChartUtils } from './default-chart-utils';
import { buildEChartLegend } from './legend-utils';
import { buildEChartTitle } from './title-utils';
import { ChartOptions } from './types';

export class ChartDoughnutUtils extends DefaultChartUtils {
	constructor() {
		super(DOUGHNUT);
	}

	buildOptions(report: Report, dataset: ChartDataSet): ChartOptions {
		const { chart } = report;
		// only one indicator allowed
		const { indicators: [ indicator ] } = report;

		const groups = this.buildDescartesByDimensions(report, dataset);

		return {
			color: BASE_COLORS_24,
			title: buildEChartTitle(chart as EChart),
			tooltip: {
				trigger: 'item'
			},
			legend: buildEChartLegend(chart as EChart, groups.map(({ value }) => value)),
			series: [ {
				name: indicator.name,
				type: 'pie',
				radius: [ '30%', '70%' ],
				center: [ '50%', '50%' ],
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