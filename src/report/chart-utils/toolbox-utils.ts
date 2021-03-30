import dayjs from 'dayjs';
import { ToolboxComponentOption } from 'echarts/components';
import { Lang } from '../../langs';
import { ChartDataSet } from '../../services/tuples/chart-types';
import { isBarChart, isLineChart, isScatterChart } from '../../services/tuples/chart-utils';
import { ECharts } from '../../services/tuples/echarts/echarts-types';
import { Report } from '../../services/tuples/report-types';
import { cleanUselessValues } from './data-utils';

export const buildToolbox = (chart: ECharts, report: Report, dataset: ChartDataSet): ToolboxComponentOption => {
	let { settings } = chart;

	if (!settings) {
		settings = {};
		chart.settings = settings;
	}

	const { toolbox } = settings;

	const zoom = isBarChart(chart) || isLineChart(chart) || isScatterChart(chart);

	const indicatorHeaders = (report.indicators || []).map((indicator, index) => `<div>${indicator.name || `Indicator ${index + 1}`}</div>`);
	const dimensionHeaders = (report.dimensions || []).map((dimension, index) => `<div>${dimension.name || `Dimension ${index + 1}`}</div>`);

	const content = 'No.,'
		+ (report.indicators || []).map((indicator, index) => indicator.name || `Indicator ${index + 1}`).join(',')
		+ ','
		+ (report.dimensions || []).map((dimension, index) => dimension.name || `Dimension ${index + 1}`).join(',')
		+ '\n'
		+ dataset.data.map((row, rowIndex) => {
			return `${rowIndex + 1},${row.map(cell => cell).join(',')}`;
		}).join('\n');

	const downloadHref = 'data:text/csv;charset=utf-8,' + encodeURI(content);
	const fileName = `report-${encodeURI(report.name || '')}-${dayjs().format('YYYYMMDDHHmmss')}.csv`;

	return cleanUselessValues({
		show: toolbox?.show || false,
		orient: toolbox?.orient,
		showTitle: false,
		feature: {
			saveAsImage: { show: true, name: `download-${dayjs().format('YYYYMMDDHHmmss')}` },
			dataView: {
				show: true,
				readOnly: true,
				lang: [
					Lang.PLAIN.REPORT_DATASET_GRID_TITLE,
					Lang.PLAIN.REPORT_DATASET_GRID_CLOSE,
					Lang.PLAIN.REPORT_DATASET_GRID_REFRESH
				],
				buttonColor: 'var(--primary-color);border-radius:var(--border-radius);height:var(--button-height-in-form);display:flex;align-items:center;font-variant:petite-caps;font-weight:var(--font-demi-bold);padding:0 calc(var(--margin) / 2);',
				optionToContent: () => {
					const header = `<div class="report-dataset-grid-header"><div>#</div>${indicatorHeaders}${dimensionHeaders}<div></div></div>`;
					const body = `<div class="report-dataset-grid-body" data-v-scroll="" data-h-scroll="">${dataset.data.map((row, rowIndex) => {
						return `<div class="report-dataset-grid-body-row"><div>${rowIndex + 1}</div>${row.map(cell => `<div>${cell}</div>`).join('')}<div></div></div>`;
					}).join('')}</div>`;
					return `<div class="report-dataset-grid" data-columns="${dataset.data[0]?.length || 1}">${header}${body}</div><a href="${downloadHref}" target="_blank" download="${fileName}">Download</a>`;
				}
			},
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