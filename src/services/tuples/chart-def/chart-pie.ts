import { ChartType } from '../chart-types';
import { ECharts, EChartsSettings } from '../echarts/echarts-types';
import { ChartDef } from './chart-def-types';

export const PIE: ChartDef = {
	type: ChartType.PIE,
	minDimensionCount: 1,
	minIndicatorCount: 1,
	maxIndicatorCount: 1,

	canHoldTitle: true,
	canHoldLegend: true,
	canUseGrid: false,
	canUseXAxis: false
};

export interface PieChartSettings extends EChartsSettings {
}

export interface PieChart extends ECharts {
	type: ChartType.PIE;
	settings?: PieChartSettings;
}
