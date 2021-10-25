import {ChartDataSet} from '@/services/data/tuples/chart-types';
import {isBarChart, isLineChart, isScatterChart} from '@/services/data/tuples/chart-utils';
import {ECharts} from '@/services/data/tuples/echarts/echarts-types';
import {Report} from '@/services/data/tuples/report-types';
import {ToolboxComponentOption} from 'echarts/components';
import {cleanUselessValues} from './data-utils';

// noinspection JSUnusedLocalSymbols
export const buildToolbox = (chart: ECharts, report: Report, dataset: ChartDataSet): ToolboxComponentOption => {
	let {settings} = chart;

	if (!settings) {
		settings = {};
		chart.settings = settings;
	}

	const {toolbox} = settings;

	const zoom = isBarChart(chart) || isLineChart(chart) || isScatterChart(chart);

	return cleanUselessValues({
		show: toolbox?.show || true,
		orient: toolbox?.orient,
		showTitle: false,
		feature: {
			...(zoom ? {
				dataZoom: {show: true},
				restore: {show: true}
			} : {})
		},
		top: (toolbox?.position?.top != null) ? `${toolbox?.position?.top}%` : (void 0),
		right: (toolbox?.position?.right != null) ? `${toolbox?.position?.right}%` : (void 0),
		left: (toolbox?.position?.left != null) ? `${toolbox?.position?.left}%` : (void 0),
		bottom: (toolbox?.position?.bottom != null) ? `${toolbox?.position?.bottom}%` : (void 0)
	});
};