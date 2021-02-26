import { BASE_COLORS_24 } from '../../basic-widgets/colors';
import { TREEMAP, TreemapChartSettings } from '../../services/tuples/chart-def/chart-treemap';
import { ChartDataSet } from '../../services/tuples/chart-types';
import { ECharts } from '../../services/tuples/echarts/echarts-types';
import { Report } from '../../services/tuples/report-types';
import { cleanUselessValues } from './data-utils';
import { DefaultChartUtils } from './default-chart-utils';
import { buildEChartsTitle } from './title-utils';
import { ChartOptions } from './types';

export class ChartTreemapUtils extends DefaultChartUtils {
	constructor() {
		super(TREEMAP);
	}

	buildOptions(report: Report, dataset: ChartDataSet): ChartOptions {
		const { chart } = report;
		const { settings } = chart;
		const { grid, series } = (settings || {}) as TreemapChartSettings;

		return cleanUselessValues({
			color: BASE_COLORS_24,
			title: buildEChartsTitle(chart as ECharts),
			tooltip: {
				trigger: 'item'
			},
			series: [ {
				name: report.name,
				type: 'treemap',
				roam: series?.roam,
				top: grid?.position?.top,
				left: grid?.position?.left,
				bottom: grid?.position?.bottom,
				right: grid?.position?.right,
				leafDepth: 1,
				data: this.buildTreeData(report, dataset)
			} ]
		});
	}
}