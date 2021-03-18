import { BASE_COLORS_24 } from '../../basic-widgets/colors';
import { NIGHTINGALE } from '../../services/tuples/chart-def/chart-nightingale';
import { PieRoseType } from '../../services/tuples/chart-def/chart-pie';
import { ChartDataSet } from '../../services/tuples/chart-types';
import { ECharts } from '../../services/tuples/echarts/echarts-types';
import { Report } from '../../services/tuples/report-types';
import { cleanUselessValues } from './data-utils';
import { buildDecal } from './decal-utils';
import { DefaultChartUtils } from './default-chart-utils';
import { buildEChartsLegend } from './legend-utils';
import { buildEChartsPie } from './pie-utils';
import { buildEChartsTitle } from './title-utils';
import { ChartOptions } from './types';

export class ChartNightingaleUtils extends DefaultChartUtils {
	constructor() {
		super(NIGHTINGALE);
	}

	buildOptions(report: Report, dataset: ChartDataSet): ChartOptions {
		const { chart } = report;
		// only one indicator allowed
		// const { indicators: [ indicator ] } = report;

		const groups = this.buildDescartesByDimensions(report, dataset);

		const data = groups.map(({ value, row }) => {
			return {
				name: value,
				value: this.formatNumber(row[0] || 0)
			};
		});

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
				outsideRadius: '75%',
				roseType: PieRoseType.AREA
			}) ],
			aria: buildDecal(chart)
		});
	}
}