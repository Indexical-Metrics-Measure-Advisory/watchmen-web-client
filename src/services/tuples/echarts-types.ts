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

export interface EChartsTitleText extends EChartsFontHolder {
	text?: string;
	align?: 'auto' | 'left' | 'right' | 'center';
	verticalAlign?: 'auto' | 'top' | 'bottom' | 'middle';
}

export interface EChartsTitlePosition {
	top?: number;
	right?: number;
	left?: number;
	bottom?: number;
}

export interface EChartsTitle {
	text?: EChartsTitleText & EChartsBorderHolder;
	subtext?: EChartsTitleText;
	backgroundColor?: string;
	padding?: number;
	/** gap with sub title */
	gap?: number;
	position?: EChartsTitlePosition;
}

export interface EChartsSettings extends ChartSettings {
	title?: EChartsTitle;
}

export interface EChart extends Chart {
	type: Exclude<ChartType, ChartType.COUNT>;
	settings?: EChartsSettings;
}