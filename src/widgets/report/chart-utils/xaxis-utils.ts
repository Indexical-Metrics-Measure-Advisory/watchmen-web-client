import {ECharts} from '@/services/data/tuples/echarts/echarts-types';
import {EChartsXAxisType} from '@/services/data/tuples/echarts/echarts-xaxis-types';
import {cleanUselessValues} from './data-utils';

export const buildEChartsXAxis = (chart: ECharts, data: Array<string | number>): any | undefined => {
	let {settings} = chart;

	if (!settings) {
		settings = {};
		chart.settings = settings;
	}

	const {xaxis} = settings;

	if (!xaxis) {
		return {
			type: EChartsXAxisType.CATEGORY,
			data,
			axisTick: {show: false}
		};
	}

	return cleanUselessValues({
		show: xaxis.show,
		position: xaxis.position,
		type: xaxis.type || EChartsXAxisType.CATEGORY,
		data,
		name: xaxis.name?.text,
		nameLocation: xaxis.name?.location,
		nameGap: xaxis.name?.gap,
		nameRotate: xaxis.name?.rotate,
		nameTextStyle: {
			color: xaxis.name?.font?.color,
			fontFamily: xaxis.name?.font?.family,
			fontSize: xaxis.name?.font?.size,
			fontWeight: xaxis.name?.font?.weight,
			fontStyle: xaxis.name?.font?.style,
			borderWidth: xaxis.name?.border?.width,
			borderColor: xaxis.name?.border?.color,
			borderType: xaxis.name?.border?.style,
			borderRadius: xaxis.name?.border?.radius,
			padding: xaxis.name?.padding,
			backgroundColor: xaxis.name?.backgroundColor,
			align: xaxis.name?.horizontalAlign,
			verticalAlign: xaxis.name?.verticalAlign
		},
		axisLabel: {
			show: xaxis.label?.show,
			inside: xaxis.label?.inside,
			color: xaxis.label?.font?.color,
			fontFamily: xaxis.label?.font?.family,
			fontSize: xaxis.label?.font?.size,
			fontWeight: xaxis.label?.font?.weight,
			fontStyle: xaxis.label?.font?.style,
			borderWidth: xaxis.label?.border?.width,
			borderColor: xaxis.label?.border?.color,
			borderType: xaxis.label?.border?.style,
			borderRadius: xaxis.label?.border?.radius,
			padding: xaxis.label?.padding,
			backgroundColor: xaxis.label?.backgroundColor,
			align: xaxis.label?.horizontalAlign,
			verticalAlign: xaxis.label?.verticalAlign,
			margin: xaxis.label?.gap,
			rotate: xaxis.label?.rotate
		},
		axisTick: {show: false},
		min: xaxis.autoMin ? (void 0) : xaxis.min,
		max: xaxis.autoMax ? (void 0) : xaxis.max,
		splitLine: {
			show: xaxis.splitLine?.show,
			lineStyle: {
				color: xaxis.splitLine?.color,
				width: xaxis.splitLine?.width,
				type: xaxis.splitLine?.style
			}
		},
		minorSplitLine: {
			show: xaxis.splitLine?.show,
			lineStyle: {
				color: xaxis.splitLine?.color,
				width: xaxis.splitLine?.width,
				type: xaxis.splitLine?.style
			}
		}
	});
};