import { ChartType } from '../chart-types';
import { EChart, EChartsSettings } from '../echarts/echarts-types';
import { ChartDef } from './chart-def-types';

export const PIE: ChartDef = {
	type: ChartType.PIE,
	minDimensionCount: 1,
	minIndicatorCount: 1,
	maxIndicatorCount: 1
};

export interface PieChartSettings extends EChartsSettings {
}

export interface PieChart extends EChart {
	type: ChartType.PIE;
	settings?: PieChartSettings;
}
