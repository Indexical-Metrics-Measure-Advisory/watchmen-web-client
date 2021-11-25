import {BarChartSettings, BarLabelPosition} from '@/services/data/tuples/chart-def/chart-bar';
import {ChartDataSetRow} from '@/services/data/tuples/chart-types';
import {EChartsVerticalAlignment} from '@/services/data/tuples/echarts/echarts-alignment-types';
import {ECharts} from '@/services/data/tuples/echarts/echarts-types';
import {cleanUselessValues} from './data-utils';
import {PREDEFINED_GROUPING_FORMATS} from './number-format';
import {buildEChartsXAxis} from './xaxis-utils';
import {buildEChartsYAxis} from './yaxis-utils';

interface FormatterParams {
	name: string;
	value: number;
}

export const buildAxis = (chart: ECharts, groups: Array<{ value: any }>) => {
	let {settings} = chart;

	if (!settings) {
		settings = {};
		chart.settings = settings;
	}

	const {series} = settings as BarChartSettings;
	const xAxis = [buildEChartsXAxis(chart as ECharts, groups.map(({value}) => value))];
	const yAxis = [buildEChartsYAxis(chart as ECharts)];

	// noinspection JSSuspiciousNameCombination
	return series?.transformAxis ? {xAxis: yAxis, yAxis: xAxis} : {xAxis, yAxis};
};

export const buildSeriesData = (
	chart: ECharts,
	groups: Array<{ value: any, row: ChartDataSetRow }>,
	indicatorIndex: number,
	formatNumber: (value: any, decimal?: number) => any
) => {
	let {settings} = chart;

	if (!settings) {
		settings = {};
		chart.settings = settings;
	}
	const {label} = settings as BarChartSettings;

	return groups.map(({row}) => {
		const value = parseFloat(`${row[indicatorIndex]}`);
		if (!Number.isNaN(value) && label?.valueAsPercentage) {
			return formatNumber(value / 100, label.fractionDigits || 0);
		} else {
			return formatNumber(row[indicatorIndex]);
		}
	});
};

export const buildLabel = (chart: ECharts) => {
	let {settings} = chart;

	if (!settings) {
		settings = {};
		chart.settings = settings;
	}
	const {label} = settings as BarChartSettings;

	if (label?.show === false) {
		return (void 0);
	}

	return cleanUselessValues({
		show: true,
		position: label?.position || BarLabelPosition.INSIDE_TOP,
		align: label?.horizontalAlign,
		verticalAlign: label?.verticalAlign || EChartsVerticalAlignment.MIDDLE,
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

export const buildValueFormatter = (chart: ECharts) => {
	let {settings} = chart;

	if (!settings) {
		settings = {};
		chart.settings = settings;
	}
	const {label} = settings as BarChartSettings;

	return (params: FormatterParams): string => {
		const {value} = params;
		const formatUseGrouping = label?.formatUseGrouping == null ? true : label.formatUseGrouping;
		const val = formatUseGrouping ? PREDEFINED_GROUPING_FORMATS(value) : value;
		return label?.formatUsePercentage ? `${val || ''}%` : `${val || ''}`;
	};
};