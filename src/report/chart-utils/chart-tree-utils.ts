import { BASE_COLORS_24 } from '../../basic-widgets/colors';
import { TREE, TreeChartSettings } from '../../services/tuples/chart-def/chart-tree';
import { ChartDataSet } from '../../services/tuples/chart-types';
import { ECharts } from '../../services/tuples/echarts/echarts-types';
import { Report } from '../../services/tuples/report-types';
import { cleanUselessValues } from './data-utils';
import { DefaultChartUtils } from './default-chart-utils';
import { buildEChartsTitle } from './title-utils';
import { buildToolbox } from './toolbox-utils';
import { ChartOptions } from './types';

export class ChartTreeUtils extends DefaultChartUtils {
	constructor() {
		super(TREE);
	}

	buildOptions(report: Report, dataset: ChartDataSet): ChartOptions {
		const { chart } = report;
		const { settings } = chart;
		const { grid, series } = (settings || {}) as TreeChartSettings;

		return cleanUselessValues({
			color: BASE_COLORS_24,
			title: buildEChartsTitle(chart as ECharts),
			tooltip: {
				trigger: 'item'
			},
			series: [ {
				type: 'tree',
				layout: series?.layout,
				orient: series?.orient,
				roam: series?.roam,
				top: grid?.position?.top,
				left: grid?.position?.left,
				bottom: grid?.position?.bottom,
				right: grid?.position?.right,
				symbolSize: 8,
				label: {
					position: 'right',
					verticalAlign: 'middle',
					align: 'left'
				},
				leaves: {
					label: {
						position: 'left',
						verticalAlign: 'middle',
						align: 'right'
					}
				},
				expandAndCollapse: true,
				data: this.buildTreeData(report, dataset)
			} ],
			toolbox: buildToolbox(chart)
		});
	}
}