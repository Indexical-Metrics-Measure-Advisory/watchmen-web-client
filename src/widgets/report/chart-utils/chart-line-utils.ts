import {LINE, LineChartSettings} from '@/services/data/tuples/chart-def/chart-line';
import {ChartDataSet} from '@/services/data/tuples/chart-types';
import {ECharts} from '@/services/data/tuples/echarts/echarts-types';
import {Report} from '@/services/data/tuples/report-types';
import {BASE_COLORS_24} from '../../basic/colors';
import {buildAxis, buildLabel, buildSeriesData} from './bar-utils';
import {DefaultChartUtils} from './default-chart-utils';
import {buildEChartsGrid} from './grid-utils';
import {buildEChartsLegend} from './legend-utils';
import {buildEChartsTitle} from './title-utils';
import {buildToolbox} from './toolbox-utils';
import {ChartOptions} from './types';

export class ChartLineUtils extends DefaultChartUtils {
	constructor() {
		super(LINE);
	}

	async buildOptions(report: Report, dataset: ChartDataSet): Promise<ChartOptions> {
		const {chart} = report;
		const {indicators} = report;

		const legends = indicators.map((indicator, indicatorIndex) => {
			return {label: indicator.name || `Indicator ${indicatorIndex + 1}`, indicator, index: indicatorIndex};
		});
		const groups = this.buildDescartesByDimensions(report, dataset);
		const {xAxis, yAxis} = buildAxis(chart, groups);

		return {
			color: BASE_COLORS_24,
			title: buildEChartsTitle(chart as ECharts),
			tooltip: {
				trigger: 'axis',
				axisPointer: {type: 'shadow'}
			},
			legend: buildEChartsLegend(chart as ECharts, legends.map(item => item.label)),
			grid: buildEChartsGrid(chart as ECharts),
			xAxis,
			yAxis,
			series: legends.map(({label, index: indicatorIndex}) => {
				return {
					type: 'line',
					name: label,
					label: buildLabel(chart),
					smooth: (chart.settings as LineChartSettings).series?.smooth,
					data: buildSeriesData(chart, groups, indicatorIndex, this.formatNumber)
				};
			}),
			toolbox: buildToolbox(chart, report, dataset)
		};
	}
}