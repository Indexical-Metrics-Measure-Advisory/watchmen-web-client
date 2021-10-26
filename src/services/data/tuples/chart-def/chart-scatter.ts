import {ChartType} from '../chart-types';
import {ECharts, EChartsSettings} from '../echarts/echarts-types';
import {ChartDef} from './chart-def-types';

export const SCATTER: ChartDef = {
	type: ChartType.SCATTER,
	minDimensionCount: 1,
	maxDimensionCount: 2,
	minIndicatorCount: 1,
	maxIndicatorCount: 3,

	canHoldTitle: true,
	canHoldLegend: true,
	canUseGrid: true,
	canUseXAxis: true,
	canUseYAxis: true,

	canUseScript: false,
	canModifyScript: false
};

export interface ScatterChartSettings extends EChartsSettings {
}

export interface ScatterChart extends ECharts {
	type: ChartType.SCATTER;
	settings?: ScatterChartSettings;
}
