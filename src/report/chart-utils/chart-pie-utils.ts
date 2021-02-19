import { BASE_COLORS_24 } from '../../basic-widgets/colors';
import { PIE } from '../../services/tuples/chart-def/chart-pie';
import { ChartDataSet } from '../../services/tuples/chart-types';
import { Report } from '../../services/tuples/report-types';
import { DefaultChartUtils } from './default-chart-utils';
import { ChartOptions } from './types';

export class ChartPieUtils extends DefaultChartUtils {
	constructor() {
		super(PIE);
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
				name: indicator.name,
				type: 'pie',
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