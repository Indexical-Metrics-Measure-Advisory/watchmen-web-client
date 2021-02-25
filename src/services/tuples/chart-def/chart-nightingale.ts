import { ChartType } from '../chart-types';
import { EChartsLegendHolder } from '../echarts/echarts-legend-types';
import { EChart, EChartsSettings } from '../echarts/echarts-types';
import { ChartDef } from './chart-def-types';

export const NIGHTINGALE: ChartDef = {
	type: ChartType.NIGHTINGALE,
	minDimensionCount: 1,
	minIndicatorCount: 1,
	maxIndicatorCount: 1
};

export interface NightingaleChartSettings extends EChartsSettings, EChartsLegendHolder {
}

export interface NightingaleChart extends EChart {
	type: ChartType.NIGHTINGALE;
	settings?: NightingaleChartSettings;
}
