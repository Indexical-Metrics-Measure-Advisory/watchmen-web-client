import { ChartType } from '../chart-types';
import { EChartsLegendHolder } from '../echarts/echarts-legend-types';
import { EChart, EChartsSettings } from '../echarts/echarts-types';
import { ChartDef } from './chart-def-types';

export const SCATTER: ChartDef = {
	type: ChartType.SCATTER,
	minDimensionCount: 1,
	maxDimensionCount: 2,
	minIndicatorCount: 1,
	maxIndicatorCount: 3
};

export interface ScatterChartSettings extends EChartsSettings, EChartsLegendHolder {
}

export interface ScatterChart extends EChart {
	type: ChartType.SCATTER;
	settings?: ScatterChartSettings;
}
