import { Chart, ChartFont, ChartType } from '../chart-types';
import { EChartsSettings } from '../echarts-types';
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
}

export interface CountChartSettings extends EChartsSettings {
	countText?: CountChartSettingsText
}

export interface CountChart extends Chart {
	type: ChartType.COUNT;
	settings?: CountChartSettings;
}
