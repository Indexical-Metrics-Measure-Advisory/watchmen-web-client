export enum PredefinedChartColorSeries {
	REGULAR = 'regular',
	DARK = 'dark',
	LIGHT = 'light'
}

export enum ChartBorderStyle {
	NONE = 'none',
	SOLID = 'solid',
	DOTTED = 'dotted',
	DASHED = 'dashed'
}

export enum ChartFontStyle {
	NORMAL = 'normal',
	ITALIC = 'italic'
}

export enum ChartFontWeight {
	W100 = '100',
	W200 = '200',
	W300 = '300',
	W400 = '400',
	W500 = '500',
	W600 = '600',
	W700 = '700',
	W800 = '800',
	W900 = '900'
}

export interface ChartFont {
	family?: string;
	size?: number;
	color?: string;
	style?: ChartFontStyle;
	weight?: ChartFontWeight;
}

export interface ChartBorder {
	color?: string;
	style?: ChartBorderStyle;
	width?: number;
	radius?: number;
}

export enum ChartTextDecoration {
	NONE = 'none',
	UNDERLINE = 'underline',
	LINE_THROUGH = 'line-through',
	OVERLINE = 'overline'
}

export interface ChartSettings {
	border?: ChartBorder;
	backgroundColor?: string;

	colorSeries?: PredefinedChartColorSeries;
}

export enum ChartType {
	COUNT = 'count',
	BAR = 'bar',
	LINE = 'line',
	SCATTER = 'scatter',
	PIE = 'pie',
	DOUGHNUT = 'doughnut',
	NIGHTINGALE = 'nightingale',
	SUNBURST = 'sunburst',
	TREE = 'tree',
	TREEMAP = 'treemap',
	MAP = 'map'
}

export interface Chart {
	type: ChartType;
	settings?: ChartSettings;
}

export type ChartDataSetRows = Array<Array<string | number | boolean | null | undefined>>;

export interface ChartDataSet {
	columns?: Array<string>;
	data: ChartDataSetRows;
}