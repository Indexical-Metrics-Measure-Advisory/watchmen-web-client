import { ChartType } from '../chart-types';
import { ECharts, EChartsSettings } from '../echarts/echarts-types';
import { ChartDef } from './chart-def-types';

export const BAR: ChartDef = {
	type: ChartType.BAR,
	minDimensionCount: 1,
	minIndicatorCount: 1,

	canHoldTitle: true,
	canHoldLegend: true,
	canUseGrid: true,
	canUseXAxis: true
};

export interface BarChartSettings extends EChartsSettings {
}

export interface BarChart extends ECharts {
	type: ChartType.BAR;
	settings?: BarChartSettings;
}
