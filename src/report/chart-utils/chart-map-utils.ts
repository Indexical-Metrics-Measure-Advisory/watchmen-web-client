import { EChartOption } from 'echarts';
import * as echarts from 'echarts/core';
import { BASE_COLORS_24, BASE_COLORS_6 } from '../../basic-widgets/colors';
import { MAP } from '../../services/tuples/chart-def/chart-map';
import { ChartDataSet } from '../../services/tuples/chart-types';
import { EChart } from '../../services/tuples/echarts-types';
import { Report } from '../../services/tuples/report-types';
import { DefaultChartUtils } from './default-chart-utils';
import japanJson from './map-geo-data/jp-all.geo.json';
import { buildEChartTitle } from './title-utils';
import { ChartOptions } from './types';

// console.log(JSON.stringify(japanJson.features.map(feature => feature.properties.name).filter(x => !!x)));
echarts.registerMap('Japan', japanJson as any, {
	// Alaska: {              // 把阿拉斯加移到美国主大陆左下方
	// 	left: -131,
	// 	top: 25,
	// 	width: 15
	// },
	// Hawaii: {
	// 	left: -110,        // 夏威夷
	// 	top: 28,
	// 	width: 5
	// },
	// 'Puerto Rico': {       // 波多黎各
	// 	left: -76,
	// 	top: 26,
	// 	width: 2
	// }
});

export class ChartMapUtils extends DefaultChartUtils {
	constructor() {
		super(MAP);
	}

	buildOptions(report: Report, dataset: ChartDataSet): ChartOptions {
		const { chart } = report;

		return {
			color: BASE_COLORS_24,
			title: buildEChartTitle(chart as EChart),
			tooltip: {
				trigger: 'item',
				formatter: (params) => {
					const param = params as EChartOption.Tooltip.Format;
					let value = new Intl.NumberFormat(undefined, {
						maximumFractionDigits: 2,
						useGrouping: true
					}).format(param.value as number);
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
			series: [ {
				type: 'map',
				roam: true,
				map: 'Japan',
				label: { show: true },
				data: dataset.data.map(row => {
					return {
						// value of dimension as name
						name: row[1],
						// value of indicator as value
						value: row[0]
					};
				})
			} ]
		} as EChartOption;
	}
}
