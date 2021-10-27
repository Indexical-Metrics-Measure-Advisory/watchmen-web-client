import {SCATTER} from '@/services/data/tuples/chart-def/chart-scatter';
import {ChartDataSet} from '@/services/data/tuples/chart-types';
import {ECharts} from '@/services/data/tuples/echarts/echarts-types';
import {Report} from '@/services/data/tuples/report-types';
import {EChartOption} from 'echarts';
import {BASE_COLORS_24} from '../../basic/colors';
import {DefaultChartUtils, Legend} from './default-chart-utils';
import {buildEChartsGrid} from './grid-utils';
import {buildEChartsLegend} from './legend-utils';
import {buildEChartsTitle} from './title-utils';
import {buildToolbox} from './toolbox-utils';
import {ChartOptions} from './types';
import {buildEChartsXAxis} from './xaxis-utils';
import {buildEChartsYAxis} from './yaxis-utils';

export class ChartScatterUtils extends DefaultChartUtils {
	constructor() {
		super(SCATTER);
	}

	buildLegends(report: Report, dataset: ChartDataSet): Array<Legend> {
		const {dimensions} = report;

		const dimensionColumnIndexOffset = this.getDimensionColumnIndexOffset(report);

		if (dimensions.length === 1) {
			// only one dimension, use as xAxis. legend is not needed.
			// still build as legend for later logic
			return [{
				name: dimensions[0].name,
				rows: dataset.data
			}];
		} else {
			// multiple dimensions, first as legends, second as xAxis
			const legendMap = new Map<string, number>();
			return dataset.data.reduce<Array<Legend>>((legends, row) => {
				// values of first dimension as legends
				const dimensionValue = `${row[dimensionColumnIndexOffset]}`;
				const legendIndex = legendMap.get(dimensionValue);
				if (legendIndex == null) {
					legends.push({name: dimensionValue, rows: [row]});
					legendMap.set(dimensionValue, legends.length - 1);
				} else {
					legends[legendIndex].rows.push(row);
				}
				return legends;
			}, []);
		}
	}

	async buildOptions(report: Report, dataset: ChartDataSet): Promise<ChartOptions> {
		const {chart} = report;
		const {dimensions, indicators} = report;

		const dimensionColumnIndexOffset = this.getDimensionColumnIndexOffset(report);
		const legends = this.buildLegends(report, dataset);

		return {
			color: BASE_COLORS_24,
			title: buildEChartsTitle(chart as ECharts),
			tooltip: {
				trigger: 'item'
			},
			// legend only available on multiple dimensions defined
			legend: legends.length > 1 ? buildEChartsLegend(chart as ECharts, legends.map(({name}) => name)) : (void 0),
			grid: buildEChartsGrid(chart as ECharts),
			xAxis: [buildEChartsXAxis(chart as ECharts, [dimensions[dimensions.length - 1].name])],
			yAxis: [buildEChartsYAxis(chart as ECharts)],
			series: legends.map(({name, rows}) => {
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
								symbolSize: [10, 50]
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
								colorAlpha: [0.4, 1]
							}
						};
					default:
						// more indicators are not supported yet
						return null;
				}
			}).filter(x => !x) as Array<EChartOption.VisualMap>,
			toolbox: buildToolbox(chart, report, dataset)
		} as EChartOption;
	}
}
