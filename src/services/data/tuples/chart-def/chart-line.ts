import {ChartType} from '../chart-types';
import {ECharts} from '../echarts/echarts-types';
import {BarChartSettings, BarChartSettingsSeries} from './chart-bar';
import {ChartDef} from './chart-def-types';

export const LINE: ChartDef = {
	type: ChartType.LINE,
	minDimensionCount: 1,
	minIndicatorCount: 1,

	canHoldTitle: true,
	canHoldLegend: true,
	canUseGrid: true,
	canUseXAxis: true,
	canUseYAxis: true,

	canUseScript: false,
	canModifyScript: false
};

export interface LineChartSettingsSeries extends BarChartSettingsSeries {
	smooth?: boolean;
}

export interface LineChartSettings extends Omit<BarChartSettings, 'decal'> {
	series?: LineChartSettingsSeries;
}

export interface LineChart extends ECharts {
	type: ChartType.LINE;
	settings?: LineChartSettings;
}
