import {BAR} from '@/services/data/tuples/chart-def/chart-bar';
import {ChartDataSet} from '@/services/data/tuples/chart-types';
import {ECharts} from '@/services/data/tuples/echarts/echarts-types';
import {Report} from '@/services/data/tuples/report-types';
import {BASE_COLORS_24} from '../../basic/colors';
import {buildAxis, buildLabel, buildSeriesData} from './bar-utils';
import {cleanUselessValues} from './data-utils';
import {buildDecal} from './decal-utils';
import {DefaultChartUtils} from './default-chart-utils';
import {buildEChartsGrid} from './grid-utils';
import {buildEChartsLegend} from './legend-utils';
import {buildEChartsTitle} from './title-utils';
import {buildToolbox} from './toolbox-utils';
import {ChartOptions} from './types';

export class ChartBarUtils extends DefaultChartUtils {
	constructor() {
		super(BAR);
	}

	async buildOptions(report: Report, dataset: ChartDataSet): Promise<ChartOptions> {
		const {chart} = report;
		const {indicators} = report;

		const legends = indicators.map((indicator, indicatorIndex) => {
			return {label: indicator.name || `Indicator ${indicatorIndex + 1}`, indicator, index: indicatorIndex};
		});
		const groups = this.buildDescartesByDimensions(report, dataset);

		const {xAxis, yAxis} = buildAxis(chart, groups);

		return cleanUselessValues({
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
					type: 'bar',
					name: label,
					label: buildLabel(chart),
					data: buildSeriesData(chart, groups, indicatorIndex, this.formatNumber)
				};
			}),
			aria: buildDecal(chart),
			toolbox: buildToolbox(chart, report, dataset)
		});
	}
}
