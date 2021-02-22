import { Chart, ChartType } from '../chart-types';
import { EChartsSettings } from '../echarts-types';
import { ChartDef } from './chart-def-types';

export const PIE: ChartDef = {
	type: ChartType.PIE,
	minDimensionCount: 1,
	minIndicatorCount: 1,
	maxIndicatorCount: 1
};

export interface PieChartSettings extends EChartsSettings {
}

export interface PieChart extends Chart {
	type: ChartType.PIE;
	settings?: PieChartSettings;
}
