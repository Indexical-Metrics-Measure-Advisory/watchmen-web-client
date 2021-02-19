import { BASE_COLORS_24 } from '../../basic-widgets/colors';
import { LINE } from '../../services/tuples/chart-def/chart-line';
import { ChartDataSet } from '../../services/tuples/chart-types';
import { Report } from '../../services/tuples/report-types';
import { DefaultChartUtils } from './default-chart-utils';
import { ChartOptions } from './types';

export class ChartLineUtils extends DefaultChartUtils {
	constructor() {
		super(LINE);
	}

	buildOptions(report: Report, dataset: ChartDataSet): ChartOptions {
		const { indicators } = report;

		const legends = indicators.map((indicator, indicatorIndex) => {
			return { label: indicator.name, indicator, index: indicatorIndex };
		});
		const groups = this.buildDescartesByDimensions(report, dataset);

		return {
			color: BASE_COLORS_24,
			tooltip: {
				trigger: 'axis',
				axisPointer: { type: 'shadow' }
			},
			legend: { data: legends.map(item => item.label) },
			xAxis: [ {
				type: 'category',
				axisTick: { show: false },
				data: groups.map(({ value }) => value)
			} ],
			yAxis: [ { type: 'value' } ],
			series: legends.map(({ label, index: indicatorIndex }) => {
				return {
					name: label,
					type: 'line',
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
		};
	}
}