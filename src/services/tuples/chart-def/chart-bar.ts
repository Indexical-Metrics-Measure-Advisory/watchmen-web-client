import { ChartType } from '../chart-types';
import { ECharts, EChartsSettings } from '../echarts/echarts-types';
import { ChartDef } from './chart-def-types';
import { ChartTruncationHolder } from './truncation';

export const BAR: ChartDef = {
	type: ChartType.BAR,
	minDimensionCount: 1,
	minIndicatorCount: 1,

	canHoldTitle: true,
	canHoldLegend: true,
	canUseGrid: true,
	canUseXAxis: true,
	canUseYAxis: true
};

export interface BarChartSettingsSeries {
	transformAxis?: boolean;
}

export interface BarChartSettings extends ChartTruncationHolder, EChartsSettings {
	series?: BarChartSettingsSeries;
}

export interface BarChart extends ECharts {
	type: ChartType.BAR;
	settings?: BarChartSettings;
}
