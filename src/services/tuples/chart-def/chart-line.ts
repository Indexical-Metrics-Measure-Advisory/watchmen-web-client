import { ChartType } from '../chart-types';
import { EChart, EChartsSettings } from '../echarts-types';
import { ChartDef } from './chart-def-types';

export const LINE: ChartDef = {
	type: ChartType.LINE,
	minDimensionCount: 1,
	minIndicatorCount: 1
};

export interface LineChartSettings extends EChartsSettings {
}

export interface LineChart extends EChart {
	type: ChartType.LINE;
	settings?: LineChartSettings;
}
