import { ChartType } from '../chart-types';
import { EChart, EChartsSettings } from '../echarts-types';
import { ChartDef } from './chart-def-types';

export const TREEMAP: ChartDef = {
	type: ChartType.TREEMAP,
	minDimensionCount: 2,
	minIndicatorCount: 1,
	maxIndicatorCount: 1
};

export interface TreemapChartSettings extends EChartsSettings {
}

export interface TreemapChart extends EChart {
	type: ChartType.TREEMAP;
	settings?: TreemapChartSettings;
}
