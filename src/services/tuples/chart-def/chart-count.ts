import { Chart, ChartFontStyle, ChartFontWeight, ChartSettings, ChartTextDecoration, ChartType } from '../chart-types';
import { ChartDef } from './chart-def-types';

export const COUNT: ChartDef = {
	type: ChartType.COUNT,
	minDimensionCount: 0,
	maxDimensionCount: 0,
	minIndicatorCount: 0,
	maxIndicatorCount: 0
};

export interface CountChartSettings extends ChartSettings {
	/** number format grouping */
	formatUseGrouping?: boolean;
	font?: string;
	fontSize?: number;
	fontColor?: string;
	fontStyle?: ChartFontStyle;
	fontWeight?: ChartFontWeight;
	textDecoration?: ChartTextDecoration;
}

export interface CountChart extends Chart {
	type: ChartType.COUNT;
	settings?: CountChartSettings;
}
