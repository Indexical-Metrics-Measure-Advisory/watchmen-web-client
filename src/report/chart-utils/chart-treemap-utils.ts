import {BASE_COLORS_24} from '../../basic-widgets/colors';
import {TREEMAP, TreemapChartSettings} from '../../services/tuples/chart-def/chart-treemap';
import {ChartDataSet} from '../../services/tuples/chart-types';
import {ECharts} from '../../services/tuples/echarts/echarts-types';
import {Report} from '../../services/tuples/report-types';
import {cleanUselessValues} from './data-utils';
import {DefaultChartUtils} from './default-chart-utils';
import {buildEChartsTitle} from './title-utils';
import {buildToolbox} from './toolbox-utils';
import {ChartOptions} from './types';

export class ChartTreemapUtils extends DefaultChartUtils {
	constructor() {
		super(TREEMAP);
	}

	buildOptions(report: Report, dataset: ChartDataSet): ChartOptions {
		const {chart} = report;
		const {settings} = chart;
		const {grid, series} = (settings || {}) as TreemapChartSettings;

		return cleanUselessValues({
			color: BASE_COLORS_24,
			title: buildEChartsTitle(chart as ECharts),
			tooltip: {
				trigger: 'item'
			},
			series: [{
				name: report.name,
				type: 'treemap',
				roam: series?.roam,
				top: (grid?.position?.top != null) ? `${grid?.position?.top}%` : (void 0),
				right: (grid?.position?.right != null) ? `${grid?.position?.right}%` : (void 0),
				left: (grid?.position?.left != null) ? `${grid?.position?.left}%` : (void 0),
				bottom: (grid?.position?.bottom != null) ? `${grid?.position?.bottom}%` : (void 0),
				leafDepth: 1,
				data: this.buildTreeData(report, dataset)
			}],
			toolbox: buildToolbox(chart, report, dataset)
		});
	}
}