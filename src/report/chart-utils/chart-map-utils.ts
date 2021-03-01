import { EChartOption } from 'echarts';
import { BASE_COLORS_24, BASE_COLORS_6 } from '../../basic-widgets/colors';
import { MAP } from '../../services/tuples/chart-def/chart-map';
import { ChartDataSet } from '../../services/tuples/chart-types';
import { ECharts } from '../../services/tuples/echarts/echarts-types';
import { Report } from '../../services/tuples/report-types';
import { DefaultChartUtils } from './default-chart-utils';
import { JapanCoordinatesL1 } from './map-geo-data/japan-l1';
import { buildEChartsTitle } from './title-utils';
import { ChartOptions } from './types';

export class ChartMapUtils extends DefaultChartUtils {
	constructor() {
		super(MAP);
	}

	buildOptions(report: Report, dataset: ChartDataSet): ChartOptions {
		const { chart } = report;

		const data = dataset.data.map(row => {
			const coordinate = JapanCoordinatesL1.map.get(row[1] as string)!;
			if (!coordinate) {
				return null;
			}
			return {
				// value of dimension as name
				name: row[2],
				// value of indicator as value
				value: [ coordinate.longitude, coordinate.latitude, row[0] ]
			};
		}).filter(x => !!x);

		return {
			color: BASE_COLORS_24,
			title: buildEChartsTitle(chart as ECharts),
			tooltip: {
				trigger: 'item',
				formatter: (params) => {
					const param = params as EChartOption.Tooltip.Format;
					let value = new Intl.NumberFormat(undefined, {
						maximumFractionDigits: 2,
						useGrouping: true
					}).format((param.value as Array<number>)[2] as number);
					return `${param.name}: ${value}`;
				}
			} as EChartOption.Tooltip,
			visualMap: {
				left: 'right',
				min: 0,
				max: 1000,
				inRange: {
					color: BASE_COLORS_6
				},
				// text: [ 'High', 'Low' ],
				calculable: true
			} as EChartOption.VisualMap,
			geo: {
				map: JapanCoordinatesL1.name,
				roam: true,
				zoom: 1,
				regions: [ { name: 'Tokyo', itemStyle: { areaColor: 'red' } } ]
			},
			series: [
				{
					type: 'scatter',
					coordinateSystem: 'geo',
					data,
					symbolSize: (val: Array<number>) => {
						return Math.min(Math.max(val[2] / 50, 3), 20);
					},
					// encode: {
					// 	value: 2
					// },
					label: {
						// 	formatter: '{b}: {c}',
						// 	position: 'right',
						show: false
					},
					// emphasis: {
					// 	label: {
					// 		show: true
					// 	}
					// }
					zlevel: 2
				} as EChartOption.Series,
				{
					type: 'effectScatter',
					coordinateSystem: 'geo',
					data: data.sort((a, b) => {
						return (b!.value[2] as number) - (a!.value[2] as number);
					}).slice(0, 6),
					symbolSize: (val: Array<number>) => {
						return Math.min(Math.max(val[2] / 50, 3), 20);
					},
					// encode: {
					// 	value: 2
					// },
					showEffectOn: 'render',
					rippleEffect: {
						brushType: 'stroke'
					},
					// hoverAnimation: true,
					// label: {
					// 	formatter: '{b}',
					// 	position: 'right',
					// 	show: true
					// },
					itemStyle: {
						shadowBlur: 10,
						shadowColor: '#333333'
					},
					zlevel: 2
				} as EChartOption.Series
			]
		} as EChartOption;
	}
}
