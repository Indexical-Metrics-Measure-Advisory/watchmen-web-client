import {ECharts} from '@/services/data/tuples/echarts/echarts-types';
import {TitleComponentOption} from 'echarts/components';
import {cleanUselessValues} from './data-utils';

export const buildEChartsTitle = (chart: ECharts): TitleComponentOption | undefined => {
	let {settings} = chart;

	if (!settings) {
		settings = {};
		chart.settings = settings;
	}

	const {title} = settings;

	if (!title) {
		return (void 0);
	}

	return cleanUselessValues({
		text: title.text?.text,
		textStyle: {
			color: title.text?.font?.color,
			fontStyle: title.text?.font?.style,
			fontWeight: title.text?.font?.weight as any,
			fontFamily: title.text?.font?.family,
			fontSize: title.text?.font?.size
		},
		subtext: title.subtext?.text,
		subtextStyle: {
			color: title.subtext?.font?.color,
			fontStyle: title.subtext?.font?.style,
			fontWeight: title.subtext?.font?.weight as any,
			fontFamily: title.subtext?.font?.family,
			fontSize: title.subtext?.font?.size
		},
		backgroundColor: title.backgroundColor,
		itemGap: title.itemGap,
		padding: title.padding,
		textAlign: title.horizontalAlign as any,
		textVerticalAlign: title.verticalAlign as any,
		borderColor: title.border?.color,
		borderWidth: title.border?.width,
		borderType: title.border?.style as any,
		borderRadius: title.border?.radius,
		top: (title.position?.top != null) ? `${title.position?.top}%` : (void 0),
		right: (title.position?.right != null) ? `${title.position?.right}%` : (void 0),
		left: (title.position?.left != null) ? `${title.position?.left}%` : (void 0),
		bottom: (title.position?.bottom != null) ? `${title.position?.bottom}%` : (void 0)
	});
};