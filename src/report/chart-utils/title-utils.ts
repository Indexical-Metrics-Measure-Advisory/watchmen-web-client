import { TitleComponentOption } from 'echarts/components';
import { EChart } from '../../services/tuples/echarts-types';

export const buildEChartTitle = (chart: EChart): TitleComponentOption | undefined => {
	const { settings: { title } = {} } = chart;

	if (!title) {
		return (void 0);
	}

	return {
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
			fontSize: title.subtext?.font?.size,
		},
		borderColor: title.border?.color,
		borderWidth: title.border?.width,
		borderType: title.border?.style as any,
		borderRadius: title.border?.radius,
		backgroundColor: title.backgroundColor,
		top: title.position?.top,
		right: title.position?.right,
		left: title.position?.left,
		bottom: title.position?.bottom
	};
};