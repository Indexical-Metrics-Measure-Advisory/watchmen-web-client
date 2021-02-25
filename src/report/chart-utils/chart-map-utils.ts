import { EChartOption } from 'echarts';
import * as echarts from 'echarts/core';
import { BASE_COLORS_24, BASE_COLORS_6 } from '../../basic-widgets/colors';
import { MAP } from '../../services/tuples/chart-def/chart-map';
import { ChartDataSet } from '../../services/tuples/chart-types';
import { ECharts } from '../../services/tuples/echarts/echarts-types';
import { Report } from '../../services/tuples/report-types';
import { DefaultChartUtils } from './default-chart-utils';
import japanJson from './map-geo-data/gadm36_JPN_1.json';
import { buildEChartsTitle } from './title-utils';
import { ChartOptions } from './types';

interface MapCoordinate {
	longitude: number;
	latitude: number;
}

// console.log(JSON.stringify(japanJson.features.map(feature => feature.properties.name).filter(x => !!x)));
echarts.registerMap('Japan', japanJson as any, {});
// @ts-ignore
const JapanCoordinates = japanJson.features.filter(feature => !!feature.properties.NAME_1).reduce((all, feature) => {
	const coordinates = feature.geometry.coordinates.flat(10) as Array<number>;
	const location = coordinates.reduce((location, coordinate, index) => {
		if (index % 2 === 0) {
			location.longitude += coordinate;
		} else {
			location.latitude += coordinate;
		}
		return location;
	}, { longitude: 0, latitude: 0 });
	// console.log(feature.properties.NAME_1, feature.properties.NL_NAME_1);
	all.set(feature.properties.NAME_1 as string, {
		longitude: location.longitude / coordinates.length * 2,
		latitude: location.latitude / coordinates.length * 2
	});
	return all;
}, new Map<string, MapCoordinate>());

export class ChartMapUtils extends DefaultChartUtils {
	constructor() {
		super(MAP);
	}

	buildOptions(report: Report, dataset: ChartDataSet): ChartOptions {
		const { chart } = report;

		const data = dataset.data.map(row => {
			const coordinate = JapanCoordinates.get(row[1] as string)!;
			return {
				// value of dimension as name
				name: row[2],
				// value of indicator as value
				value: [ coordinate.longitude, coordinate.latitude, row[0] ]
			};
		});

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
				map: 'Japan',
				roam: true,
				zoom: 1,
				emphasis: {
					itemStyle: {
						type: 'radial',
						x: 0.5,
						y: 0.5,
						r: 0.5,
						colorStops: [ {
							offset: 0, color: 'red' // 0% 处的颜色
						}, {
							offset: 1, color: 'blue' // 100% 处的颜色
						} ],
						global: false
					}
				}
			},
			series: [
				// {
				// 	type: 'map',
				// 	roam: true,
				// 	map: 'Japan',
				// 	label: { show: true },
				// 	data: dataset.data.map(row => {
				// 		return {
				// 			// value of dimension as name
				// 			name: row[1],
				// 			// value of indicator as value
				// 			value: row[0]
				// 		};
				// 	})
				// }
				{
					type: 'scatter',
					coordinateSystem: 'geo',
					data,
					symbolSize: (val: Array<number>) => {
						// console.log(param);
						return Math.min(Math.max(val[2] / 50, 3), 20);
					},
					// encode: {
					// 	value: 2
					// },
					label: {
						// 	formatter: '{b}: {c}',
						// 	position: 'right',
						show: false
					}
					// emphasis: {
					// 	label: {
					// 		show: true
					// 	}
					// }
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
					zlevel: 1
				} as EChartOption.Series
			]
		} as EChartOption;
	}
}
