import { PieChartSettings, PieRoseType } from '../../services/tuples/chart-def/chart-pie';
import { ECharts } from '../../services/tuples/echarts/echarts-types';
import { cleanUselessValues } from './data-utils';

export const buildEChartsPie = (chart: ECharts, data: any): any | undefined => {
	let { settings } = chart;

	if (!settings) {
		settings = {};
		chart.settings = settings;
	}

	const { series, grid } = settings as PieChartSettings;

	if (!series) {
		return {
			type: 'pie',
			center: [ '50%', '50%' ],
			data
		};
	}

	return cleanUselessValues({
		type: 'pie',
		center: [ series.centerX || '50%', series.centerY || '50%' ],
		radius: [ series.insideRadius || 0, series.outsideRadius || '75%' ],
		roseType: series.roseType === PieRoseType.NONE ? false : series.roseType,
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
		}
	});
};