import { ChartType } from '../chart-types';
import { ECharts, EChartsSettings } from '../echarts/echarts-types';
import { ChartDef } from './chart-def-types';

export const MAP: ChartDef = {
	type: ChartType.MAP,
	minDimensionCount: 2,
	maxDimensionCount: 2,
	minIndicatorCount: 1,
	maxIndicatorCount: 1,

	canHoldTitle: true,
	canHoldLegend: false,
	canUseGrid: false,
	canUseXAxis: false,
	canUseYAxis: false
};

export interface MapChartSettings extends EChartsSettings {
}

export interface MapChart extends ECharts {
	type: ChartType.MAP;
	settings?: MapChartSettings;
}
