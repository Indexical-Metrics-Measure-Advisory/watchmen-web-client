import { BASE_COLORS_24 } from '../../basic-widgets/colors';
import { PIE } from '../../services/tuples/chart-def/chart-pie';
import { ChartDataSet } from '../../services/tuples/chart-types';
import { ECharts } from '../../services/tuples/echarts/echarts-types';
import { Report } from '../../services/tuples/report-types';
import { cleanUselessValues } from './data-utils';
import { buildDecal } from './decal-utils';
import { DefaultChartUtils } from './default-chart-utils';
import { buildEChartsLegend } from './legend-utils';
import { buildEChartsPie, buildSeriesData } from './pie-utils';
import { buildEChartsTitle } from './title-utils';
import { buildToolbox } from './toolbox-utils';
import { ChartOptions } from './types';

export class ChartPieUtils extends DefaultChartUtils {
	constructor() {
		super(PIE);
	}

	buildOptions(report: Report, dataset: ChartDataSet): ChartOptions {
		const { chart } = report;
		// only one indicator allowed
		// const { indicators: [ indicator ] } = report;

		const groups = this.buildDescartesByDimensions(report, dataset);

		const data = buildSeriesData(chart, groups, this.formatNumber);

		return cleanUselessValues({
			color: BASE_COLORS_24,
			title: buildEChartsTitle(chart as ECharts),
			tooltip: {
				trigger: 'item'
			},
			legend: buildEChartsLegend(chart as ECharts, groups.map(({ value }) => value)),
			series: [ buildEChartsPie(chart as ECharts, data, {
				type: 'pie',
				insideRadius: 0,
				outsideRadius: '75%'
			}) ],
			aria: buildDecal(chart),
			toolbox: buildToolbox(chart)
		});
	}
}
