import {MAP, MapChartRegion, MapChartSettings} from '@/services/data/tuples/chart-def/chart-map';
import {ChartDataSet} from '@/services/data/tuples/chart-types';
import {ECharts} from '@/services/data/tuples/echarts/echarts-types';
import {Report} from '@/services/data/tuples/report-types';
import {EChartOption} from 'echarts';
import {BASE_COLORS_24, BASE_COLORS_6} from '../../basic/colors';
import {DefaultChartUtils} from './default-chart-utils';
import {ChinaCoordinatesL1} from './map-geo-data/china-l1';
import {CyprusCoordinatesL1} from './map-geo-data/cyprus-l1';
import {JapanCoordinatesL1} from './map-geo-data/japan-l1';
import {SingaporeCoordinatesL1} from './map-geo-data/singapore-l1';
import {MapCoordinate} from './map-geo-data/types';
import {USACoordinatesL1} from './map-geo-data/usa-l1';
import {buildEChartsTitle} from './title-utils';
import {buildToolbox} from './toolbox-utils';
import {ChartOptions} from './types';

export class ChartMapUtils extends DefaultChartUtils {
	constructor() {
		super(MAP);
	}

	async buildOptions(report: Report, dataset: ChartDataSet): Promise<ChartOptions> {
		const {chart} = report;

		const settings = chart.settings as MapChartSettings;
		const region = settings.series?.region || MapChartRegion.JAPAN_L1;

		let map: { name: string; map: Map<string, MapCoordinate> };
		switch (region) {
			case MapChartRegion.CHINA_L1:
				map = ChinaCoordinatesL1;
				break;
			case MapChartRegion.CYPRUS_L1:
				map = CyprusCoordinatesL1;
				break;
			case MapChartRegion.SINGAPORE_L1:
				map = SingaporeCoordinatesL1;
				break;
			case MapChartRegion.USA_L1:
				map = USACoordinatesL1;
				break;
			case MapChartRegion.JAPAN_L1:
			default:
				map = JapanCoordinatesL1;
				break;
		}

		const data = dataset.data
			.map((row) => {
				const coordinate = map.map.get(row[1] as string)!;
				if (!coordinate) {
					return null;
				}
				return {
					// value of dimension as name
					name: row[2],
					// value of indicator as value
					value: [coordinate.longitude, coordinate.latitude, row[0]]
				};
			})
			.filter((x) => !!x);

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
				map: map.name,
				roam: true,
				zoom: 1,
				regions: []
			},
			series: [
				{
					type: 'scatter',
					coordinateSystem: 'geo',
					data,
					symbolSize: (val: Array<number>) => {
						return Math.min(Math.max(val[2] / 50, 10), 20);
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
					data: data
						.sort((a, b) => {
							return (b!.value[2] as number) - (a!.value[2] as number);
						})
						.slice(0, 6),
					symbolSize: (val: Array<number>) => {
						return Math.min(Math.max(val[2] / 50, 10), 20);
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
			],
			toolbox: buildToolbox(chart, report, dataset)
		} as EChartOption;
	}
}
