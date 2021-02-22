import { ChartBorder, ChartFont, ChartSettings } from './chart-types';

export interface EChartsFont extends ChartFont {
}

export interface EChartsBorder extends ChartBorder {
}

export interface EChartsTitle {
	text: string;
	font?: EChartsFont;
	border?: EChartsBorder;
	align?: 'auto' | 'left' | 'right' | 'center';
	verticalAlign?: 'auto' | 'top' | 'bottom' | 'middle';
}

export interface EchartsPosition {
	top?: number;
	right?: number;
	left?: number;
	bottom?: number;
}

export interface EChartsSettings extends ChartSettings {
	title?: {
		text?: EChartsTitle;
		subtext?: EChartsTitle;
		backgroundColor?: string;
		border?: EChartsBorder;
		padding?: number;
		/** gap with sub title */
		gap?: number;
		position?: EchartsPosition;
	}
}
