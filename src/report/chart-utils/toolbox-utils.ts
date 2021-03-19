import dayjs from 'dayjs';
import { isBarChart, isLineChart, isScatterChart } from '../../services/tuples/chart-utils';
import { ECharts } from '../../services/tuples/echarts/echarts-types';
import { cleanUselessValues } from './data-utils';

export const buildToolbox = (chart: ECharts) => {
	let { settings } = chart;

	if (!settings) {
		settings = {};
		chart.settings = settings;
	}

	const { toolbox } = settings;

	const zoom = isBarChart(chart) || isLineChart(chart) || isScatterChart(chart);

	return cleanUselessValues({
		show: toolbox?.show || false,
		orient: toolbox?.orient,
		showTitle: false,
		feature: {
			saveAsImage: { show: true, name: `download-${dayjs().format('YYYYMMDDHHmmss')}` },
			// dataView: { show: true, readOnly: true },
			...(zoom ? {
				dataZoom: { show: true },
				restore: { show: true }
			} : {})
		},
		top: toolbox?.position?.top,
		right: toolbox?.position?.right,
		left: toolbox?.position?.left,
		bottom: toolbox?.position?.bottom
	});
};