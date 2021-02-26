import { ChartType } from '../chart-types';
import { ECharts, EChartsSettings } from '../echarts/echarts-types';
import { ChartDef } from './chart-def-types';

export const NIGHTINGALE: ChartDef = {
	type: ChartType.NIGHTINGALE,
	minDimensionCount: 1,
	minIndicatorCount: 1,
	maxIndicatorCount: 1,

	canHoldTitle: true,
	canHoldLegend: true,
	canUseGrid: false,
	canUseXAxis: false,
	canUseYAxis: false
};

export interface NightingaleChartSettings extends EChartsSettings {
}

export interface NightingaleChart extends ECharts {
	type: ChartType.NIGHTINGALE;
	settings?: NightingaleChartSettings;
}
