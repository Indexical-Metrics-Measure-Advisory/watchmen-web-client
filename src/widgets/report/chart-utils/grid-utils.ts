import {ECharts} from '@/services/data/tuples/echarts/echarts-types';
import {GridComponentOption} from 'echarts/components';
import {cleanUselessValues} from './data-utils';

export const buildEChartsGrid = (chart: ECharts): GridComponentOption | undefined => {
	let {settings} = chart;

	if (!settings) {
		settings = {};
		chart.settings = settings;
	}

	const {grid} = settings;

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
		top: (grid?.position?.top != null) ? `${grid?.position?.top}%` : (void 0),
		right: (grid?.position?.right != null) ? `${grid?.position?.right}%` : (void 0),
		left: (grid?.position?.left != null) ? `${grid?.position?.left}%` : (void 0),
		bottom: (grid?.position?.bottom != null) ? `${grid?.position?.bottom}%` : (void 0)
	});
};