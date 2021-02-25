import { ChartType } from '../chart-types';
import { EChart, EChartsSettings } from '../echarts/echarts-types';
import { ChartDef } from './chart-def-types';

export const TREE: ChartDef = {
	type: ChartType.TREE,
	minDimensionCount: 2,
	minIndicatorCount: 1,
	maxIndicatorCount: 1,

	canHoldTitle: true,
	canHoldLegend: false,
	canUseGrid: false,
	canUseXAxis: false
};

export interface TreeChartSettings extends EChartsSettings {
}

export interface TreeChart extends EChart {
	type: ChartType.TREE;
	settings?: TreeChartSettings;
}
