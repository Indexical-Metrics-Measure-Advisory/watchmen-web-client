import {RowOfAny} from '../types';

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
	MAP = 'map',

	CUSTOMIZED = 'customized'
}

export interface Chart {
	type: ChartType;
	settings?: ChartSettings;
}

export type ChartDataSetRow = RowOfAny;
export type ChartDataSetRows = Array<ChartDataSetRow>;

export interface ChartDataSet {
	// not use now, ignore this
	// columns?: Array<string>;
	data: ChartDataSetRows;
}