import { ChartType } from '../chart-types';
import { EChartsLegendHolder } from '../echarts/echarts-legend-types';
import { EChart, EChartsSettings } from '../echarts/echarts-types';
import { ChartDef } from './chart-def-types';

export const PIE: ChartDef = {
	type: ChartType.PIE,
	minDimensionCount: 1,
	minIndicatorCount: 1,
	maxIndicatorCount: 1
};

export interface PieChartSettings extends EChartsSettings, EChartsLegendHolder {
}

export interface PieChart extends EChart {
	type: ChartType.PIE;
	settings?: PieChartSettings;
}
