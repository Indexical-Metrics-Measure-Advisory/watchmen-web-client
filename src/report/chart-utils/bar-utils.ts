import { BarChartSettings, BarChartSettingsLabel } from '../../services/tuples/chart-def/chart-bar';
import { ECharts } from '../../services/tuples/echarts/echarts-types';
import { cleanUselessValues } from './data-utils';
import { createNumberFormat } from './number-format';
import { buildEChartsXAxis } from './xaxis-utils';
import { buildEChartsYAxis } from './yaxis-utils';

interface FormatterParams {
	name: string;
	value: number;
}

export const buildAxis = (chart: ECharts, groups: Array<{ value: any }>) => {
	let { settings } = chart;

	if (!settings) {
		settings = {};
		chart.settings = settings;
	}

	const { series } = settings as BarChartSettings;
	const xAxis = [ buildEChartsXAxis(chart as ECharts, groups.map(({ value }) => value)) ];
	const yAxis = [ buildEChartsYAxis(chart as ECharts) ];

	// noinspection JSSuspiciousNameCombination
	return series?.transformAxis ? { xAxis: yAxis, yAxis: xAxis } : { xAxis, yAxis };
};

export const buildLabel = (chart: ECharts) => {
	let { settings } = chart;

	if (!settings) {
		settings = {};
		chart.settings = settings;
	}
	const { label } = settings as BarChartSettings;

	if (label?.show === false) {
		return (void 0);
	}

	return cleanUselessValues({
		show: true,
		position: label?.position || 'insideTop',
		align: label?.horizontalAlign,
		verticalAlign: label?.verticalAlign || 'middle',
		distance: label?.gap == null ? 15 : label.gap,
		rotate: label?.rotate || 0,
		padding: label?.padding,
		color: label?.font?.color,
		fontStyle: label?.font?.style,
		fontWeight: label?.font?.weight as any,
		fontFamily: label?.font?.family,
		fontSize: label?.font?.size,
		backgroundColor: label?.backgroundColor,
		borderColor: label?.border?.color,
		borderWidth: label?.border?.width,
		borderType: label?.border?.style as any,
		borderRadius: label?.border?.radius,
		formatter: buildValueFormatter(chart)
	});
};

const formatValue = (value: number, label: BarChartSettingsLabel = {}): string => {
	const formatUseGrouping = label?.formatUseGrouping == null ? true : label.formatUseGrouping;
	let val: string | number = value;
	if (label?.valueAsPercentage) {
		return createNumberFormat(label?.fractionDigits || 0, formatUseGrouping)((val || 0) / 100);
	} else {
		return createNumberFormat(label?.fractionDigits || 0, formatUseGrouping)(val);
	}
};

export const buildTooltipFormatter = (chart: ECharts) => {
	let { settings } = chart;

	if (!settings) {
		settings = {};
		chart.settings = settings;
	}
	const { label } = settings as BarChartSettings;

	return (params: FormatterParams | Array<FormatterParams>): string => {
		const { name, value } = Array.isArray(params) ? params[0] : params;
		const val = formatValue(value, label);
		return label?.formatUsePercentage ? `${name}<br>${val}%` : `${name}<br>${val}`;
	};
};

export const buildValueFormatter = (chart: ECharts) => {
	let { settings } = chart;

	if (!settings) {
		settings = {};
		chart.settings = settings;
	}
	const { label } = settings as BarChartSettings;

	return (params: FormatterParams): string => {
		const { value } = params;
		const val = formatValue(value, label);
		return label?.formatUsePercentage ? `${val}%` : val;
	};
};