import { ChartType } from '../chart-types';
import { EChartsLegendHolder } from '../echarts/echarts-legend-types';
import { EChart, EChartsSettings } from '../echarts/echarts-types';
import { ChartDef } from './chart-def-types';

export const BAR: ChartDef = {
	type: ChartType.BAR,
	minDimensionCount: 1,
	minIndicatorCount: 1
};

export interface BarChartSettings extends EChartsSettings, EChartsLegendHolder {
}

export interface BarChart extends EChart {
	type: ChartType.BAR;
	settings?: BarChartSettings;
}
