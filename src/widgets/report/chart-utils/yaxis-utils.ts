import {ECharts} from '@/services/data/tuples/echarts/echarts-types';
import {EChartsYAxisType} from '@/services/data/tuples/echarts/echarts-yaxis-types';
import {cleanUselessValues} from './data-utils';

export const buildEChartsYAxis = (chart: ECharts): any | undefined => {
	let {settings} = chart;

	if (!settings) {
		settings = {};
		chart.settings = settings;
	}

	const {yaxis} = settings;

	if (!yaxis) {
		return {
			type: EChartsYAxisType.VALUE,
			axisTick: {show: false}
		};
	}

	return cleanUselessValues({
		show: yaxis.show,
		position: yaxis.position,
		type: yaxis.type || EChartsYAxisType.VALUE,
		name: yaxis.name?.text,
		nameLocation: yaxis.name?.location,
		nameGap: yaxis.name?.gap,
		nameRotate: yaxis.name?.rotate,
		nameTextStyle: {
			color: yaxis.name?.font?.color,
			fontFamily: yaxis.name?.font?.family,
			fontSize: yaxis.name?.font?.size,
			fontWeight: yaxis.name?.font?.weight,
			fontStyle: yaxis.name?.font?.style,
			borderWidth: yaxis.name?.border?.width,
			borderColor: yaxis.name?.border?.color,
			borderType: yaxis.name?.border?.style,
			borderRadius: yaxis.name?.border?.radius,
			padding: yaxis.name?.padding,
			backgroundColor: yaxis.name?.backgroundColor,
			align: yaxis.name?.horizontalAlign,
			verticalAlign: yaxis.name?.verticalAlign
		},
		axisLabel: {
			show: yaxis.label?.show,
			inside: yaxis.label?.inside,
			color: yaxis.label?.font?.color,
			fontFamily: yaxis.label?.font?.family,
			fontSize: yaxis.label?.font?.size,
			fontWeight: yaxis.label?.font?.weight,
			fontStyle: yaxis.label?.font?.style,
			borderWidth: yaxis.label?.border?.width,
			borderColor: yaxis.label?.border?.color,
			borderType: yaxis.label?.border?.style,
			borderRadius: yaxis.label?.border?.radius,
			padding: yaxis.label?.padding,
			backgroundColor: yaxis.label?.backgroundColor,
			align: yaxis.label?.horizontalAlign,
			verticalAlign: yaxis.label?.verticalAlign,
			margin: yaxis.label?.gap,
			rotate: yaxis.label?.rotate
		},
		axisTick: {show: false},
		min: yaxis.autoMin ? (void 0) : yaxis.min,
		max: yaxis.autoMax ? (void 0) : yaxis.max,
		splitLine: {
			show: yaxis.splitLine?.show,
			lineStyle: {
				color: yaxis.splitLine?.color,
				width: yaxis.splitLine?.width,
				type: yaxis.splitLine?.style
			}
		},
		minorSplitLine: {
			show: yaxis.splitLine?.show,
			lineStyle: {
				color: yaxis.splitLine?.color,
				width: yaxis.splitLine?.width,
				type: yaxis.splitLine?.style
			}
		}
	});
};