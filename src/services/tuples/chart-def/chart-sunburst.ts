import { ChartType } from '../chart-types';
import { EChart, EChartsSettings } from '../echarts/echarts-types';
import { ChartDef } from './chart-def-types';

export const SUNBURST: ChartDef = {
	type: ChartType.SUNBURST,
	minDimensionCount: 2,
	minIndicatorCount: 1,
	maxIndicatorCount: 1
};

export interface SunburstChartSettings extends EChartsSettings {
}

export interface SunburstChart extends EChart {
	type: ChartType.SUNBURST;
	settings?: SunburstChartSettings;
}
