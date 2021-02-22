import { Chart, ChartBorder, ChartFont, ChartSettings, ChartType } from './chart-types';

export interface EChartsFont extends ChartFont {
}

export interface EChartsFontHolder {
	font?: EChartsFont;
}

export interface EChartsBorder extends ChartBorder {
}

export interface EChartsBorderHolder {
	border?: EChartsBorder;
}

export interface EChartsPosition {
	top?: number;
	right?: number;
	left?: number;
	bottom?: number;
}

export interface EChartsPositionHolder {
	position?: EChartsPosition;
}

export interface EChartsSize {
	width?: number;
	height?: number;
}

export interface EChartsSizeHolder {
	size?: EChartsSize;
}

export enum EChartAlignment { AUTO = 'auto', LEFT = 'left', RIGHT = 'right', CENTER = 'center'}

export enum EChartVerticalAlignment { AUTO = 'auto', TOP = 'top', BOTTOM = 'bottom', MIDDLE = 'middle'}

export interface EChartAlign {
	align?: EChartAlignment;
	verticalAlign?: EChartVerticalAlignment;
}

export interface EChartsTitleText extends EChartsFontHolder {
	text?: string;
}

export interface EChartsTitle extends EChartsBorderHolder, EChartsPositionHolder, EChartAlign {
	text?: EChartsTitleText;
	subtext?: EChartsTitleText;
	backgroundColor?: string;
	padding?: number;
	/** gap with sub title */
	itemGap?: number;
}

export interface EChartsSettings extends ChartSettings {
	title?: EChartsTitle;
}

export interface EChart extends Chart {
	type: Exclude<ChartType, ChartType.COUNT>;
	settings?: EChartsSettings;
}