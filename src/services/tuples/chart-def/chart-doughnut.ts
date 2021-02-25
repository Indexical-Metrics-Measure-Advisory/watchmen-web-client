import { ChartType } from '../chart-types';
import { ECharts, EChartsSettings } from '../echarts/echarts-types';
import { ChartDef } from './chart-def-types';

export const DOUGHNUT: ChartDef = {
	type: ChartType.DOUGHNUT,
	minDimensionCount: 1,
	minIndicatorCount: 1,
	maxIndicatorCount: 1,

	canHoldTitle: true,
	canHoldLegend: true,
	canUseGrid: false,
	canUseXAxis: false
};

export interface DoughnutChartSettings extends EChartsSettings {
}

export interface DoughnutChart extends ECharts {
	type: ChartType.DOUGHNUT;
	settings?: DoughnutChartSettings;
}
