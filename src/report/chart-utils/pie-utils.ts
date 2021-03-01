import { PieChartSettings, PieRoseType } from '../../services/tuples/chart-def/chart-pie';
import { ChartType } from '../../services/tuples/chart-types';
import { ECharts } from '../../services/tuples/echarts/echarts-types';
import { cleanUselessValues } from './data-utils';

export const buildEChartsPie = (chart: ECharts, data: any, options: {
	type: 'pie' | 'sunburst';
	insideRadius: number | string;
	outsideRadius: number | string;
	roseType?: PieRoseType;
}): any | undefined => {
	const { type, insideRadius, outsideRadius, roseType } = options;

	let { settings } = chart;

	if (!settings) {
		settings = {};
		chart.settings = settings;
	}

	const { series, grid } = settings as PieChartSettings;

	const buildSunburstLabel = () => {
		return {
			label: {
				show: true,
				position: 'inside',
				formatter: '{b}\n{c}'
			}
		};
	};
	const buildPieLabel = () => {
		return {
			label: {
				show: true,
				position: 'outside',
				formatter: `{b}\n{c}${(!series || series.showPercentage !== false) ? ', {d}%' : ''}`
			},
			labelLine: {
				show: true,
				smooth: true
			}
		};
	};

	if (!series) {
		return {
			type,
			center: [ '50%', '50%' ],
			data,
			...(type === ChartType.SUNBURST ? buildSunburstLabel() : buildPieLabel())
		};
	}

	return cleanUselessValues({
		type,
		center: [ series.centerX || '50%', series.centerY || '50%' ],
		radius: [ series.insideRadius || insideRadius, series.outsideRadius || outsideRadius ],
		roseType: series.roseType === PieRoseType.NONE ? (roseType || false) : series.roseType,
		data,
		top: grid?.position?.top,
		right: grid?.position?.right,
		left: grid?.position?.left,
		bottom: grid?.position?.bottom,
		itemStyle: {
			borderColor: series.border?.color,
			borderWith: series.border?.width,
			borderType: series.border?.style,
			borderRadius: series.border?.radius
		},
		...(type === ChartType.SUNBURST ? buildSunburstLabel() : buildPieLabel())
	});
};