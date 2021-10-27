import {SUNBURST} from '@/services/data/tuples/chart-def/chart-sunburst';
import {ChartDataSet} from '@/services/data/tuples/chart-types';
import {ECharts} from '@/services/data/tuples/echarts/echarts-types';
import {Report} from '@/services/data/tuples/report-types';
import {BASE_COLORS_24} from '../../basic/colors';
import {cleanUselessValues} from './data-utils';
import {buildDecal} from './decal-utils';
import {DefaultChartUtils} from './default-chart-utils';
import {buildEChartsPie, buildTreeSeriesData} from './pie-utils';
import {buildEChartsTitle} from './title-utils';
import {buildToolbox} from './toolbox-utils';
import {ChartOptions} from './types';

export class ChartSunburstUtils extends DefaultChartUtils {
	constructor() {
		super(SUNBURST);
	}

	async buildOptions(report: Report, dataset: ChartDataSet): Promise<ChartOptions> {
		const {chart} = report;
		return cleanUselessValues({
			color: BASE_COLORS_24,
			title: buildEChartsTitle(chart as ECharts),
			tooltip: {
				trigger: 'item'
			},
			series: [
				buildEChartsPie(
					chart as ECharts, buildTreeSeriesData(chart, this.buildTreeData(report, dataset), this.formatNumber),
					{
						type: 'sunburst',
						insideRadius: '10%',
						outsideRadius: '90%'
					})
			],
			aria: buildDecal(chart),
			toolbox: buildToolbox(chart, report, dataset)
		});
	}
}