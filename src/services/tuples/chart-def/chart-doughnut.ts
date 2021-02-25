import { ChartType } from '../chart-types';
import { EChartsLegendHolder } from '../echarts/echarts-legend-types';
import { EChart, EChartsSettings } from '../echarts/echarts-types';
import { ChartDef } from './chart-def-types';

export const DOUGHNUT: ChartDef = {
	type: ChartType.DOUGHNUT,
	minDimensionCount: 1,
	minIndicatorCount: 1,
	maxIndicatorCount: 1
};

export interface DoughnutChartSettings extends EChartsSettings, EChartsLegendHolder {
}

export interface DoughnutChart extends EChart {
	type: ChartType.DOUGHNUT;
	settings?: DoughnutChartSettings;
}
