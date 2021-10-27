import {TREE, TreeChartSettings} from '@/services/data/tuples/chart-def/chart-tree';
import {ChartDataSet} from '@/services/data/tuples/chart-types';
import {ECharts} from '@/services/data/tuples/echarts/echarts-types';
import {Report} from '@/services/data/tuples/report-types';
import {BASE_COLORS_24} from '../../basic/colors';
import {cleanUselessValues} from './data-utils';
import {DefaultChartUtils} from './default-chart-utils';
import {buildEChartsTitle} from './title-utils';
import {buildToolbox} from './toolbox-utils';
import {ChartOptions} from './types';

export class ChartTreeUtils extends DefaultChartUtils {
	constructor() {
		super(TREE);
	}

	async buildOptions(report: Report, dataset: ChartDataSet): Promise<ChartOptions> {
		const {chart} = report;
		const {settings} = chart;
		const {grid, series} = (settings || {}) as TreeChartSettings;

		return cleanUselessValues({
			color: BASE_COLORS_24,
			title: buildEChartsTitle(chart as ECharts),
			tooltip: {
				trigger: 'item'
			},
			series: [{
				type: 'tree',
				layout: series?.layout,
				orient: series?.orient,
				roam: series?.roam,
				top: (grid?.position?.top != null) ? `${grid?.position?.top}%` : (void 0),
				right: (grid?.position?.right != null) ? `${grid?.position?.right}%` : (void 0),
				left: (grid?.position?.left != null) ? `${grid?.position?.left}%` : (void 0),
				bottom: (grid?.position?.bottom != null) ? `${grid?.position?.bottom}%` : (void 0),
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
			}],
			toolbox: buildToolbox(chart, report, dataset)
		});
	}
}