import { ChartType } from '../chart-types';
import { ECharts, EChartsSettings } from '../echarts/echarts-types';
import { ChartDef } from './chart-def-types';

export const LINE: ChartDef = {
	type: ChartType.LINE,
	minDimensionCount: 1,
	minIndicatorCount: 1,

	canHoldTitle: true,
	canHoldLegend: true,
	canUseGrid: true,
	canUseXAxis: true,
	canUseYAxis: true
};

export interface LineChartSettings extends EChartsSettings {
}

export interface LineChart extends ECharts {
	type: ChartType.LINE;
	settings?: LineChartSettings;
}
