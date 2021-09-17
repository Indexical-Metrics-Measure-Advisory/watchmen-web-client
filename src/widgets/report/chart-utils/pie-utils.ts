import {BarChartSettings} from '@/services/data/tuples/chart-def/chart-bar';
import {
	PieChartSettings,
	PieLabelAlignTo,
	PieLabelPosition,
	PieRoseType
} from '@/services/data/tuples/chart-def/chart-pie';
import {ChartDataSetRow, ChartType} from '@/services/data/tuples/chart-types';
import {EChartsVerticalAlignment} from '@/services/data/tuples/echarts/echarts-alignment-types';
import {ECharts} from '@/services/data/tuples/echarts/echarts-types';
import {cleanUselessValues} from './data-utils';
import {PREDEFINED_GROUPING_FORMATS} from './number-format';
import {TreeNode} from './tree-data-builder';

interface FormatterParams {
	name: string;
	value: number;
	percent: number;
}

export const buildEChartsPie = (chart: ECharts, data: any, options: {
	type: 'pie' | 'sunburst';
	insideRadius: number | string;
	outsideRadius: number | string;
	roseType?: PieRoseType;
}): any | undefined => {
	const {type, insideRadius, outsideRadius, roseType} = options;

	let {settings} = chart;

	if (!settings) {
		settings = {};
		chart.settings = settings;
	}

	const {series, grid} = settings as PieChartSettings;

	const buildSunburstLabel = () => {
		return {
			label: buildLabel(chart, PieLabelPosition.INSIDE, false)
		};
	};
	const buildPieLabel = () => {
		return {
			label: buildLabel(chart, PieLabelPosition.OUTSIDE, true),
			labelLine: {
				show: true,
				smooth: true
			}
		};
	};

	if (!series) {
		return {
			type,
			center: ['50%', '50%'],
			data,
			...(type === ChartType.SUNBURST ? buildSunburstLabel() : buildPieLabel())
		};
	}

	return cleanUselessValues({
		type,
		center: [series.centerX || '50%', series.centerY || '50%'],
		radius: [series.insideRadius || insideRadius, series.outsideRadius || outsideRadius],
		roseType: series.roseType === PieRoseType.NONE ? (roseType || false) : series.roseType,
		data,
		top: (grid?.position?.top != null) ? `${grid?.position?.top}%` : (void 0),
		right: (grid?.position?.right != null) ? `${grid?.position?.right}%` : (void 0),
		left: (grid?.position?.left != null) ? `${grid?.position?.left}%` : (void 0),
		bottom: (grid?.position?.bottom != null) ? `${grid?.position?.bottom}%` : (void 0),
		itemStyle: {
			borderColor: series.border?.color,
			borderWith: series.border?.width,
			borderType: series.border?.style,
			borderRadius: series.border?.radius
		},
		...(type === ChartType.SUNBURST ? buildSunburstLabel() : buildPieLabel())
	});
};

const buildLabel = (
	chart: ECharts,
	defaultPosition: PieLabelPosition,
	defaultShowPercentage: boolean
) => {
	let {settings} = chart;

	if (!settings) {
		settings = {};
		chart.settings = settings;
	}
	const {label} = settings as PieChartSettings;

	if (label?.show === false) {
		return (void 0);
	}

	return cleanUselessValues({
		show: true,
		position: label?.position || defaultPosition,
		alignTo: label?.alignTo || PieLabelAlignTo.NONE,
		align: label?.horizontalAlign,
		verticalAlign: label?.verticalAlign || EChartsVerticalAlignment.MIDDLE,
		edgeDistance: label?.gap == null ? 15 : label.gap,
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
		formatter: buildValueFormatter(chart, defaultShowPercentage)
	});
};

const buildValueFormatter = (chart: ECharts, defaultShowPercentage: boolean) => {
	let {settings} = chart;

	if (!settings) {
		settings = {};
		chart.settings = settings;
	}
	const {label, series} = settings as PieChartSettings;

	return (params: FormatterParams): string => {
		const {name, value, percent} = params;
		const formatUseGrouping = label?.formatUseGrouping == null ? true : label.formatUseGrouping;
		const val = formatUseGrouping ? PREDEFINED_GROUPING_FORMATS(value) : value;
		const showPercentage = series?.showPercentage == null ? defaultShowPercentage : series.showPercentage;
		const percentage = showPercentage ? `, ${percent}%` : '';
		return label?.formatUsePercentage ? `${name}\n${val || ''}%${percentage}` : `${name}\n${val || ''}${percentage}`;
	};
};

export const buildSeriesData = (
	chart: ECharts,
	groups: Array<{ value: any, row: ChartDataSetRow }>,
	formatNumber: (value: any, decimal?: number) => any
) => {
	let {settings} = chart;

	if (!settings) {
		settings = {};
		chart.settings = settings;
	}
	const {label} = settings as BarChartSettings;

	return groups.map(({value, row}) => {
		const val = parseFloat(`${row[0]}`);
		if (!isNaN(val) && label?.valueAsPercentage) {
			return {name: value, value: formatNumber(val / 100, label.fractionDigits || 0)};
		} else {
			return {name: value, value: formatNumber(row[0])};
		}
	});
};

export const buildTreeSeriesData = (
	chart: ECharts,
	nodes: Array<TreeNode>,
	formatNumber: (value: any, decimal?: number) => any
) => {
	let {settings} = chart;

	if (!settings) {
		settings = {};
		chart.settings = settings;
	}
	const {label} = settings as BarChartSettings;

	if (!label?.valueAsPercentage) {
		return nodes;
	}

	(nodes || []).forEach(node => {
		const n = node as any;
		if (n.value != null) {
			const val = parseFloat(`${n.value}`);
			if (!isNaN(val) && label?.valueAsPercentage) {
				n.value = parseFloat(formatNumber(val / 100, label.fractionDigits || 0));
			} else {
				n.value = parseFloat(formatNumber(n.value));
			}
		} else if (n.children) {
			buildTreeSeriesData(chart, n.children, formatNumber);
		}
	});

	return nodes;
};