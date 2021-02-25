import React from 'react';
import { DropdownOption } from '../../../../../basic-widgets/types';
import { Lang } from '../../../../../langs';
import { Chart, ChartBorderStyle, ChartFontStyle, ChartFontWeight } from '../../../../../services/tuples/chart-types';
import {
	EChartHorizontalAlignment,
	EChartVerticalAlignment
} from '../../../../../services/tuples/echarts/echarts-alignment-types';
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

export const AlignmentOptions: Array<DropdownOption> = [
	{ value: EChartHorizontalAlignment.AUTO, label: Lang.CHART.ALIGNMENT_AUTO },
	{ value: EChartHorizontalAlignment.LEFT, label: Lang.CHART.ALIGNMENT_LEFT },
	{ value: EChartHorizontalAlignment.CENTER, label: Lang.CHART.ALIGNMENT_CENTER },
	{ value: EChartHorizontalAlignment.RIGHT, label: Lang.CHART.ALIGNMENT_RIGHT }
];
export const VerticalAlignmentOptions: Array<DropdownOption> = [
	{ value: EChartVerticalAlignment.AUTO, label: Lang.CHART.VERTICAL_ALIGNMENT_AUTO },
	{ value: EChartVerticalAlignment.TOP, label: Lang.CHART.VERTICAL_ALIGNMENT_TOP },
	{ value: EChartVerticalAlignment.MIDDLE, label: Lang.CHART.VERTICAL_ALIGNMENT_MIDDLE },
	{ value: EChartVerticalAlignment.BOTTOM, label: Lang.CHART.VERTICAL_ALIGNMENT_BOTTOM }
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

	TEXT_ALIGN = 'title.align',
	TEXT_VERTICAL_ALIGN = 'title.verticalAlign',
	ITEM_GAP = 'title.itemGap',
	PADDING = 'title.padding',
}

export type TextPropNames =
	EChartTitlePropNames.TEXT
	| EChartTitlePropNames.SUBTEXT;

export type ColorPropNames =
	BasicStylePropNames.BACKGROUND_COLOR
	| BasicStylePropNames.BORDER_COLOR
	| CountChartStylePropNames.TEXT_FONT_COLOR
	| EChartTitlePropNames.TEXT_FONT_COLOR
	| EChartTitlePropNames.TEXT_BORDER_COLOR
	| EChartTitlePropNames.TEXT_BACKGROUND_COLOR
	| EChartTitlePropNames.SUBTEXT_FONT_COLOR;

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
	| EChartTitlePropNames.PADDING;

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
	| EChartTitlePropNames.TEXT_ALIGN
	| EChartTitlePropNames.TEXT_VERTICAL_ALIGN;

export type BooleanPropNames = CountChartStylePropNames.TEXT_FORMAT_USE_GROUPING;

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


