import { GridComponentOption } from 'echarts/components';
import { EChart } from '../../services/tuples/echarts/echarts-types';
import { cleanUselessValues } from './data-utils';

export const buildEChartGrid = (chart: EChart): GridComponentOption | undefined => {
	let { settings } = chart;

	if (!settings) {
		settings = {};
		chart.settings = settings;
	}

	const { grid } = settings;

	if (!grid) {
		return (void 0);
	}

	return cleanUselessValues({
		show: grid.show,
		containLabel: grid.containLabel,
		backgroundColor: grid.backgroundColor,
		borderColor: grid.border?.color,
		borderWidth: grid.border?.width,
		borderType: grid.border?.style as any,
		top: grid.position?.top,
		right: grid.position?.right,
		left: grid.position?.left,
		bottom: grid.position?.bottom
	});
};