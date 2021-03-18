import { ChartType } from '../chart-types';
import { ECharts, EChartsSettings } from '../echarts/echarts-types';
import { ChartDef } from './chart-def-types';
import { ChartTruncationHolder } from './truncation';

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

export interface LineChartSettingsSeries {
	transformAxis?: boolean;
}

export interface LineChartSettings extends ChartTruncationHolder, EChartsSettings {
	series?: LineChartSettingsSeries;
}

export interface LineChart extends ECharts {
	type: ChartType.LINE;
	settings?: LineChartSettings;
}
