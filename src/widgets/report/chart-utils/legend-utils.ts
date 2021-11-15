import {ECharts} from '@/services/data/tuples/echarts/echarts-types';
import {LegendComponentOption} from 'echarts/components';
import {cleanUselessValues} from './data-utils';

export const buildEChartsLegend = (chart: ECharts, legendNames: Array<string>): LegendComponentOption | undefined => {
	let {settings} = chart;

	if (!settings) {
		settings = {};
		chart.settings = settings;
	}

	const {legend} = settings;

	if (!legend) {
		return (void 0);
	}

	return cleanUselessValues({
		show: legend.show,
		type: 'plain',
		orient: legend.orient,
		data: legendNames.map(name => ({name})),
		textStyle: {
			color: legend.font?.color,
			fontStyle: legend.font?.style,
			fontWeight: legend.font?.weight as any,
			fontFamily: legend.font?.family,
			fontSize: legend.font?.size
		},
		backgroundColor: legend.backgroundColor,
		padding: legend.padding,
		borderColor: legend.border?.color,
		borderWidth: legend.border?.width,
		borderType: legend.border?.style as any,
		borderRadius: legend.border?.radius,
		top: (legend?.position?.top != null) ? `${legend?.position?.top}%` : (void 0),
		right: (legend?.position?.right != null) ? `${legend?.position?.right}%` : (void 0),
		left: (legend?.position?.left != null) ? `${legend?.position?.left}%` : (void 0),
		bottom: (legend?.position?.bottom != null) ? `${legend?.position?.bottom}%` : (void 0)
	});
};