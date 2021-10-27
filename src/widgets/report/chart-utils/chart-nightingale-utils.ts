import {NIGHTINGALE} from '@/services/data/tuples/chart-def/chart-nightingale';
import {PieRoseType} from '@/services/data/tuples/chart-def/chart-pie';
import {ChartDataSet} from '@/services/data/tuples/chart-types';
import {ECharts} from '@/services/data/tuples/echarts/echarts-types';
import {Report} from '@/services/data/tuples/report-types';
import {BASE_COLORS_24} from '../../basic/colors';
import {cleanUselessValues} from './data-utils';
import {buildDecal} from './decal-utils';
import {DefaultChartUtils} from './default-chart-utils';
import {buildEChartsLegend} from './legend-utils';
import {buildEChartsPie, buildSeriesData} from './pie-utils';
import {buildEChartsTitle} from './title-utils';
import {buildToolbox} from './toolbox-utils';
import {ChartOptions} from './types';

export class ChartNightingaleUtils extends DefaultChartUtils {
	constructor() {
		super(NIGHTINGALE);
	}

	async buildOptions(report: Report, dataset: ChartDataSet): Promise<ChartOptions> {
		const {chart} = report;
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
			legend: buildEChartsLegend(chart as ECharts, groups.map(({value}) => value)),
			series: [buildEChartsPie(chart as ECharts, data, {
				type: 'pie',
				insideRadius: 0,
				outsideRadius: '75%',
				roseType: PieRoseType.AREA
			})],
			aria: buildDecal(chart),
			toolbox: buildToolbox(chart, report, dataset)
		});
	}
}