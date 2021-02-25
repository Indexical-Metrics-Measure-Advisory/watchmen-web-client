import { Chart, ChartFont, ChartSettings, ChartTextDecoration, ChartType } from '../chart-types';
import { ChartDef } from './chart-def-types';

export const COUNT: ChartDef = {
	type: ChartType.COUNT,
	minDimensionCount: 0,
	maxDimensionCount: 0,
	minIndicatorCount: 1,
	maxIndicatorCount: 1
};

export interface CountChartSettingsText {
	font?: ChartFont;
	/** number format grouping */
	formatUseGrouping?: boolean;
	textDecoration?: ChartTextDecoration;
}

export interface CountChartSettings extends ChartSettings {
	countText?: CountChartSettingsText
}

export interface CountChart extends Chart {
	type: ChartType.COUNT;
	settings?: CountChartSettings;
}
