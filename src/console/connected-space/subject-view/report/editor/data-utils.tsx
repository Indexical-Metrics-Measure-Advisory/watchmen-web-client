import React from 'react';
import { DropdownOption } from '../../../../../basic-widgets/types';
import { Lang } from '../../../../../langs';
import { Chart, ChartBorderStyle, ChartFontStyle, ChartFontWeight } from '../../../../../services/tuples/chart-types';
import {
	EChartsHorizontalAlignment,
	EChartsVerticalAlignment
} from '../../../../../services/tuples/echarts/echarts-alignment-types';
import { EChartsAxisSplitLineStyle } from '../../../../../services/tuples/echarts/echarts-axis-split-line-types';
import { EChartsLegendOrient } from '../../../../../services/tuples/echarts/echarts-legend-types';
import {
	EChartsXAxisNameLocation,
	EChartsXAxisPosition,
	EChartsXAxisType
} from '../../../../../services/tuples/echarts/echarts-xaxis-types';
import { Report } from '../../../../../services/tuples/report-types';
import { Theme } from '../../../../../theme/types';

export const assignValue = (chart: Chart, propNames: string, value: any, removePropOnNoValue: boolean) => {
	if (!chart.settings) {
		chart.settings = {};
	}

	const names = propNames.split('.');
	let holder = chart.settings as any;
	for (let index = 0, count = names.length - 1; index < count; index++) {
		const parent = holder;
		holder = parent[names[index]];
		if (!holder) {
			holder = {};
			parent[names[index]] = holder;
		}
	}
	if (value == null && removePropOnNoValue) {
		delete holder[names[names.length - 1]];
	} else {
		holder[names[names.length - 1]] = value;
	}
};

export const FontStyleOptions: Array<DropdownOption> = [
	{ value: ChartFontStyle.NORMAL, label: Lang.CHART.FONT_STYLE_NORMAL },
	{ value: ChartFontStyle.ITALIC, label: Lang.CHART.FONT_STYLE_ITALIC }
];
export const FontWeightOptions: Array<DropdownOption> = [
	{ value: ChartFontWeight.W100, label: Lang.CHART.FONT_WEIGHT_100 },
	{ value: ChartFontWeight.W200, label: Lang.CHART.FONT_WEIGHT_200 },
	{ value: ChartFontWeight.W300, label: Lang.CHART.FONT_WEIGHT_300 },
	{ value: ChartFontWeight.W400, label: Lang.CHART.FONT_WEIGHT_400 },
	{ value: ChartFontWeight.W500, label: Lang.CHART.FONT_WEIGHT_500 },
	{ value: ChartFontWeight.W600, label: Lang.CHART.FONT_WEIGHT_600 },
	{ value: ChartFontWeight.W700, label: Lang.CHART.FONT_WEIGHT_700 },
	{ value: ChartFontWeight.W800, label: Lang.CHART.FONT_WEIGHT_800 },
	{ value: ChartFontWeight.W900, label: Lang.CHART.FONT_WEIGHT_900 }
];
export const createFontFamilyOptions = (theme: Theme) => {
	return theme.fontFamily.split(',')
		.filter(x => !!x)
		.map(font => ({ name: font, label: font.trim() }))
		.map(({ name, label }) => {
			label = label.startsWith('\'') ? label.substr(1) : label;
			label = label.endsWith('\'') ? label.substr(0, label.length - 1) : label;
			label = label.replace(/-/g, ' ').trim();
			return { name, label };
		})
		.map(({ name, label }) => {
			return {
				value: name,
				label: () => {
					return {
						node: <span style={{ textTransform: 'capitalize' }}>{label}</span>,
						label
					};
				}
			};
		});
};

export const BorderStyleOptions: Array<DropdownOption> = [
	{ value: ChartBorderStyle.NONE, label: Lang.CHART.BORDER_STYLE_NONE },
	{ value: ChartBorderStyle.SOLID, label: Lang.CHART.BORDER_STYLE_SOLID },
	{ value: ChartBorderStyle.DOTTED, label: Lang.CHART.BORDER_STYLE_DOTTED },
	{ value: ChartBorderStyle.DASHED, label: Lang.CHART.BORDER_STYLE_DASHED }
];

export const HorizontalAlignmentOptions: Array<DropdownOption> = [
	{ value: EChartsHorizontalAlignment.AUTO, label: Lang.CHART.HORIZONTAL_ALIGNMENT_AUTO },
	{ value: EChartsHorizontalAlignment.LEFT, label: Lang.CHART.HORIZONTAL_ALIGNMENT_LEFT },
	{ value: EChartsHorizontalAlignment.CENTER, label: Lang.CHART.HORIZONTAL_ALIGNMENT_CENTER },
	{ value: EChartsHorizontalAlignment.RIGHT, label: Lang.CHART.HORIZONTAL_ALIGNMENT_RIGHT }
];
export const VerticalAlignmentOptions: Array<DropdownOption> = [
	{ value: EChartsVerticalAlignment.AUTO, label: Lang.CHART.VERTICAL_ALIGNMENT_AUTO },
	{ value: EChartsVerticalAlignment.TOP, label: Lang.CHART.VERTICAL_ALIGNMENT_TOP },
	{ value: EChartsVerticalAlignment.MIDDLE, label: Lang.CHART.VERTICAL_ALIGNMENT_MIDDLE },
	{ value: EChartsVerticalAlignment.BOTTOM, label: Lang.CHART.VERTICAL_ALIGNMENT_BOTTOM }
];
export const LegendOrientOptions: Array<DropdownOption> = [
	{ value: EChartsLegendOrient.HORIZONTAL, label: Lang.CHART.LEGEND_ORIENT_HORIZONTAL },
	{ value: EChartsLegendOrient.VERTICAL, label: Lang.CHART.LEGEND_ORIENT_VERTICAL }
];
export const XAxisPositionOptions: Array<DropdownOption> = [
	{ value: EChartsXAxisPosition.TOP, label: Lang.CHART.POSITION_TOP },
	{ value: EChartsXAxisPosition.BOTTOM, label: Lang.CHART.POSITION_BOTTOM }
];
export const XAxisNameLocationOptions: Array<DropdownOption> = [
	{ value: EChartsXAxisNameLocation.START, label: Lang.CHART.AXIS_NAME_LOCATION_START },
	{ value: EChartsXAxisNameLocation.CENTER, label: Lang.CHART.AXIS_NAME_LOCATION_CENTER },
	{ value: EChartsXAxisNameLocation.END, label: Lang.CHART.AXIS_NAME_LOCATION_END }
];
export const AxisTypeOptions: Array<DropdownOption> = [
	{ value: EChartsXAxisType.CATEGORY, label: Lang.CHART.AXIS_TYPE_CATEGORY },
	{ value: EChartsXAxisType.VALUE, label: Lang.CHART.AXIS_TYPE_VALUE },
	{ value: EChartsXAxisType.TIME, label: Lang.CHART.AXIS_TYPE_TIME }
];
export const AxisSplitLineStyleOptions: Array<DropdownOption> = [
	{ value: EChartsAxisSplitLineStyle.SOLID, label: Lang.CHART.BORDER_STYLE_SOLID },
	{ value: EChartsAxisSplitLineStyle.DASHED, label: Lang.CHART.BORDER_STYLE_DASHED },
	{ value: EChartsAxisSplitLineStyle.DOTTED, label: Lang.CHART.BORDER_STYLE_DOTTED }
];

export enum BasicStylePropNames {
	BACKGROUND_COLOR = 'backgroundColor',
	BORDER_WIDTH = 'border.width',
	BORDER_STYLE = 'border.style',
	BORDER_COLOR = 'border.color',
	BORDER_RADIUS = 'border.radius'
}

export enum CountChartStylePropNames {
	TEXT_FONT_FAMILY = 'countText.font.family',
	TEXT_FONT_COLOR = 'countText.font.color',
	TEXT_FONT_SIZE = 'countText.font.size',
	TEXT_FONT_STYLE = 'countText.font.style',
	TEXT_FONT_WEIGHT = 'countText.font.weight',
	TEXT_DECORATION = 'countText.textDecoration',
	TEXT_FORMAT_USE_GROUPING = 'countText.formatUseGrouping'
}

export enum EChartTitlePropNames {
	TEXT = 'title.text.text',
	TEXT_FONT_FAMILY = 'title.text.font.family',
	TEXT_FONT_COLOR = 'title.text.font.color',
	TEXT_FONT_SIZE = 'title.text.font.size',
	TEXT_FONT_STYLE = 'title.text.font.style',
	TEXT_FONT_WEIGHT = 'title.text.font.weight',

	SUBTEXT = 'title.subtext.text',
	SUBTEXT_FONT_FAMILY = 'title.subtext.font.family',
	SUBTEXT_FONT_COLOR = 'title.subtext.font.color',
	SUBTEXT_FONT_SIZE = 'title.subtext.font.size',
	SUBTEXT_FONT_STYLE = 'title.subtext.font.style',
	SUBTEXT_FONT_WEIGHT = 'title.subtext.font.weight',

	TEXT_BORDER_WIDTH = 'title.border.width',
	TEXT_BORDER_COLOR = 'title.border.color',
	TEXT_BORDER_STYLE = 'title.border.style',
	TEXT_BORDER_RADIUS = 'title.border.radius',
	TEXT_BACKGROUND_COLOR = 'title.backgroundColor',

	POSITION_TOP = 'title.position.top',
	POSITION_RIGHT = 'title.position.right',
	POSITION_LEFT = 'title.position.left',
	POSITION_BOTTOM = 'title.position.bottom',

	TEXT_HORIZONTAL_ALIGN = 'title.horizontalAlign',
	TEXT_VERTICAL_ALIGN = 'title.verticalAlign',
	ITEM_GAP = 'title.itemGap',
	PADDING = 'title.padding',
}

export enum EChartLegendPropNames {
	SHOW = 'legend.show',
	ORIENT = 'legend.orient',

	FONT_FAMILY = 'legend.font.family',
	FONT_COLOR = 'legend.font.color',
	FONT_SIZE = 'legend.font.size',
	FONT_STYLE = 'legend.font.style',
	FONT_WEIGHT = 'legend.font.weight',

	BORDER_WIDTH = 'legend.border.width',
	BORDER_COLOR = 'legend.border.color',
	BORDER_STYLE = 'legend.border.style',
	BORDER_RADIUS = 'legend.border.radius',
	BACKGROUND_COLOR = 'legend.backgroundColor',

	POSITION_TOP = 'legend.position.top',
	POSITION_RIGHT = 'legend.position.right',
	POSITION_LEFT = 'legend.position.left',
	POSITION_BOTTOM = 'legend.position.bottom',

	PADDING = 'legend.padding',
}

export enum EChartGridPropNames {
	SHOW = 'grid.show',
	CONTAIN_LABEL = 'grid.containLabel',

	BORDER_WIDTH = 'grid.border.width',
	BORDER_COLOR = 'grid.border.color',
	BORDER_STYLE = 'grid.border.style',
	BACKGROUND_COLOR = 'grid.backgroundColor',

	POSITION_TOP = 'grid.position.top',
	POSITION_RIGHT = 'grid.position.right',
	POSITION_LEFT = 'grid.position.left',
	POSITION_BOTTOM = 'grid.position.bottom',
}

export enum EChartXAxisPropNames {
	SHOW = 'xaxis.show',
	POSITION = 'xaxis.position',
	TYPE = 'xaxis.type',

	AUTO_MIN = 'xaxis.autoMin',
	MIN = 'xaxis.min',
	AUTO_MAX = 'xaxis.autoMax',
	MAX = 'xaxis.max',

	NAME_TEXT = 'xaxis.name.text',
	NAME_LOCATION = 'xaxis.name.location',
	NAME_BACKGROUND_COLOR = 'xaxis.name.backgroundColor',
	NAME_FONT_FAMILY = 'xaxis.name.font.family',
	NAME_FONT_SIZE = 'xaxis.name.font.size',
	NAME_FONT_WEIGHT = 'xaxis.name.font.weight',
	NAME_FONT_COLOR = 'xaxis.name.font.color',
	NAME_FONT_STYLE = 'xaxis.name.font.style',
	NAME_BORDER_WIDTH = 'xaxis.name.border.width',
	NAME_BORDER_STYLE = 'xaxis.name.border.style',
	NAME_BORDER_COLOR = 'xaxis.name.border.color',
	NAME_BORDER_RADIUS = 'xaxis.name.border.radius',
	NAME_HORIZONTAL_ALIGN = 'xaxis.name.horizontalAlign',
	NAME_VERTICAL_ALIGN = 'xaxis.name.verticalAlign',
	NAME_GAP = 'xaxis.name.gap',
	NAME_ROTATE = 'xaxis.name.rotate',
	NAME_PADDING = 'xaxis.name.padding',

	LABEL_SHOW = 'xaxis.label.show',
	LABEL_INSIDE = 'xaxis.label.inside',
	LABEL_BACKGROUND_COLOR = 'xaxis.label.backgroundColor',
	LABEL_FONT_FAMILY = 'xaxis.label.font.family',
	LABEL_FONT_SIZE = 'xaxis.label.font.size',
	LABEL_FONT_WEIGHT = 'xaxis.label.font.weight',
	LABEL_FONT_COLOR = 'xaxis.label.font.color',
	LABEL_FONT_STYLE = 'xaxis.label.font.style',
	LABEL_BORDER_WIDTH = 'xaxis.label.border.width',
	LABEL_BORDER_STYLE = 'xaxis.label.border.style',
	LABEL_BORDER_COLOR = 'xaxis.label.border.color',
	LABEL_BORDER_RADIUS = 'xaxis.label.border.radius',
	LABEL_HORIZONTAL_ALIGN = 'xaxis.label.horizontalAlign',
	LABEL_VERTICAL_ALIGN = 'xaxis.label.verticalAlign',
	LABEL_GAP = 'xaxis.label.gap',
	LABEL_ROTATE = 'xaxis.label.rotate',
	LABEL_PADDING = 'xaxis.label.padding',

	SPLIT_LINE_SHOW = 'xaxis.splitLine.show',
	SPLIT_LINE_COLOR = 'xaxis.splitLine.color',
	SPLIT_LINE_WIDTH = 'xaxis.splitLine.width',
	SPLIT_LINE_STYLE = 'xaxis.splitLine.style',

	MINOR_SPLIT_LINE_SHOW = 'xaxis.minorSplitLine.show',
	MINOR_SPLIT_LINE_COLOR = 'xaxis.minorSplitLine.color',
	MINOR_SPLIT_LINE_WIDTH = 'xaxis.minorSplitLine.width',
	MINOR_SPLIT_LINE_STYLE = 'xaxis.minorSplitLine.style',
}

export type TextPropNames =
	EChartTitlePropNames.TEXT
	| EChartTitlePropNames.SUBTEXT

	| EChartXAxisPropNames.NAME_TEXT;

export type ColorPropNames =
	BasicStylePropNames.BACKGROUND_COLOR
	| BasicStylePropNames.BORDER_COLOR

	| CountChartStylePropNames.TEXT_FONT_COLOR

	| EChartTitlePropNames.TEXT_FONT_COLOR
	| EChartTitlePropNames.TEXT_BORDER_COLOR
	| EChartTitlePropNames.TEXT_BACKGROUND_COLOR
	| EChartTitlePropNames.SUBTEXT_FONT_COLOR

	| EChartLegendPropNames.FONT_COLOR
	| EChartLegendPropNames.BORDER_COLOR
	| EChartLegendPropNames.BACKGROUND_COLOR

	| EChartGridPropNames.BORDER_COLOR
	| EChartGridPropNames.BACKGROUND_COLOR

	| EChartXAxisPropNames.NAME_FONT_COLOR
	| EChartXAxisPropNames.NAME_BORDER_COLOR
	| EChartXAxisPropNames.NAME_BACKGROUND_COLOR
	| EChartXAxisPropNames.LABEL_FONT_COLOR
	| EChartXAxisPropNames.LABEL_BORDER_COLOR
	| EChartXAxisPropNames.LABEL_BACKGROUND_COLOR
	| EChartXAxisPropNames.SPLIT_LINE_COLOR
	| EChartXAxisPropNames.MINOR_SPLIT_LINE_COLOR;

export type NumberPropNames =
	BasicStylePropNames.BORDER_WIDTH
	| BasicStylePropNames.BORDER_RADIUS

	| CountChartStylePropNames.TEXT_FONT_SIZE

	| EChartTitlePropNames.TEXT_FONT_SIZE
	| EChartTitlePropNames.TEXT_BORDER_WIDTH
	| EChartTitlePropNames.TEXT_BORDER_RADIUS
	| EChartTitlePropNames.SUBTEXT_FONT_SIZE
	| EChartTitlePropNames.POSITION_TOP
	| EChartTitlePropNames.POSITION_RIGHT
	| EChartTitlePropNames.POSITION_LEFT
	| EChartTitlePropNames.POSITION_BOTTOM
	| EChartTitlePropNames.ITEM_GAP
	| EChartTitlePropNames.PADDING

	| EChartLegendPropNames.BORDER_WIDTH
	| EChartLegendPropNames.BORDER_RADIUS
	| EChartLegendPropNames.FONT_SIZE
	| EChartLegendPropNames.POSITION_TOP
	| EChartLegendPropNames.POSITION_RIGHT
	| EChartLegendPropNames.POSITION_LEFT
	| EChartLegendPropNames.POSITION_BOTTOM
	| EChartLegendPropNames.PADDING

	| EChartGridPropNames.BORDER_WIDTH
	| EChartGridPropNames.POSITION_TOP
	| EChartGridPropNames.POSITION_RIGHT
	| EChartGridPropNames.POSITION_LEFT
	| EChartGridPropNames.POSITION_BOTTOM

	| EChartXAxisPropNames.MIN
	| EChartXAxisPropNames.MAX
	| EChartXAxisPropNames.NAME_BORDER_WIDTH
	| EChartXAxisPropNames.NAME_BORDER_RADIUS
	| EChartXAxisPropNames.NAME_FONT_SIZE
	| EChartXAxisPropNames.NAME_GAP
	| EChartXAxisPropNames.NAME_ROTATE
	| EChartXAxisPropNames.NAME_PADDING
	| EChartXAxisPropNames.LABEL_BORDER_WIDTH
	| EChartXAxisPropNames.LABEL_BORDER_RADIUS
	| EChartXAxisPropNames.LABEL_FONT_SIZE
	| EChartXAxisPropNames.LABEL_GAP
	| EChartXAxisPropNames.LABEL_ROTATE
	| EChartXAxisPropNames.LABEL_PADDING
	| EChartXAxisPropNames.SPLIT_LINE_WIDTH
	| EChartXAxisPropNames.MINOR_SPLIT_LINE_WIDTH;

export type DropdownPropNames =
	BasicStylePropNames.BORDER_STYLE

	| CountChartStylePropNames.TEXT_FONT_FAMILY
	| CountChartStylePropNames.TEXT_FONT_STYLE
	| CountChartStylePropNames.TEXT_FONT_WEIGHT
	| CountChartStylePropNames.TEXT_DECORATION

	| EChartTitlePropNames.TEXT_FONT_FAMILY
	| EChartTitlePropNames.TEXT_FONT_STYLE
	| EChartTitlePropNames.TEXT_FONT_WEIGHT
	| EChartTitlePropNames.TEXT_BORDER_STYLE
	| EChartTitlePropNames.SUBTEXT_FONT_FAMILY
	| EChartTitlePropNames.SUBTEXT_FONT_STYLE
	| EChartTitlePropNames.SUBTEXT_FONT_WEIGHT
	| EChartTitlePropNames.TEXT_HORIZONTAL_ALIGN
	| EChartTitlePropNames.TEXT_VERTICAL_ALIGN

	| EChartLegendPropNames.ORIENT
	| EChartLegendPropNames.BORDER_STYLE
	| EChartLegendPropNames.FONT_FAMILY
	| EChartLegendPropNames.FONT_STYLE
	| EChartLegendPropNames.FONT_WEIGHT

	| EChartGridPropNames.BORDER_STYLE

	| EChartXAxisPropNames.POSITION
	| EChartXAxisPropNames.TYPE
	| EChartXAxisPropNames.NAME_LOCATION
	| EChartXAxisPropNames.NAME_FONT_FAMILY
	| EChartXAxisPropNames.NAME_FONT_STYLE
	| EChartXAxisPropNames.NAME_FONT_WEIGHT
	| EChartXAxisPropNames.NAME_BORDER_STYLE
	| EChartXAxisPropNames.NAME_HORIZONTAL_ALIGN
	| EChartXAxisPropNames.NAME_VERTICAL_ALIGN
	| EChartXAxisPropNames.LABEL_FONT_FAMILY
	| EChartXAxisPropNames.LABEL_FONT_STYLE
	| EChartXAxisPropNames.LABEL_FONT_WEIGHT
	| EChartXAxisPropNames.LABEL_BORDER_STYLE
	| EChartXAxisPropNames.LABEL_HORIZONTAL_ALIGN
	| EChartXAxisPropNames.LABEL_VERTICAL_ALIGN
	| EChartXAxisPropNames.SPLIT_LINE_STYLE
	| EChartXAxisPropNames.MINOR_SPLIT_LINE_STYLE;

export type BooleanPropNames =
	CountChartStylePropNames.TEXT_FORMAT_USE_GROUPING

	| EChartLegendPropNames.SHOW

	| EChartGridPropNames.SHOW
	| EChartGridPropNames.CONTAIN_LABEL

	| EChartXAxisPropNames.SHOW
	| EChartXAxisPropNames.AUTO_MIN
	| EChartXAxisPropNames.AUTO_MAX
	| EChartXAxisPropNames.LABEL_SHOW
	| EChartXAxisPropNames.LABEL_INSIDE
	| EChartXAxisPropNames.SPLIT_LINE_SHOW
	| EChartXAxisPropNames.MINOR_SPLIT_LINE_SHOW;

export const onTextValueChange = (options: {
	report: Report;
	chart: Chart;
	prop: TextPropNames;
	done: (report: Report, chart: Chart, prop: string, value: string) => void;
}) => (value: string) => {
	const { report, chart, prop, done } = options;
	assignValue(chart, prop, value, true);
	done(report, chart, prop, value);
};
export const onColorChange = (options: {
	report: Report;
	chart: Chart;
	prop: ColorPropNames;
	done: (report: Report, chart: Chart, prop: string, color?: string) => void;
}) => (color?: string) => {
	const { report, chart, prop, done } = options;
	assignValue(chart, prop, color, true);
	done(report, chart, prop, color);
};
export const validateNumber = (fractionDigits: number) => (value: string) => {
	return new RegExp(`^\\d{1,${fractionDigits}}$`).test(value);
};
export const isANumber = (value: string) => {
	try {
		parseInt(value);
		return true;
	} catch {
		return false;
	}
};
export const isANumberAndInRange = (min: number, max: number) => (value: string) => {
	if (!isANumber(value)) {
		return false;
	}
	const v = parseInt(value);
	return min <= v && v <= max;
};
export const onNumberChange = (options: {
	report: Report;
	chart: Chart;
	prop: NumberPropNames;
	done: (report: Report, chart: Chart, prop: string, value?: number) => void;
}) => (value?: string) => {
	const { report, chart, prop, done } = options;
	const numberValue = value ? parseInt(value) : (void 0);
	assignValue(chart, prop, numberValue, true);
	done(report, chart, prop, numberValue);
	return numberValue;
};
export const onDropdownValueChange = (options: {
	report: Report;
	chart: Chart;
	prop: DropdownPropNames;
	done: (report: Report, chart: Chart, prop: string, value: string) => void;
}) => (option: DropdownOption) => {
	const { report, chart, prop, done } = options;
	const { value } = option;
	assignValue(chart, prop, value, false);
	done(report, chart, prop, value);
};
export const onBooleanChange = (options: {
	report: Report;
	chart: Chart;
	prop: BooleanPropNames;
	done: (report: Report, chart: Chart, prop: string, value: boolean) => void;
}) => (value: boolean) => {
	const { report, chart, prop, done } = options;
	assignValue(chart, prop, value, false);
	done(report, chart, prop, value);
};


