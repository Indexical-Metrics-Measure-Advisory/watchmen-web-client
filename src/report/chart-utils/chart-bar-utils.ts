import { BASE_COLORS_24 } from '../../basic-widgets/colors';
import { ChartDataSet } from '../../services/tuples/chart-types';
import { Report } from '../../services/tuples/report-types';
import { DefaultChartUtils } from './default-chart-utils';

export class BarChartUtils extends DefaultChartUtils {
	buildOptions(report: Report, dataset: ChartDataSet): echarts.EChartOption | echarts.EChartsResponsiveOption {
		const { indicators } = report;

		const legends = indicators.map((indicator, indicatorIndex) => {
			return { label: indicator.column, indicator, index: indicatorIndex };
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
		};
	}
}
