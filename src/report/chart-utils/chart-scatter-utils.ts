import { EChartOption } from 'echarts';
import { BASE_COLORS_24 } from '../../basic-widgets/colors';
import { SCATTER } from '../../services/tuples/chart-def/chart-scatter';
import { ChartDataSet } from '../../services/tuples/chart-types';
import { EChart } from '../../services/tuples/echarts/echarts-types';
import { Report } from '../../services/tuples/report-types';
import { DefaultChartUtils } from './default-chart-utils';
import { buildEChartTitle } from './title-utils';
import { ChartOptions } from './types';

export class ChartScatterUtils extends DefaultChartUtils {
	constructor() {
		super(SCATTER);
	}

	buildOptions(report: Report, dataset: ChartDataSet): ChartOptions {
		const { chart } = report;
		const { dimensions, indicators } = report;

		const dimensionColumnIndexOffset = this.getDimensionColumnIndexOffset(report);
		const legends = this.buildLegends(report, dataset);

		return {
			color: BASE_COLORS_24,
			title: buildEChartTitle(chart as EChart),
			tooltip: {
				trigger: 'item'
			},
			// legend only available on multiple dimensions defined
			legend: legends.length > 1 ? { data: legends.map(({ name }) => name) } : (void 0),
			xAxis: {
				type: 'category',
				// use last dimension as xAxis
				name: dimensions[dimensions.length - 1].name
			},
			yAxis: {
				type: 'value',
				name: indicators[0].name
			},
			series: legends.map(({ name, rows }) => {
				return {
					name,
					type: 'scatter',
					data: rows.map(row => {
						return [
							// value of last dimension as xAxis value
							row[dimensions.length - 1 + dimensionColumnIndexOffset],
							// value of first indicator as yAxis value
							// and rest values according to indicators order
							...indicators.map((indicator, index) => row[index])
						];
					})
				};
			}),
			// visual map only available on multiple indicators defined
			visualMap: indicators.length === 1 ? (void 0) : indicators.map((indicator, index) => {
				switch (index) {
					case 0:
						// first indicator is used as yAxis, ignore
						return null;
					case 1:
						// use size to identify difference
						return {
							show: false,
							// index of per data row, first is xAxis(dimension), second is yAxis(first indicator)
							dimension: 2,
							// column index of second indicator is 1
							...this.findColumnExtremum(dataset, 1),
							inRange: {
								symbolSize: [ 10, 50 ]
							}
						};
					case 2:
						// use opacity to identify difference
						return {
							show: false,
							// index of per data row, first is xAxis(dimension), second is yAxis(first indicator)
							dimension: 2,
							// column index of third indicator is 2
							...this.findColumnExtremum(dataset, 2),
							inRange: {
								colorAlpha: [ 0.4, 1 ]
							}
						};
					default:
						// more indicators are not supported yet
						return null;
				}
			}).filter(x => !x) as Array<EChartOption.VisualMap>
		} as EChartOption;
	}
}
