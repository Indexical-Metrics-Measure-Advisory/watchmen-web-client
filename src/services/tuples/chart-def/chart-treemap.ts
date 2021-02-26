import { ChartType } from '../chart-types';
import { ECharts, EChartsSettings } from '../echarts/echarts-types';
import { ChartDef } from './chart-def-types';

export const TREEMAP: ChartDef = {
	type: ChartType.TREEMAP,
	minDimensionCount: 2,
	minIndicatorCount: 1,
	maxIndicatorCount: 1,

	canHoldTitle: true,
	canHoldLegend: false,
	canUseGrid: false,
	canUseXAxis: false,
	canUseYAxis: false
};

export interface TreemapChartSettings extends EChartsSettings {
}

export interface TreemapChart extends ECharts {
	type: ChartType.TREEMAP;
	settings?: TreemapChartSettings;
}
