import { BASE_COLORS_24 } from '../../basic-widgets/colors';
import { SUNBURST } from '../../services/tuples/chart-def/chart-sunburst';
import { ChartDataSet } from '../../services/tuples/chart-types';
import { ECharts } from '../../services/tuples/echarts/echarts-types';
import { Report } from '../../services/tuples/report-types';
import { DefaultChartUtils } from './default-chart-utils';
import { buildEChartsTitle } from './title-utils';
import { ChartOptions } from './types';

export class ChartSunburstUtils extends DefaultChartUtils {
	constructor() {
		super(SUNBURST);
	}

	buildOptions(report: Report, dataset: ChartDataSet): ChartOptions {
		const { chart } = report;
		return {
			color: BASE_COLORS_24,
			title: buildEChartsTitle(chart as ECharts),
			tooltip: {
				trigger: 'item'
			},
			series: [ {
				type: 'sunburst',
				radius: [ '10%', '90%' ],
				data: this.buildTreeData(report, dataset)
			} ]
		};
	}
}