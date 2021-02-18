import { BASE_COLORS_24 } from '../../basic-widgets/colors';
import { DOUGHNUT } from '../../services/tuples/chart-def/chart-doughnut';
import { ChartDataSet } from '../../services/tuples/chart-types';
import { Report } from '../../services/tuples/report-types';
import { DefaultChartUtils } from './default-chart-utils';
import { ChartOptions } from './types';

export class ChartDoughnutUtils extends DefaultChartUtils {
	constructor() {
		super(DOUGHNUT);
	}

	buildOptions(report: Report, dataset: ChartDataSet): ChartOptions {
		// only one indicator allowed
		const { indicators: [ indicator ] } = report;

		const groups = this.buildDescartesByDimensions(report, dataset);

		return {
			color: BASE_COLORS_24,
			tooltip: {
				trigger: 'item'
			},
			legend: { data: groups.map(({ value }) => value) },
			series: [ {
				name: indicator.column,
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