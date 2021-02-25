import { ChartType } from '../chart-types';
import { EChart, EChartsSettings } from '../echarts/echarts-types';
import { ChartDef } from './chart-def-types';

export const SCATTER: ChartDef = {
	type: ChartType.SCATTER,
	minDimensionCount: 1,
	maxDimensionCount: 2,
	minIndicatorCount: 1,
	maxIndicatorCount: 3,

	canHoldTitle: true,
	canHoldLegend: true,
	canUseGrid: true,
	canUseXAxis: true
};

export interface ScatterChartSettings extends EChartsSettings {
}

export interface ScatterChart extends EChart {
	type: ChartType.SCATTER;
	settings?: ScatterChartSettings;
}
