import { ChartType } from '../chart-types';
import { EChart, EChartsSettings } from '../echarts-types';
import { ChartDef } from './chart-def-types';

export const MAP: ChartDef = {
	type: ChartType.MAP,
	minDimensionCount: 1,
	maxDimensionCount: 1,
	minIndicatorCount: 1,
	maxIndicatorCount: 1
};

export interface MapChartSettings extends EChartsSettings {
}

export interface MapChart extends EChart {
	type: ChartType.MAP;
	settings?: MapChartSettings;
}
