import { BASE_COLORS_24 } from '../../basic-widgets/colors';
import { TREEMAP } from '../../services/tuples/chart-def/chart-treemap';
import { ChartDataSet } from '../../services/tuples/chart-types';
import { EChart } from '../../services/tuples/echarts/echarts-types';
import { Report } from '../../services/tuples/report-types';
import { DefaultChartUtils } from './default-chart-utils';
import { buildEChartTitle } from './title-utils';
import { ChartOptions } from './types';

export class ChartTreemapUtils extends DefaultChartUtils {
	constructor() {
		super(TREEMAP);
	}

	buildOptions(report: Report, dataset: ChartDataSet): ChartOptions {
		const { chart } = report;
		return {
			color: BASE_COLORS_24,
			title: buildEChartTitle(chart as EChart),
			tooltip: {
				trigger: 'item'
			},
			series: [ {
				name: report.name,
				type: 'treemap',
				leafDepth: 1,
				data: this.buildTreeData(report, dataset)
			} ]
		};
	}
}